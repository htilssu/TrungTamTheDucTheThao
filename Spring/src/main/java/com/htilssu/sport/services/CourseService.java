package com.htilssu.sport.services;

import com.htilssu.sport.data.models.Course;
import com.htilssu.sport.repositories.*;

import lombok.*;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CourseService {

    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));

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

    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
        courseRepository.delete(course);
    }
}
