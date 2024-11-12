package com.htilssu.sport.services;

import com.htilssu.sport.data.dtos.UserDto;
import com.htilssu.sport.data.mappers.UserMapper;
import com.htilssu.sport.repositories.UserRepository;
import lombok.AllArgsConstructor;
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
}
