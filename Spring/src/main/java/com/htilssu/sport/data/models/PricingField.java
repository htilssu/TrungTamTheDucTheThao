package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Data
@Entity
@Table(name = "price_field")
public class PricingField {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "price_field_id_seq")
    @SequenceGenerator(name = "price_field_id_seq", sequenceName = "price_field_id_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_id", nullable = false)
    private FootballField footballField;

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