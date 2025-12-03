package com.hazyaz.FlightSync360.service.Services;

import com.hazyaz.FlightSync360.model.TS.FuelService;
import com.hazyaz.FlightSync360.repository.Services.FuelServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FuelServiceService {

    @Autowired
    private FuelServiceRepository fuelServiceRepository;

    @Transactional
    public FuelService createFuelService(FuelService fuelService, String tripId) {
        fuelService.setUxTripId(tripId);
        return fuelServiceRepository.save(fuelService);
    }

    public Optional<FuelService> getFuelServiceById(String serviceId) {
        return fuelServiceRepository.findById(serviceId);
    }

    public Optional<FuelService> getFuelServiceByTripId(String tripId) {
        return fuelServiceRepository.findByUxTripId(tripId);
    }

    public List<FuelService> getAllFuelServices() {
        return fuelServiceRepository.findAll();
    }

    @Transactional
    public FuelService updateFuelService(String serviceId, Map<String, Object> updates) {
        return fuelServiceRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "fl_serviceName": existing.setFl_serviceName((String) value); break;
                            case "fl_groundEmail": existing.setFl_groundEmail((String) value); break;
                            case "fl_groundPhone": existing.setFl_groundPhone((String) value); break;
                            case "fl_type": existing.setFl_type((String) value); break;
                            case "fl_quantity": existing.setFl_quantity((String) value); break;
                            case "fl_deliveryDate": existing.setFl_deliveryDate((String) value); break;
                            case "fl_deliveryTime": existing.setFl_deliveryTime((String) value); break;
                            case "fl_unit": existing.setFl_unit((String) value); break;
                            case "fl_upliftQtyLitres": existing.setFl_upliftQtyLitres((String) value); break;
                            case "fl_usGallons": existing.setFl_usGallons((String) value); break;
                            case "fl_currency": existing.setFl_currency((String) value); break;
                            case "fl_cost": existing.setFl_cost((String) value); break;
                            case "fl_paymentTerms": existing.setFl_paymentTerms((String) value); break;
                            case "fl_adrCopy": existing.setFl_adrCopy((String) value); break;
                            case "fl_loadingTime": existing.setFl_loadingTime((String) value); break;
                            case "fl_vendor": existing.setFl_vendor((String) value); break;
                            case "fl_documents": existing.setFl_documents((List<String>) value); break;
                            case "fl_additionalNotes": existing.setFl_additionalNotes((String) value); break;
                            case "fl_status": existing.setFl_status((String) value); break;
                        }
                    });
                    return fuelServiceRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Fuel service not found: " + serviceId));
    }

    @Transactional
    public void deleteFuelService(String serviceId) {
        fuelServiceRepository.deleteById(serviceId);
    }
}