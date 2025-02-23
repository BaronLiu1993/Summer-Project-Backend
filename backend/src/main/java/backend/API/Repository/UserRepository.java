package backend.API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.API.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);
}
