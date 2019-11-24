package com.siembrzoz.rest.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siembrzoz.rest.domain.Job;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class JobDto {

    private Long jobId;

    private String status;

    private Double vehicleCapacity;

    private JobResultDto jobResult;

    public static JobDto from(Job source) {
        return new JobDto(source.getJobId(), source.getStatus().toString(), source.getVehicleCapacity(),
                Objects.isNull(source.getJobResult()) ? null : JobResultDto.from(source.getJobResult()));
    }
}
