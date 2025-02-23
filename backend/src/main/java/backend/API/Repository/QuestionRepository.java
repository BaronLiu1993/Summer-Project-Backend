package backend.API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.API.models.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
}