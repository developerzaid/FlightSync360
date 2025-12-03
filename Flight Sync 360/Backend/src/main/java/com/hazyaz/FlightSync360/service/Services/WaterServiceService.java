package com.hazyaz.FlightSync360.service.Services;


import com.hazyaz.FlightSync360.model.TS.GH.WaterService;
import com.hazyaz.FlightSync360.repository.Services.WaterServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WaterServiceService {

    @Autowired
    private WaterServiceRepository waterServiceRepository;

    @Transactional
    public WaterService createWaterService(WaterService water, String tripId) {
        water.setUxTripId(tripId);
        return waterServiceRepository.save(water);
    }

    public Optional<WaterService> getWaterServiceById(String serviceId) {
        return waterServiceRepository.findById(serviceId);
    }

    public Optional<WaterService> getWaterServiceByTripId(String tripId) {
        return waterServiceRepository.findByUxTripId(tripId);
    }

    public List<WaterService> getAllWaterServices() {
        return waterServiceRepository.findAll();
    }

    @Transactional
    public WaterService updateWaterService(String serviceId, Map<String, Object> updates) {
        return waterServiceRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "wts_serviceName": existing.setWts_serviceName((String) value); break;
                            case "wts_vendor": existing.setWts_vendor((String) value); break;
                            case "wts_waterServiceRequired": existing.setWts_waterServiceRequired((Boolean) value); break;
                            case "wts_waterVolume": existing.setWts_waterVolume((Double) value); break;
                            case "wts_serviceTime": existing.setWts_serviceTime((LocalDateTime) value); break;
                            case "wts_serviceCharge": existing.setWts_serviceCharge((String) value); break;
                            case "wts_waterServiceNotes": existing.setWts_waterServiceNotes((String) value); break;
                            case "wts_documents": existing.setWts_documents((List<String>) value); break;
                            case "wts_additionalNotes": existing.setWts_additionalNotes((String) value); break;
                            case "wts_serviceStatus": existing.setWts_serviceStatus((String) value); break;
                            case "wts_payment": existing.setWts_payment((String) value); break;
                        }
                    });
                    return waterServiceRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Water service not found: " + serviceId));
    }

    @Transactional
    public void deleteWaterService(String serviceId) {
        waterServiceRepository.deleteById(serviceId);
    }
}