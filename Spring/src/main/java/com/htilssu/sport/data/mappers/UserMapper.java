package com.htilssu.sport.data.mappers;

import org.springframework.stereotype.Component;

import com.htilssu.sport.data.dtos.UserDto;
import com.htilssu.sport.data.models.User;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        return new UserDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getPhoneNumber(),
            user.getGender(),
            user.getDob().toString()
        );
    }
}