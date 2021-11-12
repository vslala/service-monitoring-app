package com.bma.monitor.service;

import com.bma.monitor.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity(name = "serviceInfo")
@Table(name = "serviceinfo", indexes = {
        @Index(name = "service_id_index", columnList = "id"),
        @Index(name = "service_userid_index", columnList = "userid")
})
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties("hibernateLazyInitializer")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String url;
    @CreationTimestamp
    @Column(name = "created")
    Timestamp created;

    @OneToMany(mappedBy = "serviceInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    List<HealthHistory> healthHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", nullable = false)
    User user;

}
