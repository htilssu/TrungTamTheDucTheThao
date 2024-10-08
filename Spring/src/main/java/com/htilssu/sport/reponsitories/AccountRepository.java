package com.htilssu.sport.reponsitories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    
    Optional<Account> findByEmail(String email);

    boolean existsByEmail(String email);
}
