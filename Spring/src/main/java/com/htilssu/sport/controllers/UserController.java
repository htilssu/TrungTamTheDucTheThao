package com.htilssu.sport.controllers;

import com.htilssu.sport.data.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Hiển thị thông tin người dùng
    @CrossOrigin(origins = "http://localhost:5173") // Nếu frontend chạy trên port 3000
    @GetMapping("/{id}")
    public User displayUserInfo(@PathVariable("id") Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    // Sửa thông tin người dùng
  @PutMapping("/{id}")
public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
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
       public User createUser(@RequestBody User user) {
           return userRepository.save(user); // Lưu người dùng vào cơ sở dữ liệu
       }
}
