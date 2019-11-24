package com.siembrzoz.rest.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreatePackageRequestCommand {

    private Set<String> tags;

    @NotNull
    private Double width;

    @NotNull
    private Double length;

    @NotNull
    private Double height;

    @NotNull
    private Double weight;

    @NotNull
    private Double lat;

    @NotNull
    private Double lng;
}
