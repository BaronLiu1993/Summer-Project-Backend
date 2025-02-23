package backend.API.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDto {

    private Long id; //ID of the answer
    private String text; //The text of the answer
    private Long questionId; // ID of the related question
    private Long responderId; // ID of the responder
    private String responderUsername; // Username of the responder
    private String responderFirstName; //FirtName of responder
    private String responderLastName; //Lastname of responder
    private String responderProgram; //Program of responder
    private String responderUniversity; //Program of responder
    private LocalDateTime answeredAt; // Time Stamp
}
