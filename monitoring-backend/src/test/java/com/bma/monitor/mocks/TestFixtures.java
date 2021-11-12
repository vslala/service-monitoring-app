package com.bma.monitor.mocks;

import com.bma.monitor.service.ServiceInfo;
import lombok.experimental.UtilityClass;

import java.sql.Timestamp;
import java.time.Instant;

@UtilityClass
public class TestFixtures {
    public static ServiceInfo getServiceInfo() {
        return ServiceInfo.builder()
                .id(1L)
                .name("BeMyAficionado")
                .url("https://www.bemyaficionado.com")
                .created(Timestamp.from(Instant.now()))
                .build();
    }
}
