package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "room")
public class Room {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "building")
    private String building;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_room_type", nullable = false)
    private RoomType idRoomType;

}