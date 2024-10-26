package com.htilssu.sport.repository;

import com.htilssu.sport.data.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    // Kiểm tra xem email đã tồn tại hay chưa
    boolean existsByEmail(String email);

    // Kiểm tra xem email có tồn tại nhưng không thuộc về user hiện tại (dùng khi cập nhật thông tin)
    boolean existsByEmailAndIdNot(String email, Long id);

    // Tìm Account theo User ID
    Account findByUserId(Long userId);
}