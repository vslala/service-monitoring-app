package com.bma.monitor.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
class DefaultScheduler {

    private final ServiceMonitor serviceMonitor;

    @Scheduled(fixedDelay = 60000)
    public void monitorServices() {
        log.info("Start monitoring...");
        serviceMonitor.execute();
        log.info("Monitoring job executed successfully!");
    }
}
