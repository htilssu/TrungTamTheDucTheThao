package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.CourseDto;
import com.htilssu.sport.data.models.Course;
import com.htilssu.sport.data.mappers.CourseMapper;
import com.htilssu.sport.services.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/course")
public class CourseController {

    private final CourseService courseService;
    private final CourseMapper courseMapper;

    @GetMapping
    public List<CourseDto> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return courses.stream().map(courseMapper::toDto).toList();
    }

    @GetMapping("/{courseid}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable("courseid") Long id) {
        Course course = courseService.getCourseById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khóa học với ID " + id));
        return ResponseEntity.ok(courseMapper.toDto(course));
    }

    @PostMapping("/add")
    public CourseDto createCourse(@RequestBody CourseDto courseDto) {
        Course course = courseMapper.toEntity(courseDto);
        Course savedCourse = courseService.createCourse(course);
        return courseMapper.toDto(savedCourse);
    }

    @PutMapping("/{courseid}")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable("courseid") Long id, @RequestBody CourseDto courseDto) {
        Course updatedCourse = courseService.updateCourse(id, courseMapper.toEntity(courseDto));
        return ResponseEntity.ok(courseMapper.toDto(updatedCourse));
    }

    @DeleteMapping("/{courseid}")
    public ResponseEntity<Void> deleteCourse(@PathVariable("courseid") Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
