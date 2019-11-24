package com.siembrzoz.rest.controller;

import com.siembrzoz.rest.controller.dto.CreateJobRequestCommand;
import com.siembrzoz.rest.controller.dto.JobDto;
import com.siembrzoz.rest.domain.Job;
import com.siembrzoz.rest.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public List<JobDto> getAllJobs() {
        return jobService.findAllByStatusIn(Job.JobStatus.values()).stream().map(JobDto::from)
                .collect(Collectors.toList());
    }

    @PostMapping
    public JobDto createJob(@Valid @RequestBody CreateJobRequestCommand createJobRequestCommand) {
        return JobDto.from(jobService.createNewJob(createJobRequestCommand));
    }

}
