package com.hazyaz.FlightSync360.config;

import com.hazyaz.FlightSync360.util.JWTUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTConfig extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token  = authHeader.substring(7);


            Claims claims = JWTUtils.validateToken(token);

            String userId = claims.getSubject();
            String companyId = claims.get("companyId", String.class);

            // You can store in SecurityContext or request attributes
            request.setAttribute("userId", userId);
            request.setAttribute("companyId", companyId);
        }

        filterChain.doFilter(request, response);
    }
}
