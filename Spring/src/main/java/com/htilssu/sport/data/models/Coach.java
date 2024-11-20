package com.htilssu.sport.data.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "coach")
public class Coach {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coach_seq")
    @SequenceGenerator(name = "coach_seq", sequenceName = "coach_seq", allocationSize = 1)
    private Long id;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "description", length = 400)
    private String description;

    @Column(name = "phone_number", length = 10)
    private String phoneNumber;

    @Column(name = "name", length = 100)
    private String name;

}
