package com.htilssu.sport.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "Sport Center API", version = "1.0",
                                description = "Documentation of Sport Center API"),
                   servers = @Server(url = "http://localhost:8080", description = "Local server"
                   ))
public class SwaggerConfig {

}
