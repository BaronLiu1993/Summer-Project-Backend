package backend.API.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.exceptions.JWTVerificationException;

import backend.API.Repository.UserRepository;
import backend.API.config.Auth.TokenProvider;
import backend.API.dto.SignUpDto;
import backend.API.exceptions.InvalidJWTException;
import backend.API.exceptions.ResourceNotFoundException;
import backend.API.models.User;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService implements UserDetailsService {

  @Autowired
  private TokenProvider tokenProvider;

  @Autowired
  private UserRepository userRepository;


  @Override
  public UserDetails loadUserByUsername(String username) {
    var user = userRepository.findByUsername(username);
    return user;
  }

  public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
  }

  private String recoverToken(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        return authHeader.substring(7);
    }
    return null;
  }

  public User getCurrentAuthenticatedUser(HttpServletRequest request) {
        try {
            String token = recoverToken(request);
            if (token != null) {
                String username = tokenProvider.validateToken(token);
                return userRepository.findByUsername(username);
            } else {
                throw new RuntimeException("No token found");
            }
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public String getCurrentUserRole(HttpServletRequest request) {
      try {
          String token = recoverToken(request);
          if (token != null) {
              String username = tokenProvider.validateToken(token);
              User user = userRepository.findByUsername(username);
              if (user != null) {
                  return user.getRole().name(); // Convert enum to string
              }
          } else {
              throw new RuntimeException("No token found");
          }
      } catch (JWTVerificationException e) {
          throw new RuntimeException("Invalid JWT token", e);
      }
      return null;
  }
  


  public UserDetails signUp(SignUpDto data) throws InvalidJWTException {
    if (userRepository.findByUsername(data.getUsername()) != null) {
      throw new InvalidJWTException("Username Is Already In The Database");
    }
    String encryptedPassword = new BCryptPasswordEncoder().encode(data.getPassword());
    User newUser = new User(
      data.getUsername(),        // username
      encryptedPassword,        // password
      data.getRole(),           // role
      data.getFirstName(),      // firstName
      data.getLastName(),       // lastName
      data.getUniversity(),     // university
      data.getProgram()         // program
  );
  
  return userRepository.save(newUser);
  }
}