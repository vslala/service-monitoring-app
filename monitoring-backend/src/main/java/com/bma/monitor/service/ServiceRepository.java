package com.bma.monitor.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "services", path = "services")
public interface ServiceRepository extends PagingAndSortingRepository<Service, Long> {
    Service findByUserId(Long userId);
    Service findByName(String name);
}
