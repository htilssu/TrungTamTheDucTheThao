package com.htilssu.sport.services;

import com.htilssu.sport.data.models.Coach;
import com.htilssu.sport.repositories.CoachRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CoachService {
    private final CoachRepository coachRepository;

    // Lấy tất cả bản ghi Coach
    public List<Coach> findAll() {
        return coachRepository.findAll(); // Lấy tất cả huấn luyện viên từ cơ sở dữ liệu
    }

    // Tìm Coach theo ID
    public Optional<Coach> findById(Long id) {
        Optional<Coach> coach = coachRepository.findById(id);
        if (coach.isPresent()) {
            // Nếu tìm thấy coach, trả về đầy đủ thông tin coach
            return coach;
        } else {
            // Nếu không tìm thấy coach, trả về Optional.empty()
            return Optional.empty();
        }
    }

    // Thêm mới hoặc cập nhật Coach
    public Coach save(Coach coach) {
        // Nếu coach không có id (mới), sẽ lưu vào cơ sở dữ liệu
        return coachRepository.save(coach);
    }

    // Cập nhật Coach theo ID
    public Coach updateCoach(Long id, Coach coachDetails) {
        // Tìm coach hiện tại trong cơ sở dữ liệu
        Coach existingCoach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy huấn luyện viên với ID " + id));

        // Cập nhật các trường của coach nếu có thay đổi
        existingCoach.setName(coachDetails.getName());
        existingCoach.setDescription(coachDetails.getDescription());
        existingCoach.setExperience(coachDetails.getExperience());
        existingCoach.setPhoneNumber(coachDetails.getPhoneNumber());

        // Lưu coach đã cập nhật lại vào cơ sở dữ liệu
        return coachRepository.save(existingCoach);
    }

    // Xóa Coach theo ID
    public void deleteById(Long id) {
        // Kiểm tra xem coach có tồn tại không trước khi xóa
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy huấn luyện viên với ID " + id));

        // Xóa coach
        coachRepository.delete(coach);
    }
}
