package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.CourseDto;
import com.htilssu.sport.data.models.Course;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface CourseMapper {

    @Mapping(source = "room", target = "idRoom")
    @Mapping(source = "coach", target = "idCoach")
    Course toEntity(CourseDto courseDto);

    @InheritInverseConfiguration(name = "toEntity")
    CourseDto toDto(Course course);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Course partialUpdate(CourseDto courseDto, @MappingTarget Course course);
}
