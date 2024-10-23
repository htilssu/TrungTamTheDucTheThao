package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.CoachDto; // Import CoachDto
import com.htilssu.sport.data.models.Coach;
import com.htilssu.sport.services.CoachService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/coach")
public class CoachController {

    @Autowired
    private final CoachService coachService;

    public CoachController(CoachService coachService) {
        this.coachService = coachService;
    }

    @GetMapping
    public List<CoachDto> getAllCoaches() {
        List<Coach> coaches = coachService.findAll();
        return coaches.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoachDto> getCoachById(@PathVariable Long id) {
        return coachService.findById(id)
                .map(this::convertToDto)
                .map(coachDto -> ResponseEntity.ok(coachDto))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<CoachDto> addCoach(@RequestBody Coach coach) {
        Coach savedCoach = coachService.save(coach);
        return new ResponseEntity<>(convertToDto(savedCoach), HttpStatus.CREATED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<CoachDto> updateCoach(@PathVariable Long id, @RequestBody Coach coach) {
        if (!coachService.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        coach.setId(id);
        Coach updatedCoach = coachService.save(coach);
        return ResponseEntity.ok(convertToDto(updatedCoach));

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        if (!coachService.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        coachService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private CoachDto convertToDto(Coach coach) {
        return new CoachDto(coach.getId());
    }
}
