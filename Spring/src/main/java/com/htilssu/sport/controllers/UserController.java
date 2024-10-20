
package com.htilssu.sport.controllers;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.repository.UserRepository;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
     
    }

    // Hiển thị thông tin người dùng
    @CrossOrigin(origins = "http://localhost:5173") 
    @GetMapping("/{id}")
    public ResponseEntity<User> displayUserInfo(@PathVariable("id") Long id) {
    if (id == null || id <= 0) {
        return ResponseEntity.badRequest().build(); // Xử lý nếu ID không hợp lệ
    }
    return userRepository.findById(id)
            .map(user -> ResponseEntity.ok(user))
            .orElse(ResponseEntity.notFound().build());
}
    // Sửa thông tin người dùng
    @PutMapping("/{id}")
public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @Valid @RequestBody User updatedUser, BindingResult result) {
    if (result.hasErrors()) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);      // Trả về các lỗi xác thực cho frontend
    }
    return userRepository.findById(id)
            .map(user -> {
                user.setFirstName(updatedUser.getFirstName() != null ? updatedUser.getFirstName() : user.getFirstName());
                user.setLastName(updatedUser.getLastName() != null ? updatedUser.getLastName() : user.getLastName());
                user.setPhoneNumber(updatedUser.getPhoneNumber() != null ? updatedUser.getPhoneNumber() : user.getPhoneNumber());
                user.setDob(updatedUser.getDob() != null ? updatedUser.getDob() : user.getDob());
                user.setGender(updatedUser.getGender() != null ? updatedUser.getGender() : user.getGender());
                user.setAvatar(updatedUser.getAvatar() != null ? updatedUser.getAvatar() : user.getAvatar());
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
        result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        System.out.println("Validation errors: " + result.getFieldErrors());
        return ResponseEntity.badRequest().body(errors); 
    }
       // Kiểm tra tuổi trước khi lưu
    User savedUser = userRepository.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
}
    
}
