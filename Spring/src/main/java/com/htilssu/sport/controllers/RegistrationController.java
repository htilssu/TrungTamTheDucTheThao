    package com.htilssu.sport.controllers;

    import com.htilssu.sport.services.RegistrationService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.ComponentScan;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import com.htilssu.sport.data.dtos.AccountDto;
    import com.htilssu.sport.data.dtos.RegistrationDto;
    import com.htilssu.sport.data.models.Account;
    import com.htilssu.sport.data.models.User;
    import com.htilssu.sport.repositories.AccountRepository;
    import com.htilssu.sport.repositories.UserRepository;
    import com.htilssu.sport.response.ApiResponse;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import com.htilssu.sport.data.mappers.AccountMapper;
    import java.time.LocalDate;
    import java.util.List;
    import java.util.Optional;

    @ComponentScan
    @RestController
    @RequestMapping("/api")
    public class RegistrationController {

        private final RegistrationService registrationService;
        private final AccountRepository accountRepository;
        private final UserRepository userRepository;
        private final BCryptPasswordEncoder passwordEncoder; // Add password encoder here
        private final AccountMapper accountMapper; // Add account mapper here

        // Constructor injection for all dependencies
        @Autowired
        public RegistrationController(
            RegistrationService registrationService,
            AccountRepository accountRepository,
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            AccountMapper accountMapper
        ) {
            this.registrationService = registrationService;
            this.accountRepository = accountRepository;
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
            this.accountMapper = accountMapper;
        }

        // POST: Register a new user
        @PostMapping("/register")
        public ResponseEntity<ApiResponse> register(@RequestBody RegistrationDto registrationDto) {
            try {
                AccountDto accountDto = registrationService.registerUser(registrationDto);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new ApiResponse("Đăng ký thành công!", "Tài khoản của bạn đã được tạo với email: " + accountDto.email()));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), null));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse("Đã xảy ra lỗi: " + e.getMessage(), null));
            }
        }

    //    GET: Retrieve all user accounts
    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDto>> getAllAccounts() {
        List<AccountDto> accounts = registrationService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountDto> getAccountById(@PathVariable("id") Long id) {
        System.out.println("Fetching account with id: " + id);
        AccountDto accountDto = registrationService.getAccountById(id);
        return ResponseEntity.ok(accountDto);
    }

        // PUT: Update user account details
        @PutMapping("/accounts/{id}")
        public AccountDto updateAccount(@PathVariable("id") Long id, @RequestBody RegistrationDto registrationDto) {
            Account account = accountRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại"));

            // Kiểm tra xem email mới có bị trùng lặp không
            Optional<Account> existingAccount = accountRepository.findByEmail(registrationDto.email());
            if (existingAccount.isPresent() && !existingAccount.get().getId().equals(id)) {
                throw new IllegalArgumentException("Email đã được sử dụng");
            }

            // Cập nhật thông tin người dùng
            User user = account.getUser();
            user.setFirstName(registrationDto.user().firstName());
            user.setLastName(registrationDto.user().lastName());
            user.setDob(LocalDate.parse(registrationDto.user().dob()));
            user.setGender(registrationDto.user().gender());

            // Cập nhật mật khẩu nếu có thay đổi
            if (registrationDto.password() != null && !registrationDto.password().isEmpty()) {
                account.setPassword(passwordEncoder.encode(registrationDto.password()));
            }

            // Lưu lại user và account sau khi cập nhật
            userRepository.save(user);
            Account updatedAccount = accountRepository.save(account);

            // Trả về AccountDto sau khi cập nhật
            return accountMapper.toDto(updatedAccount);
        }

        // DELETE: Delete a user account by ID
        @DeleteMapping("/accounts/{id}")
        public ResponseEntity<ApiResponse> deleteAccount(@PathVariable("id") Long id) {
            try {
                registrationService.deleteAccount(id);
                return ResponseEntity.ok(new ApiResponse("Xóa thành công!", "Tài khoản đã được xóa."));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ApiResponse("Đã xảy ra lỗi: " + e.getMessage(), null));
            }
        }

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ApiResponse> handleIllegalArgument(IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse(ex.getMessage(), null));
        }
    }
