package com.htilssu.sport.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.htilssu.sport.data.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
