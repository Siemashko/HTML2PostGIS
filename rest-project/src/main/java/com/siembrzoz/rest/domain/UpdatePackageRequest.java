package com.siembrzoz.rest.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdatePackageRequest {

    @NotNull
    private Long deliveryPackageId;

    private Set<String> newTagSet;

    private Double width;

    private Double length;

    private Double height;

    private Double weight;

    private Double lat;

    private Double lng;

    @NotNull
    private Integer version;
}
