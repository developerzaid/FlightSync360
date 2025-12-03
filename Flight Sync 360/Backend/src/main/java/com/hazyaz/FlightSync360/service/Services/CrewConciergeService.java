package com.hazyaz.FlightSync360.service.Services;


import com.hazyaz.FlightSync360.model.TS.CrewConcierge;
import com.hazyaz.FlightSync360.repository.Services.CrewConciergeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CrewConciergeService {

    @Autowired
    private CrewConciergeRepository crewConciergeRepository;

    @Transactional
    public CrewConcierge createCrewConcierge(CrewConcierge crewConcierge, String tripId) {
        crewConcierge.setUxTripId(tripId);
        return crewConciergeRepository.save(crewConcierge);
    }

    public Optional<CrewConcierge> getCrewConciergeById(String serviceId) {
        return crewConciergeRepository.findById(serviceId);
    }

    public Optional<CrewConcierge> getCrewConciergeByTripId(String tripId) {
        return crewConciergeRepository.findByUxTripId(tripId);
    }

    public List<CrewConcierge> getAllCrewConcierges() {
        return crewConciergeRepository.findAll();
    }

    @Transactional
    public CrewConcierge updateCrewConcierge(String serviceId, Map<String, Object> updates) {
        return crewConciergeRepository.findById(serviceId)
                .map(existing -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "crc_serviceName": existing.setCrc_serviceName((String) value); break;
                            case "crc_totalCrewMembers": existing.setCrc_totalCrewMembers((Integer) value); break;
                            case "crc_pilots": existing.setCrc_pilots((Integer) value); break;
                            case "crc_flightAttendants": existing.setCrc_flightAttendants((Integer) value); break;
                            case "crc_hotelName": existing.setCrc_hotelName((String) value); break;
                            case "crc_hotelAddress": existing.setCrc_hotelAddress((String) value); break;
                            case "crc_hotelContactNumber": existing.setCrc_hotelContactNumber((String) value); break;
                            case "crc_roomsRequired": existing.setCrc_roomsRequired((Integer) value); break;
                            case "crc_hotelCheckIn": existing.setCrc_hotelCheckIn((LocalDateTime) value); break;
                            case "crc_hotelCheckOut": existing.setCrc_hotelCheckOut((LocalDateTime) value); break;
                            case "crc_numberOfNights": existing.setCrc_numberOfNights((Integer) value); break;
                            case "crc_transportType": existing.setCrc_transportType((String) value); break;
                            case "crc_transportProvider": existing.setCrc_transportProvider((String) value); break;
                            case "crc_driverName": existing.setCrc_driverName((String) value); break;
                            case "crc_driverContact": existing.setCrc_driverContact((String) value); break;
                            case "crc_pickupTimeFromAirport": existing.setCrc_pickupTimeFromAirport((LocalDateTime) value); break;
                            case "crc_pickupLocationAirport": existing.setCrc_pickupLocationAirport((String) value); break;
                            case "crc_pickupTimeFromHotel": existing.setCrc_pickupTimeFromHotel((LocalDateTime) value); break;
                            case "vn_documents": existing.setVn_documents((List<String>) value); break;
                            case "crc_additionalNotes": existing.setCrc_additionalNotes((String) value); break;
                            case "crc_serviceStatus": existing.setCrc_serviceStatus((String) value); break;
                        }
                    });
                    return crewConciergeRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Crew concierge not found: " + serviceId));
    }

    @Transactional
    public void deleteCrewConcierge(String serviceId) {
        crewConciergeRepository.deleteById(serviceId);
    }
}