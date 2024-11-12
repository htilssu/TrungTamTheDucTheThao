package com.htilssu.sport.services;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.dtos.RegistrationDto;
import com.htilssu.sport.data.mappers.AccountMapper;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repositories.AccountRepository;
import com.htilssu.sport.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
    private static final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$";

    public AccountDto registerUser(RegistrationDto registrationDto) {
        Optional<Account> existingAccount = accountRepository.findByEmail(registrationDto.email());

        // Name
    if (registrationDto.user().lastName() == null || registrationDto.user().lastName().isEmpty()) {
        throw new IllegalArgumentException("Tên không được để trống");
    } else if (registrationDto.user().lastName().length() < 2 || registrationDto.user().lastName().length() > 30) {
        throw new IllegalArgumentException("Tên phải trong khoảng từ 2 đến 30 kí tự");
    }

    // First Name
    if (registrationDto.user().firstName() != null && registrationDto.user().firstName().length() > 50) {
        throw new IllegalArgumentException("Tên phải không được quá 50 ký tự");
    }

    // Phone Number
    if (registrationDto.user().phoneNumber() != null && registrationDto.user().phoneNumber().length() > 15) {
        throw new IllegalArgumentException("Số điện thoại không được quá 15 ký tự");
    }

    // Avatar
    if (registrationDto.user().avatar() != null && registrationDto.user().avatar().length() > 255) {
        throw new IllegalArgumentException("Đường dẫn avatar không được quá 255 ký tự");
    }

    // Dob
    if (registrationDto.user().dob() == null || registrationDto.user().dob().isEmpty()) {
        throw new IllegalArgumentException("Ngày sinh không được để trống");
    } else if (!isValidDob(registrationDto.user().dob())) {
        throw new IllegalArgumentException("Tuổi phải lớn hơn 13");
    }

    // Gender
    if (registrationDto.user().gender() == null) {
        throw new IllegalArgumentException("Có lỗi về giới tính");
    }

    // Email
    if (existingAccount.isPresent()) {
        throw new IllegalArgumentException("Email đã được sử dụng");
    } else if (registrationDto.email() == null) {
        throw new IllegalArgumentException("Email không được để trống");
    } else if (!isValidEmail(registrationDto.email())) {
        throw new IllegalArgumentException("Định dạng email không hợp lệ");
    }

    // Password
    if (registrationDto.password() == null || registrationDto.password().isEmpty()) {
        throw new IllegalArgumentException("Mật khẩu không được để trống");
    } else if (!isValidPassword(registrationDto.password())) {
        throw new IllegalArgumentException(
                "Mật khẩu phải có ít nhất từ 6 đến 18 kí tự, bao gồm ít nhất một chữ in hoa, một số, và một ký tự đặc biệt");
    }

    // RePassword
    if (registrationDto.confirmPassword() == null || registrationDto.confirmPassword().isEmpty()) {
        throw new IllegalArgumentException("Xác nhận mật khẩu không được để trống");
    } else if (!registrationDto.password().equals(registrationDto.confirmPassword())) {
        throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không khớp");
    }

        User user = new User();
        user.setPhoneNumber(registrationDto.user().phoneNumber()); // Gán giá trị phoneNumber
        user.setFirstName(registrationDto.user().firstName());     // Gán giá trị firstName
        user.setLastName(registrationDto.user().lastName());
        user.setGender(registrationDto.user().gender());
        user.setDob(LocalDate.parse(registrationDto.user().dob()));
        user.setAvatar(registrationDto.user().avatar());

        User savedUser = userRepository.save(user);

        Account account = new Account();
        account.setUser(savedUser);
        account.setEmail(registrationDto.email());
        account.setPassword(passwordEncoder.encode(registrationDto.password()));

        Account savedAccount = accountRepository.save(account);

        

        return accountMapper.toDto(savedAccount);
    }

    private boolean isValidEmail(String email) {
        return Pattern.compile(EMAIL_REGEX).matcher(email).matches();
    }

    private boolean isValidPassword(String password) {
        return Pattern.compile(PASSWORD_REGEX).matcher(password).matches();
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

    public List<AccountDto> getAllAccounts() {
    return accountRepository.findAll().stream()
            .map(accountMapper::toDto)
            .collect(Collectors.toList());
}

public AccountDto getAccountById(Long id) {
    Account account = accountRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại"));
    return accountMapper.toDto(account);
}

public AccountDto updateAccount(Long id, RegistrationDto registrationDto) {
    Account account = accountRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại"));

    // Kiểm tra và cập nhật các trường thông tin người dùng
    User user = account.getUser();

    // Cập nhật firstName, lastName, dob, gender, phoneNumber
    if (registrationDto.user().firstName() != null) {
        user.setFirstName(registrationDto.user().firstName());
    }
    if (registrationDto.user().lastName() != null) {
        user.setLastName(registrationDto.user().lastName());
    }
    if (registrationDto.user().dob() != null) {
        user.setDob(LocalDate.parse(registrationDto.user().dob()));
    }
    
    if (registrationDto.user().phoneNumber() != null) {
        user.setPhoneNumber(registrationDto.user().phoneNumber());
    }

    // Cập nhật avatar nếu có
    if (registrationDto.user().avatar() != null) {
        user.setAvatar(registrationDto.user().avatar());
    }

    // Cập nhật mật khẩu (nếu có thay đổi)
    if (registrationDto.password() != null) {
        if (!registrationDto.password().equals(registrationDto.confirmPassword())) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không khớp");
        }
        account.setPassword(passwordEncoder.encode(registrationDto.password()));
    }

    // Lưu lại người dùng và tài khoản
    userRepository.save(user);
    accountRepository.save(account);

    // Trả về AccountDto
    return accountMapper.toDto(account);
}


public void deleteAccount(Long id) {
    Account account = accountRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại"));
    accountRepository.delete(account);
}
}
