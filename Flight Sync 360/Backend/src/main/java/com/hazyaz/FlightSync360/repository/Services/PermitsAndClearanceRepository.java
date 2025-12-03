package com.hazyaz.FlightSync360.repository.Services;


import com.hazyaz.FlightSync360.model.TS.PermitsAndClearance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermitsAndClearanceRepository extends JpaRepository<PermitsAndClearance, String> {
    Optional<PermitsAndClearance> findByUxTripId(String uxTripId);
}