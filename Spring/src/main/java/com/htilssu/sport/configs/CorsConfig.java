package com.htilssu.sport.configs;

import jakarta.validation.constraints.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            public void addCorsMappings(@NotNull CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("POST", "GET", "PUT", "DELETE")
                        .allowedOriginPatterns("*");
            }
        };
    }
}
