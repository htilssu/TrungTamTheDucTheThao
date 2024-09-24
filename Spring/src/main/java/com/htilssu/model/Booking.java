package com.htilssu.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "field_type")
    private String fieldType;

    @Column(name = "field_id")
    private String fieldId;

    @Column(name = "field_name")
    private String fieldName;

    @Column(name = "booking_date")
    private LocalDate bookingDate;

    @Column(name = "booking_time")
    private String bookingTime;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @Column(name = "deposit_amount")
    private Integer depositAmount;

    @Column(name = "created_at", updatable = false)
    private LocalDate createdAt = LocalDate.now();

    // Getters and Setters
    // ...
}