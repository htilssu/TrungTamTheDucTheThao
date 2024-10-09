package com.htilssu.sport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableWebSecurity
@EnableWebMvc
@Configuration
public class SportApplication {
    public static void main(String[] args) {
        SpringApplication.run(SportApplication.class, args);
    }
}
