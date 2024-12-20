package com.htilssu.sport.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.htilssu.sport.data.util.JwtUtil;
import com.htilssu.sport.repository.AccountRepository;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

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
        if (JwtUtil.verifyToken(token)) {
            var claim = JwtUtil.extractClaims(token);
            final SecurityContext emptyContext =
                    SecurityContextHolder.getContextHolderStrategy()
                            .createEmptyContext();

            final UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(claim.getSubject(), token,
                            Collections.singleton(() -> "ROLE_" + claim.get("role", String.class)));
            emptyContext.setAuthentication(authenticationToken);

            SecurityContextHolder.setContext(emptyContext);
        }


        filterChain.doFilter(request, response);
    }
}
