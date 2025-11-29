package com.hazyaz.FlightPulse360.repository.Services;

// 10. WaterServiceRepository.java
import com.hazyaz.FlightPulse360.model.TS.GH.WaterService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WaterServiceRepository extends JpaRepository<WaterService, String> {
    Optional<WaterService> findByUxTripId(String uxTripId);
}