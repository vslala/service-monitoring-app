package com.bma.monitor.scheduler;

import com.bma.monitor.service.HealthHistory;
import com.bma.monitor.service.HealthHistoryRepository;
import com.bma.monitor.service.ServiceInfo;
import com.bma.monitor.service.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Component("monitoringJob")
@RequiredArgsConstructor
class MonitoringJob implements ServiceMonitor {
    private final WebClient webClient;
    private final ServiceRepository serviceRepository;
    private final HealthHistoryRepository healthHistoryRepository;

    @Override
    public void execute() {
        var allServices = serviceRepository.findAll();
        pollAndSaveToHistory(allServices);
    }

    private void pollAndSaveToHistory(Iterable<ServiceInfo> allServices) {
        allServices.forEach(serviceInfo -> webClient.get()
                .uri(serviceInfo.getUrl())
                .retrieve()
                .toEntity(String.class)
                .subscribe(responseEntity -> healthHistoryRepository.save(HealthHistory.builder()
                        .serviceInfo(serviceInfo)
                        .status(responseEntity.getStatusCode() == HttpStatus.OK ? "OK" : "FAIL")
                        .build()))
        );
    }

    @Override
    public void checkHealth(ServiceInfo serviceInfo) {
        pollAndSaveToHistory(List.of(serviceInfo));
    }
}
