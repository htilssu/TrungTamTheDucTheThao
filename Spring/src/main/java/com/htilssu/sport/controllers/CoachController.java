package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.CoachDto;
import com.htilssu.sport.data.mappers.CoachMapper;
import com.htilssu.sport.data.models.Coach;
import com.htilssu.sport.services.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coach")
public class CoachController {

    private final CoachService coachService;
    private final CoachMapper coachMapper;

    // Constructor injection để đảm bảo các service và mapper luôn có sẵn
    @Autowired
    public CoachController(CoachService coachService, CoachMapper coachMapper) {
        this.coachService = coachService;
        this.coachMapper = coachMapper;
    }

    // Lấy tất cả các coach
    @GetMapping
    public List<CoachDto> getAllCoaches() {
        List<Coach> coaches = coachService.findAll();
        return coaches.stream().map(coachMapper::toDto).toList(); // Sử dụng coachMapper để chuyển đổi từ Coach sang
                                                                  // CoachDto
    }

    // Lấy thông tin coach theo ID và trả về toàn bộ dữ liệu của coach
    @GetMapping("/{id}")
    public ResponseEntity<CoachDto> getCoachById(@PathVariable Long id) {
        return coachService.findById(id)
                .map(coachMapper::toDto) // Chuyển đổi Coach sang CoachDto
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Nếu không tìm thấy coach, trả về 404
    }

    // Thêm mới một coach
    @PostMapping("/add")
    public ResponseEntity<CoachDto> addCoach(@RequestBody CoachDto coachDto) {
        Coach coach = coachMapper.toEntity(coachDto); // Chuyển đổi từ CoachDto sang Coach entity
        Coach savedCoach = coachService.save(coach); // Lưu vào cơ sở dữ liệu
        return new ResponseEntity<>(coachMapper.toDto(savedCoach), HttpStatus.CREATED); // Trả về CoachDto đã lưu
    }

    // Cập nhật thông tin coach theo ID
    @PutMapping("/edit/{id}")
    public ResponseEntity<CoachDto> updateCoach(@PathVariable Long id, @RequestBody CoachDto coachDto) {
        if (!coachService.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Nếu không tìm thấy coach với ID, trả về lỗi 404
        }
        Coach coach = coachMapper.toEntity(coachDto); // Chuyển đổi từ CoachDto sang Coach entity
        coach.setId(id); // Đặt ID cho coach
        Coach updatedCoach = coachService.save(coach); // Lưu vào cơ sở dữ liệu
        return ResponseEntity.ok(coachMapper.toDto(updatedCoach)); // Trả về thông tin đã cập nhật
    }

    // Xóa một coach theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        if (!coachService.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Nếu không tìm thấy coach, trả về lỗi 404
        }
        coachService.deleteById(id); // Xóa coach theo ID
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Trả về mã 204 khi xóa thành công
    }
}
