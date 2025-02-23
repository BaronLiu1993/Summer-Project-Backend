package backend.API.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.API.models.File;

public interface FileRepository extends JpaRepository<File, Long>{
    
}
