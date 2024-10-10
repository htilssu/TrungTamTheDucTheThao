package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.AccountDto;
import com.htilssu.sport.data.models.Account;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface AccountMapper {

    Account toEntity(AccountDto accountDto);
    AccountDto toDto(Account account);
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Account partialUpdate(
            AccountDto accountDto,
            @MappingTarget Account account);
}