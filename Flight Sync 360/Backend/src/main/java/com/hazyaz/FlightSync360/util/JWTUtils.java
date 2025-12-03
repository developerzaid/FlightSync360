package com.hazyaz.FlightSync360.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.Map;

public class JWTUtils {

    static String SECRETKEY = "872BBSGYIMNjdw292n3oosd8223KSDjjowi73268insdowwhw3jnwJJJ423";

    public static String generateToken(String email, String companyId) {
        return Jwts.builder()
                .setSubject(email)
                .setClaims(Map.of("companyId", companyId)) // embed company ID
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .signWith(SignatureAlgorithm.HS256, SECRETKEY) // use secure key
                .compact();
    }


    public static Claims validateToken(String token) throws JwtException {
        return Jwts.parser()
                .setSigningKey(SECRETKEY)
                .parseClaimsJws(token) // throws exception if invalid
                .getBody();
    }
}
