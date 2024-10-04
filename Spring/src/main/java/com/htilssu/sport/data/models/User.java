package com.htilssu.sport.data.models;
import com.htilssu.sport.validation.MinAge;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;
import java.time.Period;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "\"user\"")
public class User {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
    @Pattern(regexp = "\\d+", message = "Số điện thoại chỉ được chứa số")
    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @NotBlank(message = "Họ không được để trống")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Tên không được để trống")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "gender", nullable = false)
    private Boolean gender = false;

    // @Past(message = "Ngày sinh phải là một ngày trong quá khứ")
    // @MinAge(value = 16, message = "Tuổi phải từ 16 trở lên")
    // @Column(name = "dob", nullable = false)
    // private LocalDate dob;
    @Past(message = "Ngày sinh phải là một ngày trong quá khứ")
    @MinAge(message = "Người dùng phải từ 16 tuổi trở lên", value = 16)
    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    // Phương thức kiểm tra tuổi
    public boolean isAgeValid(int minAge) {
        if (dob == null) {
            return false; // Ngày sinh không được null
        }
        return Period.between(dob, LocalDate.now()).getYears() >= minAge; // Kiểm tra tuổi
    }
}
    