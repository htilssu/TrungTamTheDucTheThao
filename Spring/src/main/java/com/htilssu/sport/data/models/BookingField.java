package com.htilssu.sport.data.models;

import com.htilssu.sport.enums.BookingStatus;
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

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "customer_phone", nullable = false, length = 10)
    private String customerPhone;

    @Column(nullable = false)
    private Timestamp startTime;

    @Column(nullable = false)
    private Timestamp endTime;

    @Column(nullable = false)
    private BookingStatus bookingStatus;

    @Column(nullable = false)
    private Double depositAmount;

    @Column(nullable = false)
    private Double totalAmount;

    private String paymentMethod;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    public BookingField() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
