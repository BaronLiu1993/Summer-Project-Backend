package backend.API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.API.Services.AuthService;
import backend.API.Services.RateService.RateLimiter;
import backend.API.config.Auth.TokenProvider;
import backend.API.dto.JwtDto;
import backend.API.dto.SignInDto;
import backend.API.dto.SignUpDto;
import backend.API.enums.UserRole;
import backend.API.models.User;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService service;

    @Autowired
    private TokenProvider tokenService;

    @Autowired
    private RateLimiter rateLimiter;

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = service.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/admin/check")
    public ResponseEntity<String> checkAdmin(HttpServletRequest request) {
        String role = service.getCurrentUserRole(request);
        if (role != null && role.equals(UserRole.ADMIN.name())) {
            return ResponseEntity.ok("User is an admin");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not an admin");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody @Validated SignUpDto data, HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        if (!rateLimiter.allowRequest(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Too many requests. Please try again later.");
        }

        service.signUp(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody @Validated SignInDto data, HttpServletRequest request) {
      String clientIp = request.getRemoteAddr();
      if (!rateLimiter.allowRequest(clientIp)) {
          return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                  .body("Too many requests. Please try again later.");
      }

      var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
      var authUser = authenticationManager.authenticate(usernamePassword);
      var accessToken = tokenService.generateAccessToken((User) authUser.getPrincipal());
      return ResponseEntity.ok(new JwtDto(accessToken));
  } 
}
