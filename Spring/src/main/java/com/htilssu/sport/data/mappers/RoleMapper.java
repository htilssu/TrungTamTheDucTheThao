package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.RoleDetailDto;
import com.htilssu.sport.data.models.Role;
import com.htilssu.sport.data.models.RoleDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public interface RoleMapper {

    Role toEntity(RoleDto roleDto);
    RoleDto toDto(Role role);
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Role partialUpdate(
            RoleDto roleDto,
            @MappingTarget Role role);
    Role toEntity(RoleDetailDto roleDetailDto);
    @AfterMapping
    default void linkUsers(@MappingTarget Role role) {
        role.getUsers()
                .forEach(user -> user.setRole(role));
    }
    RoleDetailDto toDto1(Role role);
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Role partialUpdate(
            RoleDetailDto roleDetailDto,
            @MappingTarget Role role);
}