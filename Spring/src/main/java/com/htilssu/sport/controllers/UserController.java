
package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.UserDto;
import com.htilssu.sport.data.mappers.UserMapper;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repositories.UserRepository;
import com.htilssu.sport.services.UserService;
import com.htilssu.sport.validations.IsUser;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/user")
@AllArgsConstructor
@IsUser
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final UserMapper userMapper;

    // Hiển thị thông tin người dùng
    @GetMapping("/{id}")
    public UserDto displayUserInfo(@PathVariable("id") Long id) {
        return userMapper.toDto(userService.getUserByIdOrThrow(id));
    }

    @GetMapping("/me")
    public UserDto getAuthenticatorInfo(Authentication authentication) {
        return userMapper.toDto(
                userService.getUserByIdOrThrow(Long.parseLong(
                        (String) authentication.getPrincipal())));
    }

    @GetMapping()
    public ResponseEntity<User> displayUserInfo(Authentication authentication) {

        return userRepository.findById(Long.parseLong(authentication.getPrincipal()
                        .toString()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound()
                        .build());
    }

    // Sửa thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id,
            @Valid @RequestBody User updatedUser,
            BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors()
                    .forEach(
                            error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest()
                    .body(
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
                .orElse(ResponseEntity.notFound()
                        .build());
    }

    // Tạo người dùng mới
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors()
                    .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            System.out.println("Validation errors: " + result.getFieldErrors());
            return ResponseEntity.badRequest()
                    .body(errors);
        }
        // Kiểm tra tuổi trước khi lưu
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedUser);
    }

    //Lấy tất cả user trong hệ thống
    //@IsAdmin
    @GetMapping("/all")
    public ResponseEntity<Page<UserDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<UserDto> userPage = userRepository.findAll(pageable)
                .map(userMapper::toDto);
        Page<UserDto> userDtoPage = userPage.map(userMapper::toDto);
        return ResponseEntity.ok(userDtoPage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        if (id == null || id <= 0) {
            // Return a bad request with a custom message
            return ResponseEntity.badRequest()
                    .body("Invalid user ID provided.");
        }

        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok()
                            .body("User with ID " + id + " was successfully deleted.");
                })
                .orElse(ResponseEntity.badRequest()
                        .body("User with ID " + id + " not found."));
    }
}
