package com.hazyaz.FlightPulse360.repository.Services;

// 1. FuelServiceRepository.java

import com.hazyaz.FlightPulse360.model.TS.FuelService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FuelServiceRepository extends JpaRepository<FuelService, String> {
    // Custom queries
    Optional<FuelService> findByUxTripId(String uxTripId);
    List<FuelService> findAllByUxTripId(String uxTripId);
}
