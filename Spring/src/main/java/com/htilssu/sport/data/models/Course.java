package com.htilssu.sport.data.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_id_seq")
    @SequenceGenerator(name = "course_id_seq", sequenceName = "course_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "slot", nullable = false)
    private Short slot;

    @ManyToOne
    @JoinColumn(name = "id_coach", nullable = false)
    private Coach coach; // Liên kết tới Coach

    @ManyToOne
    @JoinColumn(name = "id_room", nullable = false)
    private Room room; // Liên kết tới Room

    @Column(name = "thumbnail")
    private String thumbnail;
}
