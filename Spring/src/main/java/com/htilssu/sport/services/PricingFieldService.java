package com.htilssu.sport.services;

import com.htilssu.sport.data.models.PricingField;
import com.htilssu.sport.repositories.PricingFieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PricingFieldService {

    @Autowired
    private PricingFieldRepository repository;

    public List<PricingField> getAllPricing() {
        return repository.findAll();
    }

    public PricingField createPricing(PricingField pricing) {
        return repository.save(pricing);
    }
}