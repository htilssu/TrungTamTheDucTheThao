
package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.UserDto;
import com.htilssu.sport.data.mappers.UserMapper;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repositories.UserRepository;
import com.htilssu.sport.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepository, UserService userService,
            UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.userMapper = userMapper;
    }

    // Hiển thị thông tin người dùng
    @GetMapping("/{id}")
    public ResponseEntity<User> displayUserInfo(@PathVariable("id") Long id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().build(); // Xử lý nếu ID không hợp lệ
        }
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Sửa thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id,
            @Valid @RequestBody User updatedUser,
            BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(
                    error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(
                    errors);      // Trả về các lỗi xác thực cho frontend
        }
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(
                            updatedUser.getFirstName() != null ? updatedUser.getFirstName()
                                                               : user.getFirstName());
                    user.setLastName(updatedUser.getLastName() != null ? updatedUser.getLastName()
                                                                       : user.getLastName());
                    user.setPhoneNumber(
                            updatedUser.getPhoneNumber() != null ? updatedUser.getPhoneNumber()
                                                                 : user.getPhoneNumber());
                    user.setDob(
                            updatedUser.getDob() != null ? updatedUser.getDob() : user.getDob());
                    user.setGender(updatedUser.getGender() != null ? updatedUser.getGender()
                                                                   : user.getGender());
                    user.setAvatar(updatedUser.getAvatar() != null ? updatedUser.getAvatar()
                                                                   : user.getAvatar());
                    userRepository.save(user);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Tạo người dùng mới
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(
                    error -> errors.put(error.getField(), error.getDefaultMessage()));
            System.out.println("Validation errors: " + result.getFieldErrors());
            return ResponseEntity.badRequest().body(errors);
        }
        // Kiểm tra tuổi trước khi lưu
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("/me")
    public UserDto getMe(Authentication authentication) {
        return userService.getUser(authentication);
    }
}
