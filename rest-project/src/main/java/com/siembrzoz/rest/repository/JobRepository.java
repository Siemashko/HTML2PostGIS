package com.siembrzoz.rest.repository;

import com.siembrzoz.rest.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findAllByStatusIn(Job.JobStatus... statuses);
}
