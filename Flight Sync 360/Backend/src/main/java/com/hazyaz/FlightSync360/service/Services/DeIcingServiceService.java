package com.hazyaz.FlightSync360.service.Services;


import com.hazyaz.FlightSync360.model.TS.GH.DeIcingService;
import com.hazyaz.FlightSync360.repository.Services.DeIcingServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DeIcingServiceService {

    @Autowired
    private DeIcingServiceRepository deIcingServiceRepository;

    @Transactional
    public DeIcingService createDeIcingService(DeIcingService deicing, String tripId) {
        deicing.setUxTripId(tripId);
        return deIcingServiceRepository.save(deicing);
    }

    public Optional<DeIcingService> getDeIcingServiceById(String serviceId) {
        return deIcingServiceRepository.findById(serviceId);
    }

    public Optional<DeIcingService> getDeIcingServiceByTripId(String tripId) {
        return deIcingServiceRepository.findByUxTripId(tripId);
    }

    public List<DeIcingService> getAllDeIcingServices() {
        return deIcingServiceRepository.findAll();
    }

    @Transactional
    public DeIcingService updateDeIcingService(String serviceId, Map<String, Object> updates) {
        return deIcingServiceRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "dis_vendor": existing.setDis_vendor((String) value); break;
                            case "dis_serviceName": existing.setDis_serviceName((String) value); break;
                            case "dis_fluidType": existing.setDis_fluidType((String) value); break;
                            case "dis_fluidQuantity": existing.setDis_fluidQuantity((Double) value); break;
                            case "dis_outsideTemperature": existing.setDis_outsideTemperature((Double) value); break;
                            case "dis_deicingTime": existing.setDis_deicingTime((LocalDateTime) value); break;
                            case "dis_deicingDuration": existing.setDis_deicingDuration((Integer) value); break;
                            case "dis_documents": existing.setDis_documents((List<String>) value); break;
                            case "dis_additionalNotes": existing.setDis_additionalNotes((String) value); break;
                            case "dis_serviceStatus": existing.setDis_serviceStatus((String) value); break;
                        }
                    });
                    return deIcingServiceRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("De-icing service not found: " + serviceId));
    }

    @Transactional
    public void deleteDeIcingService(String serviceId) {
        deIcingServiceRepository.deleteById(serviceId);
    }
}