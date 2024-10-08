package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "bookingfield")
public class BookingField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "field_id", nullable = false)
    private FootballField footballField;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Column(nullable = false)
    private Timestamp startTime;

    @Column(nullable = false)
    private Timestamp endTime;

    @Column(nullable = false)
    private String bookingStatus;

    @Column(nullable = false)
    private Double depositAmount;

    @Column(nullable = false)
    private Double totalAmount;

    private String paymentMethod;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
}
