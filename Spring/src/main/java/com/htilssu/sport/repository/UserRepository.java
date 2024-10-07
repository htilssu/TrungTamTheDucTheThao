package com.htilssu.sport.repository;

import com.htilssu.sport.data.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
