package com.hazyaz.FlightSync360.repository.Services;

// 6. CateringServiceRepository.java

import com.hazyaz.FlightSync360.model.TS.GH.CateringService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CateringServiceRepository extends JpaRepository<CateringService, String> {
    Optional<CateringService> findByUxTripId(String uxTripId);
}