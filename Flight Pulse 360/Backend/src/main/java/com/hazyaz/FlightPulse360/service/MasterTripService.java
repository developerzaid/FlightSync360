package com.hazyaz.FlightPulse360.service;


import com.hazyaz.FlightPulse360.dto.MasterTripRequest;
import com.hazyaz.FlightPulse360.model.*;
import com.hazyaz.FlightPulse360.model.TS.*;
import com.hazyaz.FlightPulse360.model.TS.GH.*;
import com.hazyaz.FlightPulse360.repository.*;
import com.hazyaz.FlightPulse360.service.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MasterTripService {

    // Repositories
    @Autowired private MasterTripRepository masterTripRepository;

    // Service Layer Dependencies
    @Autowired private FuelServiceService fuelServiceService;
    @Autowired private CrewConciergeService crewConciergeService;
    @Autowired private PassengerConciergeService passengerConciergeService;
    @Autowired private PermitsAndClearanceService permitsAndClearanceService;
    @Autowired private AircraftHandlingService aircraftHandlingService;
    @Autowired private CateringServiceService cateringServiceService;
    @Autowired private DeIcingServiceService deIcingServiceService;
    @Autowired private LavatoryServiceService lavatoryServiceService;
    @Autowired private RampServiceService rampServiceService;
    @Autowired private WaterServiceService waterServiceService;

    /**
     * Create a new master trip with all services
     */
    @Transactional
    public MasterTrip createMasterTrip(MasterTripRequest request) {

        // 1. Create and save basic MasterTrip
        MasterTrip trip = new MasterTrip();
        trip.setUxCompanyId(request.getUxCompanyId());
        trip.setMt_tripNumber(request.getMt_tripNumber());
        trip.setMt_flightNumber(request.getMt_flightNumber());
        trip.setMt_tripType(request.getMt_tripType());
        trip.setMt_purpose(request.getMt_purpose());
        trip.setMt_status(request.getMt_status());
        trip.setMt_fromAirport(request.getMt_fromAirport());
        trip.setMt_toAirport(request.getMt_toAirport());
        trip.setMt_scheduledDepartureUtc(request.getMt_scheduledDepartureUtc());
        trip.setMt_scheduledDepartureLocal(request.getMt_scheduledDepartureLocal());
        trip.setMt_scheduledArrivalUtc(request.getMt_scheduledArrivalUtc());
        trip.setMt_scheduledArrivalLocal(request.getMt_scheduledArrivalLocal());
        trip.setMt_duration(request.getMt_duration());
        trip.setMt_additionalNotes(request.getMt_additionalNotes());
        trip.setMt_additionalDocuments(request.getMt_additionalDocuments());
        trip.setMt_dispatcherNotes(request.getMt_dispatcherNotes());
        trip.setMt_safetyNotes(request.getMt_safetyNotes());
        trip.setMt_regulatoryNotes(request.getMt_regulatoryNotes());

        // Set linked objects
        trip.setClients(request.getClients());
        trip.setPassenger(request.getPassenger());
        trip.setCrew(request.getCrew());
        trip.setAircraft(request.getAircraft());

        // Save to generate uxTripId
        trip = masterTripRepository.save(trip);
        String tripId = trip.getUxTripId();

        // 2. Create services and store their IDs

        if (request.getFuelService() != null) {
            FuelService saved = fuelServiceService.createFuelService(request.getFuelService(), tripId);
            trip.setFuelServiceId(saved.getFl_serviceId());
        }

        if (request.getCrewConcierge() != null) {
            CrewConcierge saved = crewConciergeService.createCrewConcierge(request.getCrewConcierge(), tripId);
            trip.setCrewConciergeId(saved.getCrc_serviceId());
        }

        if (request.getPassengerConcierge() != null) {
            PassengerConcierge saved = passengerConciergeService.createPassengerConcierge(request.getPassengerConcierge(), tripId);
            trip.setPassengerConciergeId(saved.getPc_serviceId());
        }

        if (request.getPermitsAndClearance() != null) {
            PermitsAndClearance saved = permitsAndClearanceService.createPermitsAndClearance(request.getPermitsAndClearance(), tripId);
            trip.setPermitsAndClearanceId(saved.getPac_serviceId());
        }

        if (request.getAircraftHandling() != null) {
            AircraftHandling saved = aircraftHandlingService.createAircraftHandling(request.getAircraftHandling(), tripId);
            trip.setAircraftHandlingId(saved.getAch_serviceId());
        }

        if (request.getCateringService() != null) {
            CateringService saved = cateringServiceService.createCateringService(request.getCateringService(), tripId);
            trip.setCateringServiceId(saved.getCs_serviceId());
        }

        if (request.getDeIcingService() != null) {
            DeIcingService saved = deIcingServiceService.createDeIcingService(request.getDeIcingService(), tripId);
            trip.setDeIcingServiceId(saved.getDis_serviceId());
        }

        if (request.getLavatoryService() != null) {
            LavatoryService saved = lavatoryServiceService.createLavatoryService(request.getLavatoryService(), tripId);
            trip.setLavatoryServiceId(saved.getLs_serviceId());
        }

        if (request.getRampService() != null) {
            RampService saved = rampServiceService.createRampService(request.getRampService(), tripId);
            trip.setRampServiceId(saved.getRps_serviceId());
        }

        if (request.getWaterService() != null) {
            WaterService saved = waterServiceService.createWaterService(request.getWaterService(), tripId);
            trip.setWaterServiceId(saved.getWts_serviceId());
        }

        // 3. Save trip with all service IDs
        return masterTripRepository.save(trip);
    }

    /**
     * Update master trip - Map-based approach for flexibility
     */
    @Transactional
    public MasterTrip updateMasterTrip(String tripId, Map<String, Object> updates) {
        return masterTripRepository.findById(tripId)
                .map(existing -> {
                    // Update basic trip fields
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "mt_tripNumber": existing.setMt_tripNumber((String) value); break;
                            case "mt_flightNumber": existing.setMt_flightNumber((String) value); break;
                            case "mt_tripType": existing.setMt_tripType((String) value); break;
                            case "mt_purpose": existing.setMt_purpose((String) value); break;
                            case "mt_status": existing.setMt_status((String) value); break;
                            case "mt_fromAirport": existing.setMt_fromAirport((String) value); break;
                            case "mt_toAirport": existing.setMt_toAirport((String) value); break;
                            case "mt_scheduledDepartureUtc": existing.setMt_scheduledDepartureUtc((LocalDateTime) value); break;
                            case "mt_scheduledDepartureLocal": existing.setMt_scheduledDepartureLocal((LocalDateTime) value); break;
                            case "mt_scheduledArrivalUtc": existing.setMt_scheduledArrivalUtc((LocalDateTime) value); break;
                            case "mt_scheduledArrivalLocal": existing.setMt_scheduledArrivalLocal((LocalDateTime) value); break;
                            case "mt_duration": existing.setMt_duration((String) value); break;
                            case "mt_additionalNotes": existing.setMt_additionalNotes((String) value); break;
                            case "mt_additionalDocuments": existing.setMt_additionalDocuments((String) value); break;
                            case "mt_dispatcherNotes": existing.setMt_dispatcherNotes((String) value); break;
                            case "mt_safetyNotes": existing.setMt_safetyNotes((String) value); break;
                            case "mt_regulatoryNotes": existing.setMt_regulatoryNotes((String) value); break;
                        }
                    });
                    return masterTripRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));
    }

    /**
     * Update a specific service for a trip
     */
    @Transactional
    public void updateTripService(String tripId, String serviceType, Map<String, Object> serviceUpdates) {
        MasterTrip trip = masterTripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));

        switch (serviceType.toUpperCase()) {
            case "FUEL":
                if (trip.getFuelServiceId() != null) {
                    fuelServiceService.updateFuelService(trip.getFuelServiceId(), serviceUpdates);
                }
                break;
            case "CREW_CONCIERGE":
                if (trip.getCrewConciergeId() != null) {
                    crewConciergeService.updateCrewConcierge(trip.getCrewConciergeId(), serviceUpdates);
                }
                break;
            case "PASSENGER_CONCIERGE":
                if (trip.getPassengerConciergeId() != null) {
                    passengerConciergeService.updatePassengerConcierge(trip.getPassengerConciergeId(), serviceUpdates);
                }
                break;
            case "PERMITS":
                if (trip.getPermitsAndClearanceId() != null) {
                    permitsAndClearanceService.updatePermitsAndClearance(trip.getPermitsAndClearanceId(), serviceUpdates);
                }
                break;
            case "AIRCRAFT_HANDLING":
                if (trip.getAircraftHandlingId() != null) {
                    aircraftHandlingService.updateAircraftHandling(trip.getAircraftHandlingId(), serviceUpdates);
                }
                break;
            case "CATERING":
                if (trip.getCateringServiceId() != null) {
                    cateringServiceService.updateCateringService(trip.getCateringServiceId(), serviceUpdates);
                }
                break;
            case "DEICING":
                if (trip.getDeIcingServiceId() != null) {
                    deIcingServiceService.updateDeIcingService(trip.getDeIcingServiceId(), serviceUpdates);
                }
                break;
            case "LAVATORY":
                if (trip.getLavatoryServiceId() != null) {
                    lavatoryServiceService.updateLavatoryService(trip.getLavatoryServiceId(), serviceUpdates);
                }
                break;
            case "RAMP":
                if (trip.getRampServiceId() != null) {
                    rampServiceService.updateRampService(trip.getRampServiceId(), serviceUpdates);
                }
                break;
            case "WATER":
                if (trip.getWaterServiceId() != null) {
                    waterServiceService.updateWaterService(trip.getWaterServiceId(), serviceUpdates);
                }
                break;
            default:
                throw new RuntimeException("Unknown service type: " + serviceType);
        }
    }

    /**
     * Add a new service to an existing trip
     */
    @Transactional
    public MasterTrip addServiceToTrip(String tripId, String serviceType, Object serviceData) {
        MasterTrip trip = masterTripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));

        switch (serviceType.toUpperCase()) {
            case "FUEL":
                FuelService fuel = fuelServiceService.createFuelService((FuelService) serviceData, tripId);
                trip.setFuelServiceId(fuel.getFl_serviceId());
                break;
            case "CREW_CONCIERGE":
                CrewConcierge crew = crewConciergeService.createCrewConcierge((CrewConcierge) serviceData, tripId);
                trip.setCrewConciergeId(crew.getCrc_serviceId());
                break;
            case "PASSENGER_CONCIERGE":
                PassengerConcierge passenger = passengerConciergeService.createPassengerConcierge((PassengerConcierge) serviceData, tripId);
                trip.setPassengerConciergeId(passenger.getPc_serviceId());
                break;
            case "PERMITS":
                PermitsAndClearance permits = permitsAndClearanceService.createPermitsAndClearance((PermitsAndClearance) serviceData, tripId);
                trip.setPermitsAndClearanceId(permits.getPac_serviceId());
                break;
            case "AIRCRAFT_HANDLING":
                AircraftHandling handling = aircraftHandlingService.createAircraftHandling((AircraftHandling) serviceData, tripId);
                trip.setAircraftHandlingId(handling.getAch_serviceId());
                break;
            case "CATERING":
                CateringService catering = cateringServiceService.createCateringService((CateringService) serviceData, tripId);
                trip.setCateringServiceId(catering.getCs_serviceId());
                break;
            case "DEICING":
                DeIcingService deicing = deIcingServiceService.createDeIcingService((DeIcingService) serviceData, tripId);
                trip.setDeIcingServiceId(deicing.getDis_serviceId());
                break;
            case "LAVATORY":
                LavatoryService lavatory = lavatoryServiceService.createLavatoryService((LavatoryService) serviceData, tripId);
                trip.setLavatoryServiceId(lavatory.getLs_serviceId());
                break;
            case "RAMP":
                RampService ramp = rampServiceService.createRampService((RampService) serviceData, tripId);
                trip.setRampServiceId(ramp.getRps_serviceId());
                break;
            case "WATER":
                WaterService water = waterServiceService.createWaterService((WaterService) serviceData, tripId);
                trip.setWaterServiceId(water.getWts_serviceId());
                break;
            default:
                throw new RuntimeException("Unknown service type: " + serviceType);
        }

        return masterTripRepository.save(trip);
    }

    /**
     * Get master trip by ID (basic info only)
     */
    public Optional<MasterTrip> getMasterTripById(String tripId) {
        return masterTripRepository.findById(tripId);
    }

    /**
     * Get master trip with all services populated (DTO)
     */
    public Optional<MasterTripRequest> getMasterTripWithServices(String tripId) {
        return masterTripRepository.findById(tripId)
                .map(trip -> {
                    MasterTripRequest dto = new  MasterTripRequest();
                    dto.setMasterTrip(trip);

                    // Load all services if they exist
                    if (trip.getFuelServiceId() != null) {
                        fuelServiceService.getFuelServiceById(trip.getFuelServiceId())
                                .ifPresent(dto::setFuelService);
                    }

                    if (trip.getCrewConciergeId() != null) {
                        crewConciergeService.getCrewConciergeById(trip.getCrewConciergeId())
                                .ifPresent(dto::setCrewConcierge);
                    }

                    if (trip.getPassengerConciergeId() != null) {
                        passengerConciergeService.getPassengerConciergeById(trip.getPassengerConciergeId())
                                .ifPresent(dto::setPassengerConcierge);
                    }

                    if (trip.getPermitsAndClearanceId() != null) {
                        permitsAndClearanceService.getPermitsAndClearanceById(trip.getPermitsAndClearanceId())
                                .ifPresent(dto::setPermitsAndClearance);
                    }

                    if (trip.getAircraftHandlingId() != null) {
                        aircraftHandlingService.getAircraftHandlingById(trip.getAircraftHandlingId())
                                .ifPresent(dto::setAircraftHandling);
                    }

                    if (trip.getCateringServiceId() != null) {
                        cateringServiceService.getCateringServiceById(trip.getCateringServiceId())
                                .ifPresent(dto::setCateringService);
                    }

                    if (trip.getDeIcingServiceId() != null) {
                        deIcingServiceService.getDeIcingServiceById(trip.getDeIcingServiceId())
                                .ifPresent(dto::setDeIcingService);
                    }

                    if (trip.getLavatoryServiceId() != null) {
                        lavatoryServiceService.getLavatoryServiceById(trip.getLavatoryServiceId())
                                .ifPresent(dto::setLavatoryService);
                    }

                    if (trip.getRampServiceId() != null) {
                        rampServiceService.getRampServiceById(trip.getRampServiceId())
                                .ifPresent(dto::setRampService);
                    }

                    if (trip.getWaterServiceId() != null) {
                        waterServiceService.getWaterServiceById(trip.getWaterServiceId())
                                .ifPresent(dto::setWaterService);
                    }

                    return dto;
                });
    }

    /**
     * Get all master trips for a company
     */
    public List<MasterTrip> getAllMasterTripsByCompany(String companyId) {
        return masterTripRepository.findAllByUxCompanyId(companyId);
    }

    /**
     * Get all master trips
     */
    public List<MasterTrip> getAllMasterTrips() {
        return masterTripRepository.findAll();
    }

    /**
     * Delete master trip and all associated services
     */
    @Transactional
    public void deleteMasterTrip(String tripId) {
        MasterTrip trip = masterTripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));

        // Delete all associated services
        if (trip.getFuelServiceId() != null) {
            fuelServiceService.deleteFuelService(trip.getFuelServiceId());
        }
        if (trip.getCrewConciergeId() != null) {
            crewConciergeService.deleteCrewConcierge(trip.getCrewConciergeId());
        }
        if (trip.getPassengerConciergeId() != null) {
            passengerConciergeService.deletePassengerConcierge(trip.getPassengerConciergeId());
        }
        if (trip.getPermitsAndClearanceId() != null) {
            permitsAndClearanceService.deletePermitsAndClearance(trip.getPermitsAndClearanceId());
        }
        if (trip.getAircraftHandlingId() != null) {
            aircraftHandlingService.deleteAircraftHandling(trip.getAircraftHandlingId());
        }
        if (trip.getCateringServiceId() != null) {
            cateringServiceService.deleteCateringService(trip.getCateringServiceId());
        }
        if (trip.getDeIcingServiceId() != null) {
            deIcingServiceService.deleteDeIcingService(trip.getDeIcingServiceId());
        }
        if (trip.getLavatoryServiceId() != null) {
            lavatoryServiceService.deleteLavatoryService(trip.getLavatoryServiceId());
        }
        if (trip.getRampServiceId() != null) {
            rampServiceService.deleteRampService(trip.getRampServiceId());
        }
        if (trip.getWaterServiceId() != null) {
            waterServiceService.deleteWaterService(trip.getWaterServiceId());
        }

        // Finally delete the trip itself
        masterTripRepository.deleteById(tripId);
    }
}