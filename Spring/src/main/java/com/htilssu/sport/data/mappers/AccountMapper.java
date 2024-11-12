package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.models.Account;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface AccountMapper {
    // Ánh xạ từ Account sang AccountDto, bao gồm cả User
    @Mapping(target = "user.dob", source = "user.dob", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "user.firstName", source = "user.firstName")
    @Mapping(target = "user.lastName", source = "user.lastName")
    @Mapping(target = "user.phoneNumber", source = "user.phoneNumber")
    @Mapping(target = "user.gender", source = "user.gender")
    @Mapping(target = "user.avatar", source = "user.avatar")  // Ánh xạ avatar nếu có
    AccountDto toDto(Account account);

    // Ánh xạ từ AccountDto sang Account, bao gồm cả User
    @Mapping(target = "user.dob", source = "user.dob", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "user.firstName", source = "user.firstName")
    @Mapping(target = "user.lastName", source = "user.lastName")
    @Mapping(target = "user.phoneNumber", source = "user.phoneNumber")
    @Mapping(target = "user.gender", source = "user.gender")
    @Mapping(target = "user.avatar", source = "user.avatar")  // Ánh xạ avatar nếu có
    Account toEntity(AccountDto accountDto);

    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Account partialUpdate(
            AccountDto accountDto,
            @MappingTarget Account account);
}
