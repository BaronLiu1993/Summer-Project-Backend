package backend.API.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Blog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Blog implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "university")
    private String university;

    @Column(name = "program")
    private String program;

    @Column(name = "blog_topic")
    private String blogTopic;

    @Column(name = "blog_text", length = 15000)
    private String blogText;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "file_id", referencedColumnName = "fieldId")
    private File fileData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User creator;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Blog(User creator, String blogTopic, String blogText, File fileData) {
        this.creator = creator;
        this.blogTopic = blogTopic;
        this.blogText = blogText;
        this.fileData = fileData;
        this.createdAt = LocalDateTime.now();
        updateUserDetails();
    }

    public void updateUserDetails() {
        if (creator != null) {
            this.firstName = creator.getFirstName();
            this.lastName = creator.getLastName();
            this.userName = creator.getUsername();
            this.university = creator.getUniversity();
            this.program = creator.getProgram();
        }
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
