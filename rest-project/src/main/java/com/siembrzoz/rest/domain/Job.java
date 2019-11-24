package com.siembrzoz.rest.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    private JobStatus status;

    private Double vehicleCapacity;

    @OneToOne
    private JobResult jobResult;

    public enum JobStatus {
        NEW, PROCESSING, DONE, ERROR
    }


}
