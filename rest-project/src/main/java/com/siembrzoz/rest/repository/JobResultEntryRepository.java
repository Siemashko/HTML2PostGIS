package com.siembrzoz.rest.repository;

import com.siembrzoz.rest.domain.JobResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface JobResultEntryRepository extends JpaRepository<JobResult.JobResultEntry, Long> {
}
