package backend.API.Services.QAService;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.API.Repository.AnswerRepository;
import backend.API.Repository.QuestionRepository;
import backend.API.Services.AuthService;
import backend.API.dto.AnswerDto;
import backend.API.dto.QuestionDto;
import backend.API.exceptions.ResourceNotFoundException;
import backend.API.exceptions.UnauthorizedAccessException;
import backend.API.mapper.AnswerMapper;
import backend.API.mapper.QuestionMapper;
import backend.API.models.Answer;
import backend.API.models.Question;
import backend.API.models.User;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class QAService {

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AuthService authService;

    @Transactional
    public QuestionDto createQuestion(HttpServletRequest request, QuestionDto questionDto) {
        User creator = authService.getCurrentAuthenticatedUser(request);
        if (creator == null) {
            throw new RuntimeException("User not authenticated");
        }
        Question question = QuestionMapper.mapToQuestion(questionDto, creator);
        Question savedQuestion = questionRepository.save(question);
        return mapToQuestionDtoWithCreatorDetails(savedQuestion);
    }

    @Transactional
    public QuestionDto updateQuestion(HttpServletRequest request, Long id, QuestionDto questionDto) {
        User currentUser = authService.getCurrentAuthenticatedUser(request);
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        if (!question.getCreator().equals(currentUser)) {
            throw new UnauthorizedAccessException("You are not authorized to update this question.");
        }
        question.setText(questionDto.getText());
        Question updatedQuestion = questionRepository.save(question);
        return mapToQuestionDtoWithCreatorDetails(updatedQuestion);
    }

    @Transactional
    public void deleteQuestion(HttpServletRequest request, Long questionId) {
        User currentUser = authService.getCurrentAuthenticatedUser(request);
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new ResourceNotFoundException(
                String.format("Question with ID %d not found for deletion.", questionId))
            );
        boolean isOwner = question.getCreator().equals(currentUser);
        boolean isAdmin = currentUser.getAuthorities().stream()
            .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (!isOwner && !isAdmin) {
            throw new UnauthorizedAccessException("You are not authorized to delete this question.");
        }
        answerRepository.deleteAll(question.getAnswers());
        questionRepository.delete(question);
    }

    
    @Transactional
    public AnswerDto answerQuestion(Long questionId, String text, HttpServletRequest request) {
        // Fetch the question from the repository
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with ID: " + questionId));
        
        // Retrieve the currently authenticated user
        User responder = authService.getCurrentAuthenticatedUser(request);
        if (responder == null) {
            throw new RuntimeException("User not authenticated");
        }
        
        // Check if the user is an admin
        boolean isAdmin = responder.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")); // Ensure the authority is prefixed correctly
        
        if (!isAdmin) {
            throw new UnauthorizedAccessException("You are not authorized to answer this question.");
        }

        // Create a new answer and set its properties
        Answer answer = new Answer();
        answer.setText(text);
        answer.setQuestion(question);
        answer.setResponder(responder);
        answer.setAnsweredAt(LocalDateTime.now());
        question.getAnswers().add(answer);
        questionRepository.save(question);
        return AnswerMapper.mapToAnswerDto(answer);
    }

    //@Cacheable(value = "allQuestions")
    public List<QuestionDto> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .map(this::mapToQuestionDtoWithCreatorDetails)
                .toList();
    }

    public List<Answer> getAnswersForQuestion(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }


    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    public Answer getAnswerByQuestionId(Long questionId) {
        return answerRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Answer not found"));
    }

    public Question getQuestionById(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
    }

    private QuestionDto mapToQuestionDtoWithCreatorDetails(Question question) {
        User creator = question.getCreator(); 
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
}
