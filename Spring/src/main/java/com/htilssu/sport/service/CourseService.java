package com.htilssu.sport.service;

import com.htilssu.sport.data.models.Coach;
import com.htilssu.sport.data.models.Course;
import com.htilssu.sport.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CoachRepository coachRepository;
    private final RoomRepository roomRepository;

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
        // Lấy Coach từ ID trong Course
        Long coachId = course.getCoach().getId();
        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Coach với ID: " + coachId));
        course.setCoach(coach);

        // Lấy Room từ ID trong Course
        Long roomId = course.getRoom().getId();
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Room với ID: " + roomId));
        course.setRoom(room);

        // Lưu khóa học vào cơ sở dữ liệu
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
