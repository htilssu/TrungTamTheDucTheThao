package com.htilssu.sport.service;

import com.htilssu.sport.data.dtos.UserDto;
import com.htilssu.sport.data.mappers.UserMapper;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.exception.NotFoundException;
import com.htilssu.sport.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toDto)
                .orElse(null);
    }

    public UserDto getUser(Authentication authentication) {
        var userId = ((Long) authentication.getPrincipal());
        return getUserById(userId);
    }

    public User getUserByIdOrThrow(@NotNull(message = "userId is required") Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }
}
