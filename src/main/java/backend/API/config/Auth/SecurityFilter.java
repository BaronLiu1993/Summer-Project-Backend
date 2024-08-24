package backend.API.config.Auth;

//Imports
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import backend.API.Repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    //Injection of tokenService
    @Autowired
    TokenProvider tokenService;

    //Injection of userRepository for 
    @Autowired
    UserRepository userRepository;


    //Validation Code to Determine The Validity of Tokens
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        var token = recoverToken(request);
        if (token != null && !token.isEmpty()) {
            try {
                var username = tokenService.validateToken(token);
                var user = userRepository.findByUsername(username);

                //Get The Authority of the User and Authenticate Them
                if (user != null) {
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

                //Log Errors Here
            } catch (Exception e) {
                logger.error("Error validating token", e);
            }
        }
        filterChain.doFilter(request, response);
    }

    //Recover the Token from API Request from the Client Side
    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        //The Token From The Frontend Should be Stripped of Bearer Here
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}
