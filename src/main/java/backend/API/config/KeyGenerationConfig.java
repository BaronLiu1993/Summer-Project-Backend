package backend.API.config;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import backend.API.Services.KeyGeneration;

//Create Key Configuration
@Configuration
public class KeyGenerationConfig {
    
    @Bean("KeyGenerationConfig")
    public KeyGenerator keyGenerator() {
        return new KeyGeneration();
    }
}
