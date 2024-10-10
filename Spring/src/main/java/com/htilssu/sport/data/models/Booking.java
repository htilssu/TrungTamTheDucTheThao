package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    private User idUser;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @NotNull
    @Column(name = "booking_from", nullable = false)
    private OffsetDateTime bookingFrom;

    @NotNull
    @Column(name = "booking_to", nullable = false)
    private OffsetDateTime bookingTo;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_room", nullable = false)
    private Room idRoom;

}