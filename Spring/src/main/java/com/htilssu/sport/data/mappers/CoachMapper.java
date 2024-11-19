package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.CoachDto;
import com.htilssu.sport.data.models.Coach;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface CoachMapper {

        // Chuyển đổi CoachDto thành Coach
        Coach toEntity(CoachDto coachDto);

        // Chuyển đổi Coach thành CoachDto
        CoachDto toDto(Coach coach);

        @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
        // Cập nhật một Coach với thông tin từ CoachDto
        Coach partialUpdate(CoachDto coachDto, @MappingTarget Coach coach);
}
