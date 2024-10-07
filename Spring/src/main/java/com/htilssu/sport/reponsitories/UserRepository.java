package com.htilssu.sport.reponsitories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.AuthData;

public interface UserRepository extends JpaRepository<AuthData, Long> {

    Optional<AuthData> findByUsername(String username);

    boolean existsByUsername(String username);

    Optional<AuthData> findByEmail(String email);

    boolean existsByEmail(String email);

}
