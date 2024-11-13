package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.UserDto;
import com.htilssu.sport.data.models.User;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserDto toDto(User user);
    User toEntity(UserDto userDto);
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(
            UserDto userNotRoleDto,
            @MappingTarget User user);
}