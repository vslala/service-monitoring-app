package com.bma.monitor.service;

import com.bma.monitor.scheduler.ServiceMonitor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

@Slf4j
@RepositoryEventHandler()
@Component
@RequiredArgsConstructor
public class ServiceEventHandler {

    private final ServiceMonitor serviceMonitor;

    @HandleAfterCreate
    public void handleAfterSave(ServiceInfo serviceInfo) {
        log.info("Calling serviceInfo monitor to start monitoring");
        serviceMonitor.checkHealth(serviceInfo);
    }
}
