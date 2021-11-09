package com.bma.monitor.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "health", path = "health")
public interface HealthStatusRepository extends PagingAndSortingRepository<HealthStatus, Long> {
}
