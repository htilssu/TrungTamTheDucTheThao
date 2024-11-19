package com.htilssu.sport.service;

import com.htilssu.sport.data.models.Coach;
import com.htilssu.sport.repository.CoachRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CoachService {
    private final CoachRepository coachRepository;

    public List<Coach> findAll() {
        return coachRepository.findAll();
    }

    public Optional<Coach> findById(Long id) {
        return coachRepository.findById(id);
    }

    public Coach save(Coach coach) {
        return coachRepository.save(coach);
    }

    public void deleteById(Long id) {
        coachRepository.deleteById(id);
    }
}
