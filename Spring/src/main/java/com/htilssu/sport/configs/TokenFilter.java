package com.htilssu.sport.configs;

import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.util.JwtUtil;
import com.htilssu.sport.repositories.AccountRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@AllArgsConstructor
public class TokenFilter implements Filter {

    private final AccountRepository accountRepository;

    @Override
    public void doFilter(ServletRequest servletRequest,
            ServletResponse servletResponse,
            FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        if (JwtUtil.isTokenExpired(token)) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token đã hết hạn");
            return;
        }

        String email = JwtUtil.getEmailFromToken(token);
        Optional<Account> userOptional = accountRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Người dùng không tồn tại");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
