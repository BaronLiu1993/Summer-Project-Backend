package backend.API.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Image")
@Getter
@Setter
public class File implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fieldId; //Id of the file

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_data", columnDefinition = "bytea")
    private byte[] fileData;
}
