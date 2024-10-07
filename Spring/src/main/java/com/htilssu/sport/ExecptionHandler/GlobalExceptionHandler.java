package com.htilssu.sport.ExecptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        // Log chi tiết lỗi
        System.out.println(e.getMessage());
        return new ResponseEntity<>("Đã xảy ra lỗi hệ thống", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
