package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "football_field")
public class FootballField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fieldId;

    @NotBlank(message = "Tên sân không được để trống")
    @Size(max = 100, message = "Tên sân không được vượt quá 100 ký tự")
    @Column(nullable = false)
    private String fieldName;

    @NotBlank(message = "Địa điểm không được để trống")
    @Size(max = 255, message = "Địa điểm không được vượt quá 255 ký tự")
    @Column(nullable = false)
    private String location;

    @NotNull(message = "Loại sân không được để trống")
    @Pattern(regexp = "5v5|7v7|11v11", message = "Loại sân không hợp lệ. Vui lòng chọn '5v5', '7v7' hoặc '11v11'")
    @Column(nullable = false)
    private String fieldType;

    @NotNull(message = "Trạng thái không được để trống")
    @Column(nullable = false)
    private String status;

    @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
    private String description;

    @Size(max = 255, message = "URL hình ảnh không được vượt quá 255 ký tự")
    private String imageUrl;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    // Constructor mặc định
    public FootballField() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}