package com.siembrzoz.rest.service;

import com.siembrzoz.rest.domain.CreatePackageRequest;
import com.siembrzoz.rest.domain.DeliveryPackage;
import com.siembrzoz.rest.domain.UpdatePackageRequest;
import com.siembrzoz.rest.repository.DeliveryPackageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryPackageService {

    private final DeliveryPackageRepository deliveryPackageRepository;

    public List<DeliveryPackage> findAll() {
        return deliveryPackageRepository.findAll();
    }

    public List<DeliveryPackage> findByIds(List<Long> packageIds) {
        return deliveryPackageRepository.findAllById(packageIds);
    }

    public DeliveryPackage createPackage(CreatePackageRequest createPackageRequest) {

        final DeliveryPackage newPackage = DeliveryPackage.builder()
                .tags(createPackageRequest.getTags())
                .width(createPackageRequest.getWidth())
                .length(createPackageRequest.getLength())
                .height(createPackageRequest.getHeight())
                .weight(createPackageRequest.getWeight())
                .lat(createPackageRequest.getLat())
                .lng(createPackageRequest.getLng())
                .build();

        return deliveryPackageRepository.saveAndFlush(newPackage);
    }

    public DeliveryPackage updatePackage(UpdatePackageRequest updatePackageRequest) {

        final DeliveryPackage packageToUpdate = deliveryPackageRepository.getOne(updatePackageRequest.getDeliveryPackageId());

        final DeliveryPackage updatedPackage = packageToUpdate.toBuilder()
                .tags(updatePackageRequest.getNewTagSet() == null ? packageToUpdate.getTags() : updatePackageRequest.getNewTagSet())
                .width(updatePackageRequest.getWidth() == null ? packageToUpdate.getWidth() : updatePackageRequest.getWidth())
                .length(updatePackageRequest.getLength() == null ? packageToUpdate.getLength() : updatePackageRequest.getLength())
                .height(updatePackageRequest.getHeight() == null ? packageToUpdate.getHeight() : updatePackageRequest.getHeight())
                .weight(updatePackageRequest.getWeight() == null ? packageToUpdate.getWeight() : updatePackageRequest.getWeight())
                .lat(updatePackageRequest.getLat() == null ? packageToUpdate.getLat() : updatePackageRequest.getLat())
                .lng(updatePackageRequest.getLng() == null ? packageToUpdate.getLng() : updatePackageRequest.getLng())
                .version(updatePackageRequest.getVersion())
                .build();

        return deliveryPackageRepository.saveAndFlush(updatedPackage);
    }

    public void deletePackage(Long packageId) {
        deliveryPackageRepository.deleteById(packageId);
    }
}
