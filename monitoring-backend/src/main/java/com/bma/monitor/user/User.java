package com.bma.monitor.user;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity(name = "user")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    String username;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Long id;
    String password;
}
