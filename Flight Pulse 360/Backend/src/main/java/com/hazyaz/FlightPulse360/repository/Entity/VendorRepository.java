package com.hazyaz.FlightPulse360.repository.Entity;

import com.hazyaz.FlightPulse360.model.Aircraft;
import com.hazyaz.FlightPulse360.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {
    List<Vendor> findAllByUxUniversalCompanyId(String companyId);

}
