package com.htilssu.sport.data.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "room_type")
public class RoomType {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

}