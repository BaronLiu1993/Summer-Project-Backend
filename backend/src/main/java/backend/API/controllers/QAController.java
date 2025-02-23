package backend.API.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.API.Services.QAService.QAService;
import backend.API.Services.RateService.RateLimiter;
import backend.API.dto.AnswerDto;
import backend.API.dto.QuestionDto;
import backend.API.exceptions.ResourceNotFoundException;
import backend.API.exceptions.UnauthorizedAccessException;
import backend.API.mapper.AnswerMapper;
import backend.API.mapper.QuestionMapper;
import backend.API.models.Answer;
import jakarta.servlet.http.HttpServletRequest;

//Controller for the QAService for Handling Questions and Answers
@RestController
@RequestMapping("/api/v1/QA")
public class QAController {

    @Autowired
    private RateLimiter rateLimiter;

    //Injection of the qaService Layer
    @Autowired
    private QAService qaService;

    //Creates a Question (No Answer With It)
    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(HttpServletRequest request, @RequestBody QuestionDto questionDto) {
        String clientIp = request.getRemoteAddr();
        if (!rateLimiter.allowRequest(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Too many requests. Please try again later.");
        } 
        QuestionDto createdQuestion = qaService.createQuestion(request, questionDto);
        return ResponseEntity.ok(createdQuestion);
    }

    //Updates The Question Through Finding its ID
    @PutMapping("/questions/{id}")
    public ResponseEntity<QuestionDto> updateQuestion(
            HttpServletRequest request,
            @PathVariable Long id,
            @RequestBody QuestionDto questionDto) {
        try {
            QuestionDto updatedQuestionDto = qaService.updateQuestion(request, id, questionDto);
            return new ResponseEntity<>(updatedQuestionDto, HttpStatus.OK);
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                 .body(null); 
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null); 
        }
    }

    //Delete a Question Along with its Answer as The Question Entity Cascades.ALL and Deletes Children
    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<?> deleteQuestion(HttpServletRequest request, @PathVariable Long questionId) {
        try {
            qaService.deleteQuestion(request, questionId);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    //POST Method to Create Answer for A Question
    @PostMapping("/answers")
    public ResponseEntity<?> answerQuestion(
            @RequestBody AnswerDto answerRequest, // DTO for request body
            HttpServletRequest request) {
        try {
            AnswerDto answerDto = qaService.answerQuestion(answerRequest.getQuestionId(), answerRequest.getText(), request);
            return new ResponseEntity<>(answerDto, HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            // Handle case when the question is not found
            //Error Handling is Done in this Catch Block
            //Most Errors Would Occur Here Due to the Implementation of DTOS
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Question not found with ID: " + answerRequest.getQuestionId());
        } catch (UnauthorizedAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body("You are not authorized to answer this question.");
        } catch (Exception e) {
            // Handle any other unexpected errors
            e.printStackTrace(); // Log the error (optional)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("An error occurred while processing your request.");
        }
    }

    //Get all the Questions
    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDto>> getAllQuestions() {
        List<QuestionDto> questionDtos = qaService.getAllQuestions();
        return new ResponseEntity<>(questionDtos, HttpStatus.OK);
    }

    //Getting Individual Questions using QuestionID
    @GetMapping("/questions/{questionId}")
    public ResponseEntity<QuestionDto> getQuestionById(@PathVariable Long questionId) {
        QuestionDto questionDto = QuestionMapper.mapToQuestionDtoWithCreatorDetails(qaService.getQuestionById(questionId));
        return new ResponseEntity<>(questionDto, HttpStatus.OK);
    }

    //Getting All Answers For the questions
    @GetMapping("/answers")
    public ResponseEntity<List<AnswerDto>> getAnswersForQuestion(@RequestParam Long questionId) {
        List<Answer> answers = qaService.getAnswersForQuestion(questionId);
        List<AnswerDto> answerDtos = answers.stream()
                .map(AnswerMapper::mapToAnswerDto)
                .toList();
        return new ResponseEntity<>(answerDtos, HttpStatus.OK);
    }

    //Getting All of the Answers ONLY
    @GetMapping("/answers-only")
    public ResponseEntity<List<AnswerDto>> getAllAnswers() {
        List<Answer> answers = qaService.getAllAnswers();
        List<AnswerDto> answerDtos = answers.stream()
                .map(AnswerMapper::mapToAnswerDto) //Map to AnswerDTO, Interact With DTO instead of Directly Altering the Answer Object Itself
                .toList();
        return new ResponseEntity<>(answerDtos, HttpStatus.OK);
    }

    //Getting Individual Answers Using the Question ID
    @GetMapping("/answers/question/{questionId}")
    public ResponseEntity<AnswerDto> getAnswerByQuestionId(@PathVariable Long questionId) {
        Answer answer = qaService.getAnswerByQuestionId(questionId);
        AnswerDto answerDto = AnswerMapper.mapToAnswerDto(answer); //Map to AnswerDTO, Interact With DTO instead of Directly Altering the Answer Object Itself
        return new ResponseEntity<>(answerDto, HttpStatus.OK);
    }
}
