package com.siembrzoz.rest;

import com.siembrzoz.rest.domain.Job;
import com.siembrzoz.rest.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class Scheduler {

    private final JobService jobService;

    @Scheduled(fixedDelay=10000L)
    private void startJobs() {
        List<Job> jobsToDo = jobService.findAllByStatusIn(Job.JobStatus.NEW);
        log.info("jobs found: {}", jobsToDo.size());
        jobsToDo.forEach(jobService::processJob);
    }
}
