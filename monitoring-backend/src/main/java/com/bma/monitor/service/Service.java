package com.bma.monitor.service;

import com.bma.monitor.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity(name = "service")
@Table(name = "service", indexes = {
        @Index(name = "service_id_index", columnList = "id"),
        @Index(name = "service_userid_index", columnList = "userid")
})
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties("hibernateLazyInitializer")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String url;
    @CreationTimestamp
    @Column(name = "created")
    Timestamp createdAt;

    @OneToMany(mappedBy = "service")
    List<HealthStatus> health;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", nullable = false)
    User user;

}
