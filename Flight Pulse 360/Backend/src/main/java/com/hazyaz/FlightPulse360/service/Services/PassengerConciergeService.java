package com.hazyaz.FlightPulse360.service.Services;


import com.hazyaz.FlightPulse360.model.TS.PassengerConcierge;
import com.hazyaz.FlightPulse360.repository.Services.PassengerConciergeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PassengerConciergeService {

    @Autowired
    private PassengerConciergeRepository passengerConciergeRepository;

    @Transactional
    public PassengerConcierge createPassengerConcierge(PassengerConcierge passengerConcierge, String tripId) {
        passengerConcierge.setUxTripId(tripId);
        return passengerConciergeRepository.save(passengerConcierge);
    }

    public Optional<PassengerConcierge> getPassengerConciergeById(String serviceId) {
        return passengerConciergeRepository.findById(serviceId);
    }

    public Optional<PassengerConcierge> getPassengerConciergeByTripId(String tripId) {
        return passengerConciergeRepository.findByUxTripId(tripId);
    }

    public List<PassengerConcierge> getAllPassengerConcierges() {
        return passengerConciergeRepository.findAll();
    }

    @Transactional
    public PassengerConcierge updatePassengerConcierge(String serviceId, Map<String, Object> updates) {
        return passengerConciergeRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "pc_serviceName": existing.setPc_serviceName((String) value); break;
                            case "pc_passengersRequiringTransport": existing.setPc_passengersRequiringTransport((Integer) value); break;
                            case "pc_transportDestination": existing.setPc_transportDestination((String) value); break;
                            case "pc_transportType": existing.setPc_transportType((String) value); break;
                            case "pc_transportProvider": existing.setPc_transportProvider((String) value); break;
                            case "pc_chauffeurName": existing.setPc_chauffeurName((String) value); break;
                            case "pc_chauffeurContact": existing.setPc_chauffeurContact((String) value); break;
                            case "pc_vehicleType": existing.setPc_vehicleType((String) value); break;
                            case "pc_pickupTime": existing.setPc_pickupTime((LocalDateTime) value); break;
                            case "pc_pickupLocation": existing.setPc_pickupLocation((String) value); break;
                            case "pc_passengerHotelName": existing.setPc_passengerHotelName((String) value); break;
                            case "pc_passengerHotelAddress": existing.setPc_passengerHotelAddress((String) value); break;
                            case "pc_passengerRoomsRequired": existing.setPc_passengerRoomsRequired((Integer) value); break;
                            case "pc_passengerCheckIn": existing.setPc_passengerCheckIn((LocalDateTime) value); break;
                            case "pc_passengerCheckOut": existing.setPc_passengerCheckOut((LocalDateTime) value); break;
                            case "pc_passengerRoomType": existing.setPc_passengerRoomType((String) value); break;
                            case "pc_documents": existing.setPc_documents((List<String>) value); break;
                            case "pc_additionalNotes": existing.setPc_additionalNotes((String) value); break;
                            case "pc_status": existing.setPc_status((String) value); break;
                            case "pc_serviceStatus": existing.setPc_serviceStatus((String) value); break;
                        }
                    });
                    return passengerConciergeRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Passenger concierge not found: " + serviceId));
    }

    @Transactional
    public void deletePassengerConcierge(String serviceId) {
        passengerConciergeRepository.deleteById(serviceId);
    }
}