package com.bma.monitor.scheduler;

import com.bma.monitor.mocks.TestFixtures;
import com.bma.monitor.service.HealthHistory;
import com.bma.monitor.service.HealthHistoryRepository;
import com.bma.monitor.service.ServiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MonitoringJobTest {

    private WebClient webClient;
    WebClient.ResponseSpec webClientResponseSpec;
    private ServiceRepository serviceRepository;
    private HealthHistoryRepository healthHistoryRepository;
    private MonitoringJob monitoringJob;

    @BeforeEach
    void setUp() {
        // mocks
        serviceRepository = mock(ServiceRepository.class);
        healthHistoryRepository = mock(HealthHistoryRepository.class);

        webClientResponseSpec = mock(WebClient.ResponseSpec.class);
        when(webClientResponseSpec.toEntity(String.class)).thenReturn(Mono.just(ResponseEntity.ok("")));

        var requestHeaderUriSpec = mock(WebClient.RequestHeadersUriSpec.class);
        when(requestHeaderUriSpec.uri(anyString())).thenReturn(requestHeaderUriSpec);
        when(requestHeaderUriSpec.retrieve()).thenReturn(webClientResponseSpec);

        webClient = mock(WebClient.class);
        when(webClient.get()).thenReturn(requestHeaderUriSpec);

        when(healthHistoryRepository.save(any(HealthHistory.class)))
                .thenReturn(HealthHistory.builder().build());

        // inject
        monitoringJob = new MonitoringJob(webClient, serviceRepository, healthHistoryRepository);
    }

    @Test
    void shouldCallAllWebServicesEndPointForHealthCheck() {
        // Given
        when(serviceRepository.findAll()).thenReturn(List.of(TestFixtures.getServiceInfo()));
        var healthHistoryArgumentCaptor = ArgumentCaptor.forClass(HealthHistory.class);

        // When
        monitoringJob.execute();

        // Then
        verify(serviceRepository, times(1)).findAll();
        verify(healthHistoryRepository, timeout(2000).times(1))
                .save(healthHistoryArgumentCaptor.capture());

        assertEquals("OK", healthHistoryArgumentCaptor.getValue().getStatus());
    }

    @Test
    void shouldCallPassedWebServiceInfoEndPointForHealthCheck() {
        // Given
        var healthHistoryArgumentCaptor = ArgumentCaptor.forClass(HealthHistory.class);


        // When
        monitoringJob.checkHealth(TestFixtures.getServiceInfo());

        // Then
        verify(healthHistoryRepository, timeout(5000).times(1)).save(healthHistoryArgumentCaptor.capture());

        assertEquals("OK", healthHistoryArgumentCaptor.getValue().getStatus());
    }

    @Test
    void shouldSaveFailStatusIfServiceReturnNotOkay() {
        // Given
        var healthHistoryArgumentCaptor = ArgumentCaptor.forClass(HealthHistory.class);
        when(healthHistoryRepository.save(any(HealthHistory.class)))
                .thenReturn(HealthHistory.builder().build());
        when(webClientResponseSpec.toEntity(String.class)).thenReturn(Mono.just(ResponseEntity.badRequest().body("")));

        // When
        monitoringJob.checkHealth(TestFixtures.getServiceInfo());

        // Then
        verify(healthHistoryRepository, timeout(5000).times(1))
                .save(healthHistoryArgumentCaptor.capture());

        assertEquals("FAIL", healthHistoryArgumentCaptor.getValue().getStatus());
    }

}