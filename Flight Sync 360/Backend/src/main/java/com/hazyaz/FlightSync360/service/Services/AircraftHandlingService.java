package com.hazyaz.FlightSync360.service.Services;



import com.hazyaz.FlightSync360.model.TS.GH.AircraftHandling;

import com.hazyaz.FlightSync360.repository.Services.AircraftHandlingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AircraftHandlingService {

    @Autowired
    private AircraftHandlingRepository aircraftHandlingRepository;

    @Transactional
    public AircraftHandling createAircraftHandling(AircraftHandling handling, String tripId) {
        handling.setUxTripId(tripId);
        return aircraftHandlingRepository.save(handling);
    }

    public Optional<AircraftHandling> getAircraftHandlingById(String serviceId) {
        return aircraftHandlingRepository.findById(serviceId);
    }

    public Optional<AircraftHandling> getAircraftHandlingByTripId(String tripId) {
        return aircraftHandlingRepository.findByUxTripId(tripId);
    }

    public List<AircraftHandling> getAllAircraftHandlings() {
        return aircraftHandlingRepository.findAll();
    }

    @Transactional
    public AircraftHandling updateAircraftHandling(String serviceId, Map<String, Object> updates) {
        return aircraftHandlingRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "arh_serviceName": existing.setArh_serviceName((String) value); break;
                            case "ach_parkingPosition": existing.setAch_parkingPosition((String) value); break;
                            case "ach_arrivalTime": existing.setAch_arrivalTime((String) value); break;
                            case "ach_departureTime": existing.setAch_departureTime((String) value); break;
                            case "ach_parkingDuration": existing.setAch_parkingDuration((String) value); break;
                            case "ach_maxTakeoffWeight": existing.setAch_maxTakeoffWeight((String) value); break;
                            case "ach_hangarNumber": existing.setAch_hangarNumber((String) value); break;
                            case "ach_towingLocation": existing.setAch_towingLocation((String) value); break;
                            case "ach_parkingChargeType": existing.setAch_parkingChargeType((String) value); break;
                            case "ach_parkingRate": existing.setAch_parkingRate((String) value); break;
                            case "ach_parkingNotes": existing.setAch_parkingNotes((String) value); break;
                            case "ach_vendor": existing.setAch_vendor((String) value); break;
                            case "ach_groundFrequency": existing.setAch_groundFrequency((String) value); break;
                            case "ach_groundHandlerName": existing.setAch_groundHandlerName((String) value); break;
                            case "ach_groundHandlerContact": existing.setAch_groundHandlerContact((String) value); break;
                            case "ach_groundHandlerEmail": existing.setAch_groundHandlerEmail((String) value); break;
                            case "ach_documents": existing.setAch_documents((List<String>) value); break;
                            case "ach_additionalNotes": existing.setAch_additionalNotes((String) value); break;
                            case "ach_serviceStatus": existing.setAch_serviceStatus((String) value); break;
                        }
                    });
                    return aircraftHandlingRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Aircraft handling not found: " + serviceId));
    }

    @Transactional
    public void deleteAircraftHandling(String serviceId) {
        aircraftHandlingRepository.deleteById(serviceId);
    }
}