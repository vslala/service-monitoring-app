package com.bma.monitor.service;

import com.bma.monitor.scheduler.ServiceMonitor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;
import java.time.Instant;

import static org.mockito.Mockito.*;

class ServiceInfoEventHandlerTest {

    private ServiceMonitor serviceMonitor;
    private ServiceEventHandler serviceEventHandler;

    @BeforeEach
    void setup() {
        serviceMonitor = mock(ServiceMonitor.class);
        serviceEventHandler = new ServiceEventHandler(serviceMonitor);
    }

    @Test
    void shouldScheduleAMonitoringJobForServiceAfterCreation() {
        // Given
        var service = new ServiceInfo();
        service.setId(1L);
        service.setName("service-name");
        service.setCreated(Timestamp.from(Instant.now()));
        service.setUrl("https://www.bemyaficionado.com");

        // When
        serviceEventHandler.handleAfterSave(service);

        // Then
        verify(serviceMonitor, times(1))
                .checkHealth(service);
    }

}