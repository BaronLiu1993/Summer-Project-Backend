package backend.API.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Blog DTO so that the Direct Blog Entity is Not Modified When Request is Made
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private Long id; //ID of the Blog
    private String firstName; //Firtname of the Blogger From UserDTO of Associated ADMIN
    private String lastName; //Firtname of the Blogger From UserDTO of Associated ADMIN
    private String userName; //Username of the Blogger From UserDTO of Associated ADMIN
    private String university; //University of the Blogger From UserDTO of Associated ADMIN
    private String program; //Program of the Blogger From UserDTO of Associated ADMIN
    private String blogTopic; //topic of the Blog
    private String blogText; //Text of the Blog
    private LocalDateTime createdAt; // Time Stamp
    private FileDto fileDto; //file DTO
}
