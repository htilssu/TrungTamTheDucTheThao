package com.htilssu.sport.controller;

import com.htilssu.sport.data.models.PricingField;
import com.htilssu.sport.service.PricingFieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/pricing")
public class PricingFieldController {

    @Autowired
    private PricingFieldService service;

    @GetMapping
    public ResponseEntity<List<PricingField>> getAllPricing() {
        List<PricingField> pricingList = service.getAllPricing();
        return ResponseEntity.ok(pricingList); // Trả về danh sách giá thuê
    }

    @PostMapping
    public ResponseEntity<PricingField> createPricing(@RequestBody PricingField pricing) {
        PricingField createdPricing = service.createPricing(pricing);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPricing); // Trả về giá thuê mới tạo với mã trạng thái 201
    }
}