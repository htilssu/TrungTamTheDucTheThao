package com.htilssu.sport.response;

public class ApiResponse {
    private String message;
    private String detail;

    public ApiResponse(String message, String detail) {
        this.message = message;
        this.detail = detail;
    }

    public String getMessage() {
        return message;
    }

    public String getDetail() {
        return detail;
    }
}
