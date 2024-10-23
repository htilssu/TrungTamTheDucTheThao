package com.htilssu.sport.services;

import com.htilssu.sport.data.models.Course;
import com.htilssu.sport.repositories.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CourseService {

    private final CourseRepository courseRepository;

    // Lấy tất cả khóa học
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Lấy khóa học theo ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Tạo khóa học
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Cập nhật khóa học theo ID
    public Course updateCourse(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khóa học với ID " + id));

        // Cập nhật các trường
        course.setName(courseDetails.getName());
        course.setDescription(courseDetails.getDescription());
        course.setPrice(courseDetails.getPrice());
        course.setTime(courseDetails.getTime());
        course.setStartDate(courseDetails.getStartDate());
        course.setEndDate(courseDetails.getEndDate());
        course.setSlot(courseDetails.getSlot());
        course.setIdCoach(courseDetails.getIdCoach());
        course.setIdRoom(courseDetails.getIdRoom());
        course.setThumbnail(courseDetails.getThumbnail());

        return courseRepository.save(course);
    }

    // Xóa khóa học theo ID
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khóa học với ID " + id));
        courseRepository.delete(course);
    }
}
