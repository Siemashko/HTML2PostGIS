package com.siembrzoz.rest.service;

import com.siembrzoz.rest.controller.dto.CreateJobRequestCommand;
import com.siembrzoz.rest.domain.DeliveryPackage;
import com.siembrzoz.rest.domain.Job;
import com.siembrzoz.rest.domain.JobResult;
import com.siembrzoz.rest.domain.JobResult.JobResultEntry;
import com.siembrzoz.rest.repository.DeliveryPackageRepository;
import com.siembrzoz.rest.repository.JobRepository;
import com.siembrzoz.rest.repository.JobResultEntryRepository;
import com.siembrzoz.rest.repository.JobResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final JobResultRepository jobResultRepository;
    private final JobResultEntryRepository jobResultEntryRepository;
    private final DeliveryPackageRepository deliveryPackageRepository;

    public List<Job> findAllByStatusIn(Job.JobStatus... statuses) {
        return jobRepository.findAllByStatusIn(statuses);
    }

    public Job findJobById(Long id) {
        return jobRepository.getOne(id);
    }

    public Job createNewJob(CreateJobRequestCommand createJobRequestCommand) {
        final Job newJob = Job.builder().status(Job.JobStatus.NEW)
                .vehicleCapacity(createJobRequestCommand.getVehicleCapacity()).build();
        return jobRepository.saveAndFlush(newJob);
    }

    public void processJob(Job job) {
        job.setStatus(Job.JobStatus.PROCESSING);
        jobRepository.saveAndFlush(job);

        final JobResult jobResult = new JobResult();
        jobResultRepository.saveAndFlush(jobResult);

        final List<DeliveryPackage> deliveryPackages = deliveryPackageRepository
                .findAllByStatusIn(DeliveryPackage.DeliveryPackageStatus.NEW);
        if (deliveryPackages.size() == 0) {
            job.setStatus(Job.JobStatus.DONE);
            jobRepository.saveAndFlush(job);
            return;
        }
        Double currentLat = 52.2;
        Double currentLng = 21.0;
        Double currentLoad = 0.0;
        Long orderNumber = 1L;
        final Set<JobResultEntry> entries = new HashSet<>();
        do {
            final Double effectiveCurrentLat = currentLat;
            final Double effectiveCurrentLng = currentLng;
            final Double effectiveCurrentLoad = currentLoad;

            final List<DeliveryPackage> availablePackages = deliveryPackages.stream()
                    .filter(dp -> effectiveCurrentLoad + dp.getWeight() <= job.getVehicleCapacity()).collect(
                            Collectors.toList());

            if(availablePackages.size()==0) {
                break;
            }
            DeliveryPackage closestDeliveryPackage = Collections.min(availablePackages, Comparator.comparing(
                    deliveryPackage -> calculateDistanceBetweenCoordinates(deliveryPackage.getLat(),
                            effectiveCurrentLat, deliveryPackage.getLng(), effectiveCurrentLng)));
            closestDeliveryPackage.setStatus(DeliveryPackage.DeliveryPackageStatus.LOCKED);
            deliveryPackageRepository.saveAndFlush(closestDeliveryPackage);
            final JobResultEntry newEntry = JobResultEntry.builder()
                    .deliveryPackageId(closestDeliveryPackage.getDeliveryPackageId())
                    .orderNumber(orderNumber).build();
            jobResultEntryRepository.saveAndFlush(newEntry);
            entries.add(newEntry);
            currentLat = closestDeliveryPackage.getLat();
            currentLng = closestDeliveryPackage.getLng();
            currentLoad += closestDeliveryPackage.getWeight();
            orderNumber += 1;
            deliveryPackages.remove(closestDeliveryPackage);
        } while (currentLoad < job.getVehicleCapacity() && deliveryPackages.size() > 0);

        jobResult.setJobResultEntries(entries);
        job.setJobResult(jobResult);
        job.setStatus(Job.JobStatus.DONE);
        jobResultRepository.saveAndFlush(jobResult);
        jobRepository.saveAndFlush(job);
    }

    private Double calculateDistanceBetweenCoordinates(Double lat1, Double lat2, Double lng1,
                                                       Double lng2) {

        final int R = 6371; // Radius of the earth

        Double latDistance = Math.toRadians(lat2 - lat1);
        Double lonDistance = Math.toRadians(lng2 - lng1);
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        Double distance = R * c * 1000; // convert to meters

        return distance;
    }

}
