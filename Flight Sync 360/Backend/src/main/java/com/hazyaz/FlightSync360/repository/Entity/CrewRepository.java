package com.hazyaz.FlightSync360.repository.Entity;

import com.hazyaz.FlightSync360.model.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrewRepository extends JpaRepository<Crew,Object> {
    List<Crew> findAllByUxUniversalCompanyId(String companyId);
}
