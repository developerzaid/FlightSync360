package com.hazyaz.FlightSync360.repository.Services;



import com.hazyaz.FlightSync360.model.TS.GH.DeIcingService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeIcingServiceRepository extends JpaRepository<DeIcingService, String> {
    Optional<DeIcingService> findByUxTripId(String uxTripId);
}