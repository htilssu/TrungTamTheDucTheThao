package com.htilssu.sport.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;

@Configuration
public class RoleConfig {

    @Bean
    public org.springframework.security.access.hierarchicalroles.RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
                .role("ADMIN")
                .implies("MODERATOR")
                .role("MODERATOR")
                .implies("EMPLOYEE")
                .role("COACH")
                .implies("USER")
                .build();
    }
}
