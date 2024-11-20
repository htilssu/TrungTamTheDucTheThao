package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.CourseDto;
import com.htilssu.sport.data.models.Course;
import org.mapstruct.*;

// @Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
// public interface CourseMapper {

//     @Mapping(source = "Room.id", target = "idRoom") // Sửa lại để ánh xạ ID đúng
//     @Mapping(source = "Coach.id", target = "idCoach") // Sửa lại để ánh xạ ID đúng
//     Course toEntity(CourseDto courseDto);

//     @InheritInverseConfiguration(name = "toEntity")
//     CourseDto toDto(Course course);

//     @InheritConfiguration(name = "toEntity")
//     @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//     Course partialUpdate(CourseDto courseDto, @MappingTarget Course course);
// }
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface CourseMapper {

    @Mapping(source = "idRoom", target = "room.id") // Mapping idRoom từ DTO vào room.id
    @Mapping(source = "idCoach", target = "coach.id") // Mapping idCoach từ DTO vào coach.id
    Course toEntity(CourseDto courseDto);

    @InheritInverseConfiguration(name = "toEntity")
    CourseDto toDto(Course course);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Course partialUpdate(CourseDto courseDto, @MappingTarget Course course);
}
