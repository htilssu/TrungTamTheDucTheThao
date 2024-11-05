package com.htilssu.sport.configs;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.util.JwtUtil;
import com.htilssu.sport.repositories.AccountRepository;
import com.mongodb.lang.NonNull;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final AccountRepository accountRepository;

    public TokenFilter(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Thiếu hoặc sai Authorization header.");
            return;
        }

        String token = authHeader.substring(7);
        if (JwtUtil.isTokenExpired(token)) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token đã hết hạn");
            return;
        }

        String email = JwtUtil.getEmailFromToken(token);
        Optional<Account> userOptional = accountRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Người dùng không tồn tại");
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/api/login") || path.startsWith("/api/register");
    }
}
