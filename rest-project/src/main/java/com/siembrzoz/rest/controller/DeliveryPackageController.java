package com.siembrzoz.rest.controller;

import com.siembrzoz.rest.controller.dto.CreatePackageRequestCommand;
import com.siembrzoz.rest.controller.dto.DeliveryPackageDto;
import com.siembrzoz.rest.controller.dto.UpdatePackageRequestCommand;
import com.siembrzoz.rest.domain.CreatePackageRequest;
import com.siembrzoz.rest.domain.UpdatePackageRequest;
import com.siembrzoz.rest.service.DeliveryPackageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/package")
@RequiredArgsConstructor
public class DeliveryPackageController {

    private final DeliveryPackageService deliveryPackageService;

    @GetMapping
    public List<DeliveryPackageDto> findAll() {
        return deliveryPackageService.findAll().stream().map(DeliveryPackageDto::from).collect(Collectors.toList());
    }

    @GetMapping(params="ids")
    public List<DeliveryPackageDto> findByIds(@RequestParam List<Long> ids) {
        return deliveryPackageService.findByIds(ids).stream().map(DeliveryPackageDto::from).collect(Collectors.toList());
    }

    @PostMapping
    public DeliveryPackageDto addPackage(@Valid @RequestBody CreatePackageRequestCommand createPackageRequestCommand) {

        final CreatePackageRequest createPackageRequest = CreatePackageRequest.builder()
                .tags(createPackageRequestCommand.getTags())
                .width(createPackageRequestCommand.getWidth())
                .length(createPackageRequestCommand.getLength())
                .height(createPackageRequestCommand.getHeight())
                .weight(createPackageRequestCommand.getWeight())
                .lat(createPackageRequestCommand.getLat())
                .lng(createPackageRequestCommand.getLng())
                .build();

        return DeliveryPackageDto.from(deliveryPackageService.createPackage(createPackageRequest));
    }

    @PutMapping
    public DeliveryPackageDto updatePackage(@Valid @RequestBody UpdatePackageRequestCommand updatePackageRequestCommand) {

        final UpdatePackageRequest updatePackageRequest = UpdatePackageRequest.builder()
                .deliveryPackageId(updatePackageRequestCommand.getDeliveryPackageId())
                .newTagSet(updatePackageRequestCommand.getNewTags())
                .width(updatePackageRequestCommand.getWidth())
                .length(updatePackageRequestCommand.getLength())
                .height(updatePackageRequestCommand.getHeight())
                .weight(updatePackageRequestCommand.getWeight())
                .lat(updatePackageRequestCommand.getLat())
                .lng(updatePackageRequestCommand.getLng())
                .version(updatePackageRequestCommand.getVersion())
                .build();

        return DeliveryPackageDto.from(deliveryPackageService.updatePackage(updatePackageRequest));
    }

    @DeleteMapping("/{id}")
    public void removePackage(@PathVariable Long id) {
        deliveryPackageService.deletePackage(id);
    }

}
