package backend.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import backend.API.Repository.AnswerRepository;
import backend.API.Repository.BlogRepository;
import backend.API.Repository.QuestionRepository;
import backend.API.Repository.UserRepository;

@SpringBootApplication
@EnableCaching
//@PropertySource("file:${user.dir}/.env")
public class ApiApplication implements CommandLineRunner{
	@Autowired
	private AnswerRepository answerRepository; //Hard Code Objects in the Answer Repository
	@Autowired
	private QuestionRepository questionRepository; //Hard Code Objects in the QuestionRepository
	@Autowired
	private UserRepository userRespository; //Hard Code Objects in the UserRepository
	@Autowired
	private BlogRepository blogRepository;
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
		
	}	

	@Override
	public void run(String... args) throws Exception{
		

	}	
}