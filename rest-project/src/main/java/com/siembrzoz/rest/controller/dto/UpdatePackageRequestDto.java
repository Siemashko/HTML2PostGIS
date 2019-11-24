package com.siembrzoz.rest.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdatePackageRequestDto {

    @NotNull
    private Long deliveryPackageId;

    private Set<String> newTags;

    private Double width;

    private Double length;

    private Double height;

    private Double weight;

    private Double lat;

    private Double lng;

    @NotNull
    private Integer version;

}
