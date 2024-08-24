package backend.API.controllers;

import java.io.IOException;
import java.util.Collections;
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
import org.springframework.web.multipart.MultipartFile;

import backend.API.Services.BlogService.BlogService;
import backend.API.dto.BlogDto;
import backend.API.exceptions.ResourceNotFoundException;
import backend.API.exceptions.UnauthorizedAccessException;
import jakarta.servlet.http.HttpServletRequest;

//Controller for the Routing of the Blog
@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;
    
    //Post Method for the Creation of a Blog
    @PostMapping
    public ResponseEntity<?> createBlog(
        @RequestParam("blogTopic") String blogTopic,
        @RequestParam("blogText") String blogText,
        @RequestParam("file") MultipartFile file,
        HttpServletRequest request
    ) {
        try {
            BlogDto blogDto = new BlogDto();
            blogDto.setBlogTopic(blogTopic);
            blogDto.setBlogText(blogText);

            BlogDto createdBlogDto = blogService.createBlog(request, blogDto, file);
            return ResponseEntity.ok(createdBlogDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("An error occurred while processing the file.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("An error occurred while creating the blog.");
        }
    }

    //Get Method for Getting a Blog by its ID
    @GetMapping("/{blogId}")
    public ResponseEntity<?> getBlogById(@PathVariable Long blogId) {
        try {
            BlogDto blog = blogService.getBlogById(blogId);
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("An error occurred while fetching the blog post: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("An error occurred while fetching the blog post.");
        }
    }

    //GET Method for Getting all Blogs
    @GetMapping
    public ResponseEntity<List<BlogDto>> getAllBlogs() {
        try {
            List<BlogDto> blogs = blogService.getAllBlogs();
            return ResponseEntity.ok(blogs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(Collections.emptyList());
        }
    }

    //PUT Method to Update a Blog By Its ID
    @PutMapping("/{blogId}")
    public ResponseEntity<BlogDto> updateBlog(
            @PathVariable Long blogId,
            @RequestBody BlogDto updatedBlogDto,
            HttpServletRequest request) {
        try {
            BlogDto updatedBlog = blogService.updateBlog(request, blogId, updatedBlogDto);
            return ResponseEntity.ok(updatedBlog);
        } catch (ResourceNotFoundException e) {
            System.err.println("Resource not found: " + e.getMessage());
            e.printStackTrace(); // To print stack trace to console
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (UnauthorizedAccessException e) {
            System.err.println("Unauthorized access: " + e.getMessage());
            e.printStackTrace(); // To print stack trace to console
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (Exception e) {
            System.err.println("Internal server error: " + e.getMessage());
            e.printStackTrace(); // To print stack trace to console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Delete a Blog By Taking Its ID
    @DeleteMapping("/{blogId}")
    public ResponseEntity<String> deleteBlog(
            @PathVariable Long blogId,
            HttpServletRequest request) {
        try {
            blogService.deleteBlog(request, blogId, null); 
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            System.err.println("Resource not found: " + e.getMessage());
            e.printStackTrace(); // Print stack trace to console
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found.");
        } catch (UnauthorizedAccessException e) {
            System.err.println("Unauthorized access: " + e.getMessage());
            e.printStackTrace(); // Print stack trace to console
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this blog.");
        } catch (Exception e) {
            System.err.println("Internal server error: " + e.getMessage());
            e.printStackTrace(); // Print stack trace to console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the blog.");
        }
    }
}
