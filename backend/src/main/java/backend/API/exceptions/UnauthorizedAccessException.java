package backend.API.exceptions;

public class UnauthorizedAccessException extends RuntimeException {
    
    // Constructor with a message
    public UnauthorizedAccessException(String message) {
        super(message);
    }

    // Constructor with a message and cause
    public UnauthorizedAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}

