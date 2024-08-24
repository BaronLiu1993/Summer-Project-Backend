package backend.API.dto;

import backend.API.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

//Configrue Signing Up 
@Getter
@Setter
public class SignUpDto {

    private String username;
    private String password;
    private UserRole role; 
    private String firstName;
    private String lastName;
    private String university;
    private String program;


    public SignUpDto(String username, String password, UserRole role, String firstName, String lastName, String university, String program) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.university = university;
        this.program = program;
    }
}
