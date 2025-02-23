package backend.API.dto;
import java.time.LocalDateTime;

import backend.API.models.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Question DTO So that the Direct DTO is Not Modified
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {

    private Long id; //ID of the question
    private String text; //Text that is Provided

    //Creator is supplied by the User entity associated and is mapped in the QuestionMapper
    private Long creatorId; // Creator's ID
    private String creatorFirstName; // Creator's first name
    private String creatorLastName; // Creator's last name
    private String creatorProgram; // Creator's program
    private String creatorUniversity; // Creator's university
    private LocalDateTime createdAt;

    public QuestionDto(Long id, String creatorFirstName, String creatorLastName, String creatorProgram, String creatorUniversity, String text, LocalDateTime createdAt) {
        this.id = id;
        this.creatorFirstName = creatorFirstName;
        this.creatorLastName = creatorLastName;
        this.creatorProgram = creatorProgram;
        this.creatorUniversity = creatorUniversity;
        this.text = text;
        this.createdAt = createdAt;
    }
    public static QuestionDto mapToQuestionDtoWithCreatorDetails(Question question) {
        if (question == null) {
            return null;
        }

        return new QuestionDto(
            question.getId(),
            question.getCreator().getFirstName(),
            question.getCreator().getLastName(),
            question.getCreator().getProgram(),
            question.getCreator().getUniversity(),
            question.getText(),
            question.getCreatedAt()
        );

        
    }
}
