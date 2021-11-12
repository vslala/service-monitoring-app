package com.bma.monitor.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(value = "http://localhost:3000", exposedHeaders = {"Location"})
@RepositoryRestResource(collectionResourceRel = "healthhistory", path = "health-history")
public interface HealthHistoryRepository extends PagingAndSortingRepository<HealthHistory, Long> {
    Page<HealthHistory> findByService(@Param("serviceInfo") ServiceInfo serviceInfo, Pageable pageable);
}
