package com.htilssu.sport.controllers;

import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.request.CreateFieldRequest;
import com.htilssu.sport.services.FootballFieldService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/fields")
public class FootballFieldController {

    @Autowired
    private FootballFieldService service;

    // Trả về danh sách sân bóng
    @GetMapping
    public ResponseEntity<List<FootballField>> getAllFields() {
        List<FootballField> fields = service.getAllFields();
        return ResponseEntity.ok(fields);
    }

    //tra ve san bong cu the
    @GetMapping("/{id}")
    public ResponseEntity<FootballField> getFieldById(@PathVariable Long id) {
        FootballField field = service.getFieldById(id);
        return ResponseEntity.ok(field);
    }

    // Trả về sân bóng mới tạo
    @PostMapping
    public ResponseEntity<FootballField> createField(@Valid @RequestBody CreateFieldRequest request) {
        FootballField createdField = service.createField(request.getField(), request.getPrices());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdField);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FootballField> updateField(@PathVariable Long id, @RequestBody FootballField field) {
        FootballField updatedField = service.updateField(id, field);
        return ResponseEntity.ok(updatedField);
    }

    //xoa san
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteField(@PathVariable Long id) {
        service.deleteField(id);
        return ResponseEntity.noContent().build();
    }
}