package com.siembrzoz.rest.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class JobResult {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long jobResultId;

    @OneToMany
    private Set<JobResultEntry> jobResultEntries = new HashSet<>();

    @Entity
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Data
    public static class JobResultEntry {

        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id
        private Long jobResultEntryId;

        private Long deliveryPackageId;

        private Long orderNumber;
    }
}
