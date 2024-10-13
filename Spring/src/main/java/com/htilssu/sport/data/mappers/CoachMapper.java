package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.CoachDto;
import com.htilssu.sport.data.models.Coach;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface CoachMapper {

    Coach toEntity(CoachDto coachDto);
    CoachDto toDto(Coach coach);
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Coach partialUpdate(
            CoachDto coachDto,
            @MappingTarget Coach coach);
}