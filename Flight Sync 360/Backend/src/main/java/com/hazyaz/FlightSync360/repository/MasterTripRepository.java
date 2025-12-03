package com.hazyaz.FlightSync360.repository;

import com.hazyaz.FlightSync360.model.MasterTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MasterTripRepository extends JpaRepository<MasterTrip, String> {
    MasterTrip findByUxTripId(String tripId);

    List<MasterTrip> findAllByUxCompanyId(String companyId);

}
