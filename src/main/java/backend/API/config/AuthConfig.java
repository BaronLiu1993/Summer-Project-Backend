package backend.API.config;

//Import Packages

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import backend.API.config.Auth.SecurityFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class AuthConfig {
  //Injection of SecurityFilter
  @Autowired
  SecurityFilter securityFilter;

  //Inject SecurityFilterChain Globally
  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
    //Disable CSRF
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
        .authorizeHttpRequests(authorize -> authorize
            //Sign in and Sign up Methods
            .requestMatchers(HttpMethod.POST, "/api/v1/auth/signup*").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/v1/auth/signin*").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/auth/admin/check*").permitAll()

            //Question Methods
            .requestMatchers(HttpMethod.POST, "/api/v1/QA/questions*").hasRole("USER")
            .requestMatchers(HttpMethod.DELETE, "/api/v1/QA/questions*").hasRole("USER")
            .requestMatchers(HttpMethod.GET, "/api/v1/QA/questions*").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/QA/questions/{questionId}*").permitAll()
            .requestMatchers(HttpMethod.DELETE, "/api/v1/QA/questions/{id}*").hasRole("USER")
            .requestMatchers(HttpMethod.PUT, "/api/v1/QA/questions/{id}*").hasRole("USER")

            //Answer Methods
            .requestMatchers(HttpMethod.POST, "/api/v1/QA/answers*").hasRole("ADMIN")
            .requestMatchers(HttpMethod.GET, "/api/v1/QA/answers*").permitAll()
      
            //Blog Methods
            .requestMatchers(HttpMethod.DELETE, "/api/v1/blogs/{blogId}").hasRole("ADMIN")
            .requestMatchers(HttpMethod.POST, "/api/v1/blogs*").hasRole("ADMIN")
            .requestMatchers(HttpMethod.GET, "/api/v1/blogs*").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/blogs/{blogId}").permitAll()
            .requestMatchers(HttpMethod.PUT, "/api/v1/blogs/").hasRole("ADMIN")
            .anyRequest().authenticated()) 
        .build();
  }

  //Bean Injection to Manage Authentication Globally
  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
      throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  //Password Encoder to Ensure the Encryption of Passwords
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}