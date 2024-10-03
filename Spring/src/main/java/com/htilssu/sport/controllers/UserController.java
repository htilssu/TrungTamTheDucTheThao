package com.htilssu.sport.controllers;
import com.htilssu.sport.controllers.UserRepository;
import com.htilssu.sport.data.models.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) {
                this.userRepository = userRepository;
          }
    // Hiển thị thông tin người dùng
    @CrossOrigin(origins = "http://localhost:5173") // Nếu frontend chạy trên port 3000
    @GetMapping("/{id}")
    public ResponseEntity<User> displayUserInfo(@PathVariable("id") Long id) {
               return userRepository.findById(id)
                       .map(user -> ResponseEntity.ok(user))
                       .orElse(ResponseEntity.notFound().build());
             }
    
    // Sửa thông tin người dùng
  @PutMapping("/{id}")
public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @Valid @RequestBody User updatedUser)  {
    return userRepository.findById(id)
        .map(user -> {
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setDob(updatedUser.getDob());
            user.setGender(updatedUser.getGender());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        })
        .orElse(ResponseEntity.notFound().build());
}

       // Tạo người dùng mới
       @PostMapping
       public ResponseEntity<User> createUser(@RequestBody User user) {
          User savedUser = userRepository.save(user); // Lưu người dùng vào cơ sở dữ liệu
          return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
}
