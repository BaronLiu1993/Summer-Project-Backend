package backend.API.enums;

//Define ROLES
public enum UserRole {
    ADMIN("ADMIN"), //Has Full Access of Everything
    USER("USER"); //Has Access To Only Some 

    private final String role;

    UserRole (String role) {
        this.role = role;
    }

    public String getValue() {
        return role;
    }

    public String getRole() {
        return role;
    }
}
