package com.hazyaz.FlightPulse360.repository.Entity;

import com.hazyaz.FlightPulse360.model.Aircraft;
import com.hazyaz.FlightPulse360.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, String> {
    List<Client> findAllByUxUniversalCompanyId(String companyId);
}
