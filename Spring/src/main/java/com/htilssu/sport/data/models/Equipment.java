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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_equipment_type", nullable = false)
    private EquipmentType idEquipmentType;

    @Column(name = "status", nullable = false)
    private Double status;

}