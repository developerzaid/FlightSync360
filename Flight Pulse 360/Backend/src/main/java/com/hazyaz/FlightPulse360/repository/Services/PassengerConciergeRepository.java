package com.hazyaz.FlightPulse360.repository.Services;



import com.hazyaz.FlightPulse360.model.TS.PassengerConcierge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassengerConciergeRepository extends JpaRepository<PassengerConcierge, String> {
    Optional<PassengerConcierge> findByUxTripId(String uxTripId);
}