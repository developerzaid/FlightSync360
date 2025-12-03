package com.hazyaz.FlightSync360.repository.Services;



import com.hazyaz.FlightSync360.model.TS.GH.RampService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RampServiceRepository extends JpaRepository<RampService, String> {
    Optional<RampService> findByUxTripId(String uxTripId);
}