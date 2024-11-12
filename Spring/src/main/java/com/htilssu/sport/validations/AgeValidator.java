package com.htilssu.sport.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.Period;

public class AgeValidator implements ConstraintValidator<MinAge, LocalDate> {
    private int minAge = 16;

    @Override
    public void initialize(MinAge constraintAnnotation) {
        this.minAge = constraintAnnotation.value(); // Lấy giá trị độ tuổi tối thiểu
    }

    @Override
    public boolean isValid(LocalDate dob, ConstraintValidatorContext context) {
        if (dob == null) {
            return false; // Ngày sinh không được null
        }
        return Period.between(dob, LocalDate.now()).getYears() >= minAge; // Kiểm tra nếu tuổi >= minAge
    }
}
