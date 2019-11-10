package com.siembrzoz.rest.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siembrzoz.rest.domain.DeliveryPackage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeliveryPackageDto {

    private Long deliveryPackageId;

    private Set<String> tags;

    private Double width;

    private Double length;

    private Double height;

    private Double weight;

    private Double lat;

    private Double lng;

    private LocalDateTime createdTime;

    private LocalDateTime lastModifiedTime;

    private Integer version;

    public static DeliveryPackageDto from(DeliveryPackage source) {
        return DeliveryPackageDto.builder()
                .deliveryPackageId(source.getDeliveryPackageId())
                .tags(source.getTags())
                .width(source.getWidth())
                .length(source.getLength())
                .height(source.getHeight())
                .weight(source.getWeight())
                .lat(source.getLat())
                .lng(source.getLng())
                .createdTime(source.getCreatedTime())
                .lastModifiedTime(source.getLastModifiedTime())
                .version(source.getVersion())
                .build();
    }

}
