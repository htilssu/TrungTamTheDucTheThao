package com.htilssu.sport.service;

import java.util.List;
import java.util.Optional;

import com.htilssu.sport.data.models.Room;
import com.htilssu.sport.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.models.Equipment;
import com.htilssu.sport.data.models.EquipmentType;
import com.htilssu.sport.repository.EquipmentRepository;
import com.htilssu.sport.repository.EquipmentTypeRepository;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private EquipmentTypeRepository equipmentTypeRepository;
    @Autowired
    private RoomRepository roomRepository;
    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    public Optional<Equipment> findById(Long id) {
        return equipmentRepository.findById(id);
    }

    public Equipment save(Equipment equipment) {
        EquipmentType equipmentType = equipmentTypeRepository.findById(equipment.getEquipmentType().getId())
                .orElseThrow(() -> new IllegalArgumentException("Loại thiết bị không tồn tại"));

        // Kiểm tra Room tồn tại
        Room room = roomRepository.findById(equipment.getRoom().getId())
                .orElseThrow(() -> new IllegalArgumentException("Phòng không tồn tại"));
        equipment.setRoom(room); // Gán Room vào Equipment

        return equipmentRepository.save(equipment);
    }


    public Optional<Equipment> update(Long id, Equipment equipment) {
        if (equipmentRepository.existsById(id)) {
            // Kiểm tra EquipmentType
            EquipmentType equipmentType = equipmentTypeRepository.findById(equipment.getEquipmentType().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Loại thiết bị không tồn tại"));

            // Kiểm tra Room
            Room room = roomRepository.findById(equipment.getRoom().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Phòng không tồn tại"));

            equipment.setEquipmentType(equipmentType); // Gán EquipmentType
            equipment.setRoom(room); // Gán Room

            equipment.setId(id); // Set lại ID cho bản cập nhật
            return Optional.of(equipmentRepository.save(equipment));
        } else {
            return Optional.empty();
        }
    }


    public boolean delete(Long id) {
        if (equipmentRepository.existsById(id)) {
            equipmentRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
