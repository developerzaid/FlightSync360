package com.hazyaz.FlightPulse360.service.Services;


import com.hazyaz.FlightPulse360.model.TS.GH.CateringService;

import com.hazyaz.FlightPulse360.repository.Services.CateringServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CateringServiceService {

    @Autowired
    private CateringServiceRepository cateringServiceRepository;

    @Transactional
    public CateringService createCateringService(CateringService catering, String tripId) {
        catering.setUxTripId(tripId);
        return cateringServiceRepository.save(catering);
    }

    public Optional<CateringService> getCateringServiceById(String serviceId) {
        return cateringServiceRepository.findById(serviceId);
    }

    public Optional<CateringService> getCateringServiceByTripId(String tripId) {
        return cateringServiceRepository.findByUxTripId(tripId);
    }

    public List<CateringService> getAllCateringServices() {
        return cateringServiceRepository.findAll();
    }

    @Transactional
    public CateringService updateCateringService(String serviceId, Map<String, Object> updates) {
        return cateringServiceRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "cs_serviceName": existing.setCs_serviceName((String) value); break;
                            case "cs_vendor": existing.setCs_vendor((String) value); break;
                            case "cs_cateringCompany": existing.setCs_cateringCompany((String) value); break;
                            case "cs_cateringContact": existing.setCs_cateringContact((String) value); break;
                            case "cs_cateringContactPhone": existing.setCs_cateringContactPhone((String) value); break;
                            case "cs_numberOfMeals": existing.setCs_numberOfMeals((Integer) value); break;
                            case "cs_mealTypes": existing.setCs_mealTypes((String) value); break;
                            case "cs_specialDietaryRequirements": existing.setCs_specialDietaryRequirements((String) value); break;
                            case "cs_cateringDeliveryTime": existing.setCs_cateringDeliveryTime((LocalDateTime) value); break;
                            case "cs_documents": existing.setCs_documents((List<String>) value); break;
                            case "cs_additionalNotes": existing.setCs_additionalNotes((String) value); break;
                            case "cs_serviceStatus": existing.setCs_serviceStatus((String) value); break;
                        }
                    });
                    return cateringServiceRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Catering service not found: " + serviceId));
    }

    @Transactional
    public void deleteCateringService(String serviceId) {
        cateringServiceRepository.deleteById(serviceId);
    }
}