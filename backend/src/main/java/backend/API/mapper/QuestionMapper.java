package backend.API.mapper;

import java.time.LocalDateTime;

import backend.API.dto.QuestionDto;
import backend.API.models.Question;
import backend.API.models.User;
public class QuestionMapper {
    
    public static Question mapToQuestion(QuestionDto questionDto, User creator) {
        if (questionDto == null) {
            return null;
        }
        return new Question(
            questionDto.getText(),
            creator,
            LocalDateTime.now() 
        );
    }

    public static QuestionDto mapToQuestionDtoWithCreatorDetails(Question question) {
        if (question == null) {
            return null;
        }
        User creator = question.getCreator(); // Assuming `getCreator()` exists
        return new QuestionDto(
            question.getId(),
            question.getText(),
            creator != null ? creator.getId() : null,
            creator != null ? creator.getFirstName() : null,
            creator != null ? creator.getLastName() : null,
            creator != null ? creator.getProgram() : null,
            creator != null ? creator.getUniversity() : null,
            question.getCreatedAt()
        );
    }

    // Add any additional methods if needed
}
