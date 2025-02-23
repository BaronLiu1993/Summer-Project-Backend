package backend.API.Services.FileService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.API.Repository.FileRepository;
import backend.API.dto.FileDto;
import backend.API.exceptions.ResourceNotFoundException;
import backend.API.models.File;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public File saveFile(FileDto fileDto) throws IOException {
        File fileEntity = new File();
        fileEntity.setFileData(fileDto.getFileData()); // Set file data (byte array)
        fileEntity.setFileName(fileDto.getFileName()); // Set file name
                return fileRepository.save(fileEntity); // Save and return the saved file entity
    }

    //@Cacheable(cacheNames = "fileId")
    public File getFile(Long id){
        return fileRepository.findById(id).get();
    }

    public void deleteFileById(Long id) {
        File file = fileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("DNE"));
        fileRepository.delete(file);
    }
    
}
