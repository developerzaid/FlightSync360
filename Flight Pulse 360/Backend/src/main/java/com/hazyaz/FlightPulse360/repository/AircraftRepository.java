package com.hazyaz.FlightPulse360.repository;

import com.hazyaz.FlightPulse360.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, String> {

//    Add custom method later when needed
}
