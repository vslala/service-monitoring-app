package com.bma.monitor.user;

import com.bma.monitor.service.ServiceInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "user")
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties("hibernateLazyInitializer")
public class User {
    String username;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Long id;
    @JsonIgnore
    String password;

    @OneToMany(mappedBy = "user")
    List<ServiceInfo> serviceInfos;
}
