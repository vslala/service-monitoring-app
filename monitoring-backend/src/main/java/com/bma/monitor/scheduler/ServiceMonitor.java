package com.bma.monitor.scheduler;

import com.bma.monitor.service.ServiceInfo;

public interface ServiceMonitor {
    void execute();
    void checkHealth(ServiceInfo serviceInfo);
}
