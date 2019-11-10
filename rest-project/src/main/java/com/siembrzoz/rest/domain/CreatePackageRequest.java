package com.siembrzoz.rest.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreatePackageRequest {

    private Set<String> tags;

    private Double width;

    private Double length;

    private Double height;

    private Double weight;

    private Double lat;

    private Double lng;
}
