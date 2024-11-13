package com.htilssu.sport.services;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.dtos.RegistrationDto;
import com.htilssu.sport.data.mappers.AccountMapper;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repositories.AccountRepository;
import com.htilssu.sport.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Optional;
import java.util.regex.Pattern;

import static com.htilssu.sport.services.RoleService.DEFAULT_ROLE;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    private static final String PASSWORD_REGEX =
            "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$";
    private final RoleService roleService;

    public AccountDto registerUser(RegistrationDto registrationDto) {
        Optional<Account> existingAccount = accountRepository.findByEmail(registrationDto.email());

        // Name
        if (registrationDto.user()
                .lastName() == null ||
                registrationDto.user()
                        .lastName()
                        .isEmpty()) {
            throw new IllegalArgumentException("Tên không được để trống");
        }
        else if (registrationDto.user()
                .lastName()
                .length() < 2) {
            throw new IllegalArgumentException("Tên phải trong khoảng từ 2 đến 30 kí tự");
        }

        // Dob
        if (registrationDto.user()
                .dob() == null ||
                registrationDto.user()
                        .dob()
                        .isEmpty()) {
            throw new IllegalArgumentException("Ngày sinh không được để trống");
        }
        else if (!isValidDob(registrationDto.user()
                .dob())) {
            throw new IllegalArgumentException("Tuổi phải lớn hơn 13");
        }

        // Gender
        if (registrationDto.user()
                .gender() == null) {
            throw new IllegalArgumentException("Có lỗi về giới tính");
        }

        // Email
        if (existingAccount.isPresent()) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }
        else if (registrationDto.email() == null) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        else if (!isValidEmail(registrationDto.email())) {
            throw new IllegalArgumentException("Định dạng email không hợp lệ");
        }

        // Password
        if (registrationDto.password() == null ||
                registrationDto.password()
                        .isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        else if (!isValidPassword(registrationDto.password())) {
            throw new IllegalArgumentException(
                    "Mật khẩu phải có ít nhất từ 6 đến 18 kí tự, bao gồm ít nhất một chữ in hoa, " +
                            "một số, và một ký tự đặc biệt");
        }

        // RePassword
        if (registrationDto.confirmPassword() == null ||
                registrationDto.confirmPassword()
                        .isEmpty()) {
            throw new IllegalArgumentException("Xác nhận mật khẩu không được để trống");
        }
        else if (!registrationDto.password()
                .equals(registrationDto.confirmPassword())) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không khớp");
        }

        User user = new User();
        user.setPhoneNumber(null);
        user.setFirstName(null);
        user.setLastName(registrationDto.user()
                .lastName());
        user.setGender(registrationDto.user()
                .gender());
        user.setDob(LocalDate.parse(registrationDto.user()
                .dob()));
        user.setAvatar(null);

        roleService.assignRole(user, DEFAULT_ROLE);
        User savedUser = userRepository.save(user);

        Account account = new Account();
        account.setUser(savedUser);
        account.setEmail(registrationDto.email());
        account.setPassword(passwordEncoder.encode(registrationDto.password()));

        Account savedAccount = accountRepository.save(account);

        return accountMapper.toDto(savedAccount);
    }

    private boolean isValidEmail(String email) {
        return Pattern.compile(EMAIL_REGEX)
                .matcher(email)
                .matches();
    }

    private boolean isValidPassword(String password) {
        return Pattern.compile(PASSWORD_REGEX)
                .matcher(password)
                .matches();
    }

    private boolean isValidDob(String dob) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate birthDate = LocalDate.parse(dob, formatter);

            LocalDate currentDate = LocalDate.now();

            Period age = Period.between(birthDate, currentDate);

            return age.getYears() >= 13;
        } catch (DateTimeParseException e) {
            return false;
        }
    }

}
