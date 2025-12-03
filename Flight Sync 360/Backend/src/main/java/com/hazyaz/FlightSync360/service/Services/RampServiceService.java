package com.hazyaz.FlightSync360.service.Services;


import com.hazyaz.FlightSync360.model.TS.GH.RampService;
import com.hazyaz.FlightSync360.repository.Services.RampServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RampServiceService {

    @Autowired
    private RampServiceRepository rampServiceRepository;

    @Transactional
    public RampService createRampService(RampService ramp, String tripId) {
        ramp.setUxTripId(tripId);
        return rampServiceRepository.save(ramp);
    }

    public Optional<RampService> getRampServiceById(String serviceId) {
        return rampServiceRepository.findById(serviceId);
    }

    public Optional<RampService> getRampServiceByTripId(String tripId) {
        return rampServiceRepository.findByUxTripId(tripId);
    }

    public List<RampService> getAllRampServices() {
        return rampServiceRepository.findAll();
    }

    @Transactional
    public RampService updateRampService(String serviceId, Map<String, Object> updates) {
        return rampServiceRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "rps_serviceName": existing.setRps_serviceName((String) value); break;
                            case "rps_groundHandlingServiceId": existing.setRps_groundHandlingServiceId((String) value); break;
                            case "rps_serviceRequestId": existing.setRps_serviceRequestId((String) value); break;
                            case "rps_vendor": existing.setRps_vendor((String) value); break;
                            case "rps_gpuDuration": existing.setRps_gpuDuration((Integer) value); break;
                            case "rps_gpuChargePerHour": existing.setRps_gpuChargePerHour((BigDecimal) value); break;
                            case "rps_acuDuration": existing.setRps_acuDuration((Integer) value); break;
                            case "rps_acuChargePerHour": existing.setRps_acuChargePerHour((BigDecimal) value); break;
                            case "rps_chalksAndCones": existing.setRps_chalksAndCones((Boolean) value); break;
                            case "rps_towingRequired": existing.setRps_towingRequired((Boolean) value); break;
                            case "rps_towingFromLocation": existing.setRps_towingFromLocation((String) value); break;
                            case "rps_towingToLocation": existing.setRps_towingToLocation((String) value); break;
                            case "rps_rampEquipmentNotes": existing.setRps_rampEquipmentNotes((String) value); break;
                            case "rps_documents": existing.setRps_documents((List<String>) value); break;
                            case "rps_additionalNotes": existing.setRps_additionalNotes((String) value); break;
                            case "rps_serviceStatus": existing.setRps_serviceStatus((String) value); break;
                            case "rps_payment": existing.setRps_payment((String) value); break;
                        }
                    });
                    return rampServiceRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Ramp service not found: " + serviceId));
    }

    @Transactional
    public void deleteRampService(String serviceId) {
        rampServiceRepository.deleteById(serviceId);
    }
}