package com.htilssu.sport.service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.dtos.RegistrationDto;
import com.htilssu.sport.data.mappers.AccountMapper;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repositories.AccountRepository;
import com.htilssu.sport.repositories.UserRepository;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper; 

    @Autowired
    public RegistrationService(UserRepository userRepository, AccountRepository accountRepository, PasswordEncoder passwordEncoder, AccountMapper accountMapper) { // Thêm AccountMapper vào constructor
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountMapper = accountMapper; 
    }

    public AccountDto registerUser(RegistrationDto registrationDto) {
        Optional<Account> existingAccount = accountRepository.findByEmail(registrationDto.email());
        if (existingAccount.isPresent()) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }

        if (registrationDto.password() == null || registrationDto.password().isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }

        if (!registrationDto.password().equals(registrationDto.confirmPassword())) {
            throw new IllegalArgumentException("Mật khẩu và xác nhận mật khẩu không khớp");
        }

        User user = new User();
        user.setId(generateUserId());
        user.setPhoneNumber(registrationDto.user().phoneNumber());
        user.setFirstName(registrationDto.user().firstName());
        user.setLastName(registrationDto.user().lastName());
        user.setGender(registrationDto.user().gender());
        user.setDob(LocalDate.parse(registrationDto.user().dob()));

        User savedUser = userRepository.save(user);

        Account account = new Account();
        account.setUser(savedUser);
        account.setEmail(registrationDto.email());
        account.setPassword(passwordEncoder.encode(registrationDto.password()));

        Account savedAccount = accountRepository.save(account);

        return accountMapper.toDto(savedAccount); 
    }

    private Long generateUserId() {
        return UUID.randomUUID().getMostSignificantBits();
    }
}