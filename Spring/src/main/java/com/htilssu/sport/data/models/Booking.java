package com.htilssu.sport.data.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "booking_from", nullable = false)
    private Instant bookingFrom;

    @Column(name = "booking_to", nullable = false)
    private Instant bookingTo;

}