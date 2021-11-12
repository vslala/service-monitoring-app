package com.bma.monitor.config;

import com.bma.monitor.service.HealthHistory;
import com.bma.monitor.service.ServiceInfo;
import com.bma.monitor.user.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(User.class, ServiceInfo.class, HealthHistory.class);
    }

    @Bean
    public WebClient webClient() {
        return WebClient.create();
    }
}
