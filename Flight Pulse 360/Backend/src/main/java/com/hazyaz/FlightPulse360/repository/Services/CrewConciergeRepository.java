package com.hazyaz.FlightPulse360.repository.Services;



import com.hazyaz.FlightPulse360.model.TS.CrewConcierge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CrewConciergeRepository extends JpaRepository<CrewConcierge, String> {
    Optional<CrewConcierge> findByUxTripId(String uxTripId);
}