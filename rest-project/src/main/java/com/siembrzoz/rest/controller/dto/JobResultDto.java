package com.siembrzoz.rest.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siembrzoz.rest.domain.JobResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class JobResultDto {
    private Long jobResultId;

    private Set<JobResultEntryDto> jobResultEntries = new HashSet<>();

    public static JobResultDto from(JobResult source) {
        return new JobResultDto(source.getJobResultId(),
                source.getJobResultEntries().stream().map(JobResultEntryDto::from).collect(Collectors.toSet()));
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class JobResultEntryDto {

        private Long jobResultEntryId;

        private Long deliveryPackageId;

        private Long orderNumber;

        static JobResultEntryDto from(JobResult.JobResultEntry source) {
            return new JobResultEntryDto(source.getJobResultEntryId(), source.getDeliveryPackageId(), source.getOrderNumber());
        }
    }
}
