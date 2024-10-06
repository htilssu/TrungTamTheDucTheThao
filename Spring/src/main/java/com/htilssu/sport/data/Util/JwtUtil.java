package com.htilssu.sport.data.Util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.htilssu.sport.data.models.AuthData;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

    private static final String SECRET_KEY = "your_secret_key";
    private static final long EXPIRATION_TIME = 86400000; // 1 day

    public static String generateToken(AuthData authData) {

        if (authData.getUsername() != null && authData.getPassword() != null) {
            throw new IllegalArgumentException("Tên tài khoản và mật khẩu không được để trống!");
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", authData.getUsername());
        claims.put("email", authData.getEmail());
        claims.put("password", authData.getPassword());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(authData.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            throw new RuntimeException("Token không hợp lệ", e);
        }
    }

    public static long getExpirationTimeMillis(String token) {
        Claims claims = extractClaims(token);
        return claims.getExpiration().getTime();
    }

    public static boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    public static String getEmailFromToken(String token) {
        return extractClaims(token).getSubject();
    }

    public static String getUserNameFromToken(String token) {
        return (String) extractClaims(token).get("username");
    }

    public static String getPassWordFromToken(String token) {
        return (String) extractClaims(token).get("password");
    }
}
