package com.hazyaz.FlightPulse360.repository.Entity;

import com.hazyaz.FlightPulse360.model.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, String> {

    Aircraft findByAcId(String acId);
    List<Aircraft> findAllByUxUniversalCompanyId(String companyId);
//    Add custom method later when needed
}
