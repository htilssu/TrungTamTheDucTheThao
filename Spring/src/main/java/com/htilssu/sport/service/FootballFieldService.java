package com.htilssu.sport.service;

import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.PricingField;
import com.htilssu.sport.repository.FootballFieldRepository;
import com.htilssu.sport.repository.PricingFieldRepository; // Thêm import cho PricingFieldRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FootballFieldService {

    @Autowired
    private FootballFieldRepository repository;

    @Autowired
    private PricingFieldRepository pricingFieldRepository;

    public List<FootballField> getAllFields() {
        return repository.findAll();
    }

    public FootballField getFieldById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Không tìm thấy sân bóng với id: " + id));
    }

    // Tạo sân bóng mới
    public FootballField createField(FootballField field, List<PricingField> prices) {
        FootballField createdField = repository.save(field); // Lưu sân bóng trước

        // Lưu giá thuê cho sân bóng
        for (PricingField price : prices) {
            price.setFootballField(createdField); // Gán đối tượng FootballField vào giá thuê
            pricingFieldRepository.save(price); // Lưu giá thuê
        }

        return createdField;
    }

    //lay ds loai san
    public List<FootballField> getFieldsByType(String fieldType) {
        List<FootballField> fields = repository.findByFieldType(fieldType);
        return fields;
    }

    public void deleteField(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sân bóng với id: " + id);
        }
        repository.deleteById(id);
    }

    // Phương thức cập nhật sân bóng (nếu có)
    public FootballField updateField(Long id, FootballField field) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sân bóng với id: " + id);
        }
        field.setId(id); // Cập nhật ID
        return repository.save(field); // Cập nhật sân bóng
    }
}