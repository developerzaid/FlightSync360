package com.hazyaz.FlightPulse360.repository.Services;


import com.hazyaz.FlightPulse360.model.TS.GH.LavatoryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LavatoryServiceRepository extends JpaRepository<LavatoryService, String> {
    Optional<LavatoryService> findByUxTripId(String uxTripId);
}