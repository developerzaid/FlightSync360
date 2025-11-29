package com.hazyaz.FlightPulse360.service.Services;


import com.hazyaz.FlightPulse360.model.TS.PermitsAndClearance;
import com.hazyaz.FlightPulse360.repository.Services.PermitsAndClearanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PermitsAndClearanceService {

    @Autowired
    private PermitsAndClearanceRepository permitsRepository;

    @Transactional
    public PermitsAndClearance createPermitsAndClearance(PermitsAndClearance permits, String tripId) {
        permits.setUxTripId(tripId);
        return permitsRepository.save(permits);
    }

    public Optional<PermitsAndClearance> getPermitsAndClearanceById(String serviceId) {
        return permitsRepository.findById(serviceId);
    }

    public Optional<PermitsAndClearance> getPermitsAndClearanceByTripId(String tripId) {
        return permitsRepository.findByUxTripId(tripId);
    }

    public List<PermitsAndClearance> getAllPermitsAndClearances() {
        return permitsRepository.findAll();
    }

    @Transactional
    public PermitsAndClearance updatePermitsAndClearance(String serviceId, Map<String, Object> updates) {
        return permitsRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "pac_serviceName": existing.setPac_serviceName((String) value); break;
                            case "pac_vendorId": existing.setPac_vendorId((String) value); break;
                            case "pac_contactPerson": existing.setPac_contactPerson((String) value); break;
                            case "pac_contactEmail": existing.setPac_contactEmail((String) value); break;
                            case "pac_permitType": existing.setPac_permitType((String) value); break;
                            case "pac_landingNumber": existing.setPac_landingNumber((String) value); break;
                            case "pac_landingPermitNumber": existing.setPac_landingPermitNumber((String) value); break;
                            case "pac_overflightCountries": existing.setPac_overflightCountries((String) value); break;
                            case "pac_overflightPermitNumber": existing.setPac_overflightPermitNumber((String) value); break;
                            case "pac_processingFees": existing.setPac_processingFees((String) value); break;
                            case "pac_governmentFees": existing.setPac_governmentFees((String) value); break;
                            case "pac_totalFees": existing.setPac_totalFees((String) value); break;
                            case "pac_currency": existing.setPac_currency((String) value); break;
                            case "pac_applicationDate": existing.setPac_applicationDate((String) value); break;
                            case "pac_expectedApprovalDate": existing.setPac_expectedApprovalDate((String) value); break;
                            case "pac_documents": existing.setPac_documents((List<String>) value); break;
                            case "pac_additionalNotes": existing.setPac_additionalNotes((String) value); break;
                            case "pac_serviceStatus": existing.setPac_serviceStatus((String) value); break;
                        }
                    });
                    return permitsRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Permits and clearance not found: " + serviceId));
    }

    @Transactional
    public void deletePermitsAndClearance(String serviceId) {
        permitsRepository.deleteById(serviceId);
    }
}