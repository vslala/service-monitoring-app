package com.bma.monitor.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity(name = "healthhistory")
@Table(name = "healthhistory")
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties("hibernateLazyInitializer")
public class HealthHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String status;
    @CreationTimestamp
    @Column(name = "created")
    Timestamp created;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceid", nullable = false)
    Service service;

}
