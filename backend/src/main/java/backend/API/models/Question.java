package backend.API.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany; 
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Question") 
public class Question implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text", nullable = false, length = 1000) // Ensure text is not null
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Answer> answers = new HashSet<>(); // Use Set to avoid duplicate answers

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Question(String text, User creator) {
        this.text = text;
        this.creator = creator;
    }

    public Question(String text, User creator, LocalDateTime createdAt) {
        this.text = text;
        this.creator = creator;
        this.createdAt = createdAt;
    }

    public String getCreatorFirstName() {
        return creator != null ? creator.getFirstName() : "Unknown";
    }

    public String getCreatorLastName() {
        return creator != null ? creator.getLastName() : "Unknown";
    }

    public String getCreatorProgram() {
        return creator != null ? creator.getProgram() : "Unknown";
    }

    public String getCreatorUniversity() {
        return creator != null ? creator.getUniversity() : "Unknown";
    }
}
