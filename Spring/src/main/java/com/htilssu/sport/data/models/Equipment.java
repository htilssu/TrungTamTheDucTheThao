package com.htilssu.sport.data.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_seq")
    @SequenceGenerator(name = "equipment_seq", sequenceName = "equipment_sequence", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_equipment_type", nullable = false)
    private EquipmentType idEquipmentType;

    @Column(name = "status", nullable = false)
    private Double status;

    @Column(name = "image", nullable = false)
    private String image;
}
