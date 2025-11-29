package com.hazyaz.FlightPulse360.service.Services;


import com.hazyaz.FlightPulse360.model.TS.GH.LavatoryService;

import com.hazyaz.FlightPulse360.repository.Services.LavatoryServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class LavatoryServiceService {

    @Autowired
    private LavatoryServiceRepository lavatoryServiceRepository;

    @Transactional
    public LavatoryService createLavatoryService(LavatoryService lavatory, String tripId) {
        lavatory.setUxTripId(tripId);
        return lavatoryServiceRepository.save(lavatory);
    }

    public Optional<LavatoryService> getLavatoryServiceById(String serviceId) {
        return lavatoryServiceRepository.findById(serviceId);
    }

    public Optional<LavatoryService> getLavatoryServiceByTripId(String tripId) {
        return lavatoryServiceRepository.findByUxTripId(tripId);
    }

    public List<LavatoryService> getAllLavatoryServices() {
        return lavatoryServiceRepository.findAll();
    }

    @Transactional
    public LavatoryService updateLavatoryService(String serviceId, Map<String, Object> updates) {
        return lavatoryServiceRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "ls_serviceName": existing.setLs_serviceName((String) value); break;
                            case "ls_vendor": existing.setLs_vendor((String) value); break;
                            case "ls_lavaServiceRequired": existing.setLs_lavaServiceRequired((Boolean) value); break;
                            case "ls_numberOfLavatories": existing.setLs_numberOfLavatories((Integer) value); break;
                            case "ls_serviceType": existing.setLs_serviceType((String) value); break;
                            case "ls_serviceTime": existing.setLs_serviceTime((String) value); break;
                            case "ls_lavaServiceNotes": existing.setLs_lavaServiceNotes((String) value); break;
                            case "ls_documents": existing.setLs_documents((List<String>) value); break;
                            case "ls_additionalNotes": existing.setLs_additionalNotes((String) value); break;
                            case "ls_serviceStatus": existing.setLs_serviceStatus((String) value); break;
                            case "ls_payment": existing.setLs_payment((String) value); break;
                        }
                    });
                    return lavatoryServiceRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Lavatory service not found: " + serviceId));
    }

    @Transactional
    public void deleteLavatoryService(String serviceId) {
        lavatoryServiceRepository.deleteById(serviceId);
    }
}