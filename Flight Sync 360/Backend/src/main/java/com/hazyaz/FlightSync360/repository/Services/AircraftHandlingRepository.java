package com.hazyaz.FlightSync360.repository.Services;

// 5. AircraftHandlingRepository.java

import com.hazyaz.FlightSync360.model.TS.GH.AircraftHandling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AircraftHandlingRepository extends JpaRepository<AircraftHandling, String> {
    Optional<AircraftHandling> findByUxTripId(String uxTripId);
}