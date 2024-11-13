package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_id_seq")
    @SequenceGenerator(name = "equipment_id_seq", sequenceName = "equipment_id_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_equipment_type", nullable = false)
    private EquipmentType equipmentType;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "image")
    private String image;
}