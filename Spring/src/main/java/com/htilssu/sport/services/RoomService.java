package com.htilssu.sport.services;

import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.repositories.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository; // Sử dụng final cho các dependency

    // Lấy tất cả các phòng
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Lấy phòng theo ID
    public Room getRoomById(Long id) {
        // Thay vì trả về null, bạn có thể ném ra một ngoại lệ để xử lý tốt hơn
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }

    // Thêm phòng mới
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    // Cập nhật phòng theo ID
    public Room updateRoom(Long id, Room room) {
        if (roomRepository.existsById(id)) {
            room.setId(id); // Đặt ID của phòng là ID cần cập nhật
            return roomRepository.save(room); // Lưu phòng đã cập nhật
        }
        return null; // Nếu không tìm thấy phòng, trả về null
    }

    // Xóa phòng theo ID
    public boolean deleteRoom(Long id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            return true;
        }
        return false; // Bạn có thể ném ra ngoại lệ ở đây nếu muốn
    }
}
