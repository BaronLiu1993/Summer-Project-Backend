package backend.API.mapper;

import java.time.LocalDateTime;

import backend.API.dto.AnswerDto;
import backend.API.models.Answer;
import backend.API.models.Question;
import backend.API.models.User;

public class AnswerMapper {

    // Maps AnswerDto to Answer entity
    public static Answer mapToAnswer(AnswerDto answerDto, User responder, Question question) {
        if (answerDto == null) {
            return null; // Return null if the DTO is not provided
        }

        Answer answer = new Answer();
        answer.setId(answerDto.getId()); // Set ID if provided, otherwise it can be auto-generated
        answer.setText(answerDto.getText() != null ? answerDto.getText() : ""); // Default to empty string if text is null
        answer.setResponder(responder != null ? responder : new User()); // Handle null responder (you might want to handle this case better)
        answer.setQuestion(question != null ? question : new Question()); // Handle null question (you might want to handle this case better)
        answer.setAnsweredAt(answerDto.getAnsweredAt() != null ? answerDto.getAnsweredAt() : LocalDateTime.now()); // Default to now if answeredAt is null

        return answer;
    }

    // Maps Answer entity to AnswerDto
    public static AnswerDto mapToAnswerDto(Answer answer) {
        if (answer == null) {
            return null; // Return null if the answer is not found
        }

        AnswerDto answerDto = new AnswerDto();
        answerDto.setId(answer.getId());
        answerDto.setText(answer.getText() != null ? answer.getText() : ""); // Default to empty string if text is null
        answerDto.setQuestionId(answer.getQuestion() != null ? answer.getQuestion().getId() : null); // Handle null question
        answerDto.setResponderId(answer.getResponder() != null ? answer.getResponder().getId() : null); // Handle null responder

        if (answer.getResponder() != null) {
            answerDto.setResponderUsername(answer.getResponder().getUsername() != null ? answer.getResponder().getUsername() : "Unknown"); // Default to "Unknown" if username is null
            answerDto.setResponderFirstName(answer.getResponder().getFirstName() != null ? answer.getResponder().getFirstName() : "Unknown"); // Default to "Unknown" if first name is null
            answerDto.setResponderLastName(answer.getResponder().getLastName() != null ? answer.getResponder().getLastName() : "Unknown"); // Default to "Unknown" if last name is null
            answerDto.setResponderProgram(answer.getResponder().getProgram() != null ? answer.getResponder().getProgram() : "Unknown"); // Default to "Unknown" if program is null
            answerDto.setResponderUniversity(answer.getResponder().getUniversity() != null ? answer.getResponder().getUniversity() : "Unknown"); // Default to "Unknown" if university is null
        } else {
            answerDto.setResponderUsername("Unknown");
            answerDto.setResponderFirstName("Unknown");
            answerDto.setResponderLastName("Unknown");
            answerDto.setResponderProgram("Unknown");
            answerDto.setResponderUniversity("Unknown");
        }

        answerDto.setAnsweredAt(answer.getAnsweredAt() != null ? answer.getAnsweredAt() : LocalDateTime.now()); // Default to now if answeredAt is null

        return answerDto;
    }
}
