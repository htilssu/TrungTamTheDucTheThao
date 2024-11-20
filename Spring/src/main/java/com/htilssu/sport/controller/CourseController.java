package com.htilssu.sport.controller;

import com.htilssu.sport.data.dtos.CourseDto;
import com.htilssu.sport.data.models.Course;
import com.htilssu.sport.service.CourseService;

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
        // Ánh xạ từ DTO sang Entity
        Course course = courseMapper.toEntity(courseDto);

        // Lưu khóa học vào cơ sở dữ liệu
        Course savedCourse = courseService.createCourse(course);

        // Trả về DTO của khóa học vừa lưu
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
