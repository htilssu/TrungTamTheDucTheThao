package com.htilssu.sport.data.models;

import com.htilssu.sport.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "booking_field")
public class BookingField {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_field_seq")
    @SequenceGenerator(name = "booking_field_seq", sequenceName = "booking_field_sequence", allocationSize = 1)
    private Long id;

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
    @CreationTimestamp
    private Timestamp createdAt;
}
