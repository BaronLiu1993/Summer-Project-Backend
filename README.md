# Overview
This project is a Spring Boot backend application designed to manage a Q&A and Blog service. It provides RESTful APIs to handle operations related to questions, answers, blogs, and user authentication.

It utilises Redis for caching, ProgreSQL as a relational database, Docker for running and creating isolated environments. Backend is ran on AWS EC2 instance with RDS and S3 bucket.

# Features
User Authentication: Secure user authentication and authorization using JWT.

Q&A Management: CRUD operations for questions and answers.

Blog Management: CRUD operations for blog posts, including file uploads.

Role-Based Access Control: Different access levels for users and admins.

Caching: Utilizes Redis for caching to improve performance.

Rate Limiter: To prevent abuse of the API a limit of 10 API calls are set per person for a time of 1 minute.

# Tech Stack
Spring Boot: Core framework for building the application.

Spring Data JPA: Data persistence and repository management.

Spring Security: Authentication and authorization.

JWT (JSON Web Tokens): Token-based authentication.

PostgreSQL: Database management.

Redis: Caching mechanism.

Docker: Containerization of the application.

Project Structure

backend.API

├── config/             # Configuration files (e.g., security, JWT, Redis)

├── controller/         # REST API controllers

├── dto/                # Data Transfer Objects (DTOs)

├── exceptions/         # Custom exception handling

├── mapper/             # Mapping entities to DTOs and vice versa

├── models/             # Entity models

├── repository/         # JPA repositories for database operations

├── services/           # Service layer containing business logic

└── Application.java    # Main application entry point

# Services:
QAService: Manages operations related to questions and answers, including creating, updating, deleting questions, and adding answers.

FileSerice: Manages operations related to uploading files and multipart data.

BlogService: Handles the creation, retrieval, updating, and deletion of blog posts, including file handling for attachments.

AuthService: Manages user authentication, token validation, and user sign-up.

Getting Started

# Prerequisites
Java 17: Ensure you have Java 17 installed.

Maven: Build tool for managing dependencies and running the application.

Docker: Required to run the application in a containerized environment.

PostgreSQL: Database service for storing application data.

Redis: Caching service to enhance performance.

# Installation
Clone the Repository by Copying Code:

git clone https://github.com/BaronLiu1993/Summer-Project-Backend.git

cd API

Environment Configuration

Create a .env file in the root directory with the following content:

Security

SECURITY_JWT_TOKEN_SECRET_KEY= #

JPA

SPRING_JPA_HIBERNATE_DDL_AUTO=update

SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect

SPRING_JPA_SHOW_SQL=true

Server
SERVER_PORT=#

Cache

SPRING_CACHE_TYPE=redis

SPRING_CACHE_REDIS_TIME_TO_LIVE=60000


Redis

SPRING_REDIS_HOST= #  # Use the correct Redis hostname from Docker Compose

SPRING_REDIS_PORT= #

DataSource

SPRING_DATASOURCE_URL= #

SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver

SPRING_DATASOURCE_USERNAME= #

SPRING_DATASOURCE_PASSWORD= #

Multipart

SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE=2MB

SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE=10MB

Build and Run with Docker

Create Docker File + Compose.yml file

Use Docker Compose to build and run the application:

Copy code

docker-compose up --build

Access the Application and the application should now be running at http://localhost:8080.

# Usage API Endpoints:

Version 1:

https://localhost:8080/api/v1/

Q&A:

POST QA/questions: Create a new question.

PUT QA/questions/{id}: Update an existing question.

DELETE QA/questions/{id}: Delete a question.

POST QA/questions/{id}/answers: Answer a question.

Blog:

POST /blogs: Create a new blog post.

GET /blogs: Retrieve all blog posts.

PUT /blogs/{id}: Update a blog post.

DELETE /blogs/{id}: Delete a blog post.

Auth:

POST /auth/signup: Register a new user.

POST /auth/signin: Signin to the program
