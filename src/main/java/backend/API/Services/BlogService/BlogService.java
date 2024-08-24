package backend.API.Services.BlogService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import backend.API.Repository.BlogRepository;
import backend.API.Repository.UserRepository;
import backend.API.Services.AuthService;
import backend.API.Services.FileService.FileService;
import backend.API.dto.BlogDto;
import backend.API.dto.FileDto;
import backend.API.exceptions.ResourceNotFoundException;
import backend.API.exceptions.UnauthorizedAccessException;
import backend.API.mapper.BlogMapper;
import backend.API.models.Blog;
import backend.API.models.User;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private AuthService authService;

    public BlogDto createBlog(HttpServletRequest request, BlogDto blogDto, MultipartFile file) throws IOException {
        User creator = authService.getCurrentAuthenticatedUser(request);
    
        if (file != null && !file.isEmpty()) {
            FileDto fileDto = new FileDto();
            fileDto.setFileData(file.getBytes());
            fileDto.setFileName(file.getOriginalFilename());
            fileService.saveFile(fileDto);
            blogDto.setFileDto(fileDto);
        }
    
        blogDto.setCreatedAt(LocalDateTime.now());
        Blog blog = BlogMapper.mapToBlog(blogDto, creator);
        Blog savedBlog = blogRepository.save(blog);
        return BlogMapper.mapToBlogDto(savedBlog);
    }
    
    public BlogDto getBlogById(Long blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog does not exist with the given id: " + blogId));
        return BlogMapper.mapToBlogDto(blog);
    }

    //@Cacheable(cacheNames = "allBlogs")
    public List<BlogDto> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        return blogs.stream()
                .map(BlogMapper::mapToBlogDto)
                .collect(Collectors.toList());
    }

    public BlogDto updateBlog(HttpServletRequest request, Long blogId, BlogDto updatedBlogDto) {
        User currentUser = authService.getCurrentAuthenticatedUser(request);
    
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResourceNotFoundException("Blog does not exist with the given id: " + blogId));
    
        boolean isOwner = blog.getCreator().equals(currentUser);
        boolean isAdmin = currentUser.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
    
        if (!isOwner && !isAdmin) {
            throw new UnauthorizedAccessException("You are not authorized to update this blog.");
        }
    
        blog.setBlogTopic(updatedBlogDto.getBlogTopic());
        blog.setBlogText(updatedBlogDto.getBlogText());
    
        Blog updatedBlog = blogRepository.save(blog);
        return BlogMapper.mapToBlogDto(updatedBlog);
    }

    public void deleteBlog(HttpServletRequest request, Long blogId, Long userId) {
        User currentUser = authService.getCurrentAuthenticatedUser(request);
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Blog with ID %d not found for deletion.", blogId)));
    
        boolean isOwner = blog.getCreator().equals(currentUser);
        boolean isAdmin = currentUser.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
            
        if (!isOwner && !isAdmin) {
            throw new UnauthorizedAccessException("You are not authorized to update this blog.");
        } else {
            blogRepository.delete(blog);
        }
    }
}






