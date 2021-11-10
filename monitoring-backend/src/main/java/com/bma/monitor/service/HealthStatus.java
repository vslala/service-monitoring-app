package com.bma.monitor.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity(name = "health")
@Table(name = "health")
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties("hibernateLazyInitializer")
public class HealthStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String status;
    @CreationTimestamp
    @Column(name = "created")
    Timestamp createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceid", nullable = false)
    Service service;

}
