package com.siembrzoz.rest.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateJobRequestCommand {

    @NotNull
    private Double vehicleCapacity;

}
