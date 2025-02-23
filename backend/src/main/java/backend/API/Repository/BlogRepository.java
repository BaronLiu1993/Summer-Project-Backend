package backend.API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.API.models.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    
}
