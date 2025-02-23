package backend.API.mapper;

import backend.API.dto.BlogDto;
import backend.API.dto.FileDto;
import backend.API.models.Blog;
import backend.API.models.File;
import backend.API.models.User;

public class BlogMapper {

    public static BlogDto mapToBlogDto(Blog blog) {
        if (blog == null) {
            return null;
        }

        User user = blog.getCreator();

        // Create and map FileDto
        FileDto fileDto = null;
        if (blog.getFileData() != null) {
            fileDto = new FileDto();
            fileDto.setFileData(blog.getFileData().getFileData());
            fileDto.setFileName(blog.getFileData().getFileName()); 
        }

        return new BlogDto(
                blog.getId(),
                user != null ? user.getFirstName() : "Unknown",
                user != null ? user.getLastName() : "Unknown",
                user != null ? user.getUsername() : "Unknown",
                user != null ? user.getUniversity() : "Unknown",
                user != null ? user.getProgram() : "Unknown",
                blog.getBlogTopic(),
                blog.getBlogText(),
                blog.getCreatedAt(),
                fileDto 
        );
    }

    public static Blog mapToBlog(BlogDto blogDto, User user) {
        if (blogDto == null) {
            return null;
        }

        Blog blog = new Blog();
        blog.setId(blogDto.getId());
        blog.setBlogTopic(blogDto.getBlogTopic());
        blog.setBlogText(blogDto.getBlogText());
        blog.setCreatedAt(blogDto.getCreatedAt());
        blog.setCreator(user); 

        if (blogDto.getFileDto() != null) {
            File file = new File();
            file.setFileData(blogDto.getFileDto().getFileData());
            file.setFileName(blogDto.getFileDto().getFileName());
            blog.setFileData(file); // Attach File entity to Blog
        }

        return blog;
    }
}
