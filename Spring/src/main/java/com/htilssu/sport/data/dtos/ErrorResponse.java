package com.htilssu.sport.data.dtos;

public class ErrorResponse {
    private String message;

    // Constructor
    public ErrorResponse(String message) {
        this.message = message;
    }

    // Getter và Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
