package com.htilssu.sport.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = AgeValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MinAge {
    String message() default "Tuổi phải trên hoặc bằng 16";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    int value(); // Độ tuổi tối thiểu
}
