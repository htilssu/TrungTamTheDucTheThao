package com.htilssu.sport.configs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
     @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Cho phép tất cả các endpoint
                        .allowedOrigins("http://localhost:5173")  // Cho phép React frontend truy cập
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Các phương thức HTTP được phép
                        .allowedHeaders("*")  // Cho phép tất cả các header
                        .allowCredentials(true);  // Cho phép sử dụng cookies
            }
        };
    }
}
