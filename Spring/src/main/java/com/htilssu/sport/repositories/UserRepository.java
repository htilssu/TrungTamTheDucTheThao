package com.htilssu.sport.repositories;

import com.htilssu.sport.data.models.User;
import com.mongodb.lang.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}

