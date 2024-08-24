package backend.API.config.Auth;

//Import Packages
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import backend.API.models.User;

@Service
public class TokenProvider {
  @Value("${security.jwt.token.secret-key}")
  private String JWT_SECRET;

  //Generator of Access Tokens
  public String generateAccessToken(User user) {
    try {
      //Use HMAC512 to Create The Access Token
      Algorithm algorithm = Algorithm.HMAC512(JWT_SECRET);
      return JWT.create()
          .withSubject(user.getUsername())
          .withClaim("username", user.getUsername())
          .withExpiresAt(Date.from(genAccessExpirationDate()))
          .sign(algorithm);
    } catch (JWTCreationException exception) {
      throw new JWTCreationException("Error Generating Token", exception);
    }
  }

  public String validateToken(String token) {
    try {
      //Validate the Token using the Same Algorithm in the generateAccessToken Method
      Algorithm algorithm = Algorithm.HMAC512(JWT_SECRET);
      return JWT.require(algorithm)
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      throw new JWTVerificationException("Error in Verification Process", exception);
    }
  }

  //Set an Expiration Date so An Access Token Does Not Stay Indefinitely
  private Instant genAccessExpirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  } // Change This Later
}