package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Data
@Entity
@Table(name = "pricefield")
public class PricingField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pricingId;

    @ManyToOne(fetch = FetchType.LAZY) // Sử dụng LAZY để cải thiện hiệu suất
    @JoinColumn(name = "field_id", nullable = false)
    private FootballField footballField; // Tên biến đổi thành footballField cho đồng nhất

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private Double rate;

    // Constructor không tham số
    public PricingField() {}

    // Constructor có tham số (nếu cần thiết)
    public PricingField(LocalTime startTime, LocalTime endTime, Double rate) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.rate = rate;
    }
}