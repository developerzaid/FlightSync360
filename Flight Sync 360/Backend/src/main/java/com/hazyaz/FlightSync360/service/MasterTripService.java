package com.hazyaz.FlightSync360.service;

import com.hazyaz.FlightSync360.dto.MasterTripRequest;
import com.hazyaz.FlightSync360.model.*;
import com.hazyaz.FlightSync360.model.TS.*;
import com.hazyaz.FlightSync360.model.TS.GH.*;
import com.hazyaz.FlightSync360.repository.*;
import com.hazyaz.FlightSync360.service.Services.*;
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
        trip.setUxCompanyId(request.getMasterTrip().getUxCompanyId());
        trip.setMt_tripNumber(request.getMasterTrip().getMt_tripNumber());
        trip.setMt_flightNumber(request.getMasterTrip().getMt_flightNumber());
        trip.setMt_tripType(request.getMasterTrip().getMt_tripType());
        trip.setMt_purpose(request.getMasterTrip().getMt_purpose());
        trip.setMt_status(request.getMasterTrip().getMt_status());
        trip.setMt_fromAirport(request.getMasterTrip().getMt_fromAirport());
        trip.setMt_toAirport(request.getMasterTrip().getMt_toAirport());
        trip.setMt_scheduledDepartureUtc(request.getMasterTrip().getMt_scheduledDepartureUtc());
        trip.setMt_scheduledDepartureLocal(request.getMasterTrip().getMt_scheduledDepartureLocal());
        trip.setMt_scheduledArrivalUtc(request.getMasterTrip().getMt_scheduledArrivalUtc());
        trip.setMt_scheduledArrivalLocal(request.getMasterTrip().getMt_scheduledArrivalLocal());
        trip.setMt_duration(request.getMasterTrip().getMt_duration());
        trip.setMt_additionalNotes(request.getMasterTrip().getMt_additionalNotes());
        trip.setMt_additionalDocuments(request.getMasterTrip().getMt_additionalDocuments());
        trip.setMt_dispatcherNotes(request.getMasterTrip().getMt_dispatcherNotes());
        trip.setMt_safetyNotes(request.getMasterTrip().getMt_safetyNotes());
        trip.setMt_regulatoryNotes(request.getMasterTrip().getMt_regulatoryNotes());

        // Set linked entities - now using IDs for aircraft, passengers, and crew
        trip.setClientsId(request.getMasterTrip().getClientsId());              // Still Client object
        trip.setAircraftId(request.getMasterTrip().getAircraftId());            // Now just String ID
        trip.setPassengerIds(request.getMasterTrip().getPassengerIds());          // Now List<String> IDs
        trip.setCrewIds(request.getMasterTrip().getCrewIds());                    // Now List<String> IDs

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
                    // Update master trip fields
                    updateMasterTripFields(existing, updates);

                    // Update services
                    updateServices(existing, updates);

                    return masterTripRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));
    }

    private void updateMasterTripFields(MasterTrip trip, Map<String, Object> updates) {
        updates.forEach((key, value) -> {
            switch (key) {
                case "mt_tripNumber": trip.setMt_tripNumber((String) value); break;
                case "mt_flightNumber": trip.setMt_flightNumber((String) value); break;
                case "mt_tripType": trip.setMt_tripType((String) value); break;
                case "mt_purpose": trip.setMt_purpose((String) value); break;
                case "mt_status": trip.setMt_status((String) value); break;
                case "mt_fromAirport": trip.setMt_fromAirport((String) value); break;
                case "mt_toAirport": trip.setMt_toAirport((String) value); break;
                case "mt_scheduledDepartureUtc":
                    trip.setMt_scheduledDepartureUtc((LocalDateTime) value); break;
                case "mt_scheduledDepartureLocal":
                    trip.setMt_scheduledDepartureLocal((LocalDateTime) value); break;
                case "mt_scheduledArrivalUtc":
                    trip.setMt_scheduledArrivalUtc((LocalDateTime) value); break;
                case "mt_scheduledArrivalLocal":
                    trip.setMt_scheduledArrivalLocal((LocalDateTime) value); break;
                case "mt_duration": trip.setMt_duration((String) value); break;
                case "mt_additionalNotes": trip.setMt_additionalNotes((String) value); break;
                case "mt_additionalDocuments": trip.setMt_additionalDocuments((String) value); break;
                case "mt_dispatcherNotes": trip.setMt_dispatcherNotes((String) value); break;
                case "mt_safetyNotes": trip.setMt_safetyNotes((String) value); break;
                case "mt_regulatoryNotes": trip.setMt_regulatoryNotes((String) value); break;
                case "aircraftId": trip.setAircraftId((String) value); break;
                case "clientsId": trip.setClientsId((String) value); break;
                case "uxCompanyId": trip.setUxCompanyId((String) value); break;
                case "passengerIds": trip.setPassengerIds((List<String>) value); break;
                case "crewIds": trip.setCrewIds((List<String>) value); break;
            }
        });
    }

    private void updateServices(MasterTrip trip, Map<String, Object> updates) {
        // Fuel Service
        if (updates.containsKey("fuelService") && trip.getFuelServiceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("fuelService");
            fuelServiceService.updateFuelService(trip.getFuelServiceId(), serviceUpdates);
        }

        // Crew Concierge
        if (updates.containsKey("crewConcierge") && trip.getCrewConciergeId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("crewConcierge");
            crewConciergeService.updateCrewConcierge(trip.getCrewConciergeId(), serviceUpdates);
        }

        // Passenger Concierge
        if (updates.containsKey("passengerConcierge") && trip.getPassengerConciergeId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("passengerConcierge");
            passengerConciergeService.updatePassengerConcierge(trip.getPassengerConciergeId(), serviceUpdates);
        }

        // Permits and Clearance
        if (updates.containsKey("permitsAndClearance") && trip.getPermitsAndClearanceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("permitsAndClearance");
            permitsAndClearanceService.updatePermitsAndClearance(trip.getPermitsAndClearanceId(), serviceUpdates);
        }

        // Aircraft Handling
        if (updates.containsKey("aircraftHandling") && trip.getAircraftHandlingId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("aircraftHandling");
            aircraftHandlingService.updateAircraftHandling(trip.getAircraftHandlingId(), serviceUpdates);
        }

        // Catering Service
        if (updates.containsKey("cateringService") && trip.getCateringServiceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("cateringService");
            cateringServiceService.updateCateringService(trip.getCateringServiceId(), serviceUpdates);
        }

        // De-Icing Service
        if (updates.containsKey("deIcingService") && trip.getDeIcingServiceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("deIcingService");
            deIcingServiceService.updateDeIcingService(trip.getDeIcingServiceId(), serviceUpdates);
        }

        // Lavatory Service
        if (updates.containsKey("lavatoryService") && trip.getLavatoryServiceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("lavatoryService");
            lavatoryServiceService.updateLavatoryService(trip.getLavatoryServiceId(), serviceUpdates);
        }

        // Ramp Service
        if (updates.containsKey("rampService") && trip.getRampServiceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("rampService");
            rampServiceService.updateRampService(trip.getRampServiceId(), serviceUpdates);
        }

        // Water Service
        if (updates.containsKey("waterService") && trip.getWaterServiceId() != null) {
            Map<String, Object> serviceUpdates = (Map<String, Object>) updates.get("waterService");
            waterServiceService.updateWaterService(trip.getWaterServiceId(), serviceUpdates);
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
     * Remove a service from a trip
     */
    @Transactional
    public MasterTrip removeServiceFromTrip(String tripId, String serviceType) {
        MasterTrip trip = masterTripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));

        switch (serviceType.toUpperCase()) {
            case "FUEL":
                if (trip.getFuelServiceId() != null) {
                    fuelServiceService.deleteFuelService(trip.getFuelServiceId());
                    trip.setFuelServiceId(null);
                }
                break;
            case "CREW_CONCIERGE":
                if (trip.getCrewConciergeId() != null) {
                    crewConciergeService.deleteCrewConcierge(trip.getCrewConciergeId());
                    trip.setCrewConciergeId(null);
                }
                break;
            case "PASSENGER_CONCIERGE":
                if (trip.getPassengerConciergeId() != null) {
                    passengerConciergeService.deletePassengerConcierge(trip.getPassengerConciergeId());
                    trip.setPassengerConciergeId(null);
                }
                break;
            case "PERMITS":
                if (trip.getPermitsAndClearanceId() != null) {
                    permitsAndClearanceService.deletePermitsAndClearance(trip.getPermitsAndClearanceId());
                    trip.setPermitsAndClearanceId(null);
                }
                break;
            case "AIRCRAFT_HANDLING":
                if (trip.getAircraftHandlingId() != null) {
                    aircraftHandlingService.deleteAircraftHandling(trip.getAircraftHandlingId());
                    trip.setAircraftHandlingId(null);
                }
                break;
            case "CATERING":
                if (trip.getCateringServiceId() != null) {
                    cateringServiceService.deleteCateringService(trip.getCateringServiceId());
                    trip.setCateringServiceId(null);
                }
                break;
            case "DEICING":
                if (trip.getDeIcingServiceId() != null) {
                    deIcingServiceService.deleteDeIcingService(trip.getDeIcingServiceId());
                    trip.setDeIcingServiceId(null);
                }
                break;
            case "LAVATORY":
                if (trip.getLavatoryServiceId() != null) {
                    lavatoryServiceService.deleteLavatoryService(trip.getLavatoryServiceId());
                    trip.setLavatoryServiceId(null);
                }
                break;
            case "RAMP":
                if (trip.getRampServiceId() != null) {
                    rampServiceService.deleteRampService(trip.getRampServiceId());
                    trip.setRampServiceId(null);
                }
                break;
            case "WATER":
                if (trip.getWaterServiceId() != null) {
                    waterServiceService.deleteWaterService(trip.getWaterServiceId());
                    trip.setWaterServiceId(null);
                }
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
                    MasterTripRequest dto = new MasterTripRequest();
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
     * Get trips by status
     */
//    public List<MasterTrip> getTripsByStatus(String status) {
//        return masterTripRepository.findAllByt_status(status);
//    }

    /**
     * Get trips by status for a company
     */
//    public List<MasterTrip> getTripsByCompanyAndStatus(String companyId, String status) {
//        return masterTripRepository.findAllByUxCompanyIdAndMt_status(companyId, status);
//    }

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

    /**
     * Get service details for a specific trip
     */
    public Object getServiceDetails(String tripId, String serviceType) {
        MasterTrip trip = masterTripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Master trip not found: " + tripId));

        switch (serviceType.toUpperCase()) {
            case "FUEL":
                return trip.getFuelServiceId() != null
                        ? fuelServiceService.getFuelServiceById(trip.getFuelServiceId()).orElse(null)
                        : null;
            case "CREW_CONCIERGE":
                return trip.getCrewConciergeId() != null
                        ? crewConciergeService.getCrewConciergeById(trip.getCrewConciergeId()).orElse(null)
                        : null;
            case "PASSENGER_CONCIERGE":
                return trip.getPassengerConciergeId() != null
                        ? passengerConciergeService.getPassengerConciergeById(trip.getPassengerConciergeId()).orElse(null)
                        : null;
            case "PERMITS":
                return trip.getPermitsAndClearanceId() != null
                        ? permitsAndClearanceService.getPermitsAndClearanceById(trip.getPermitsAndClearanceId()).orElse(null)
                        : null;
            case "AIRCRAFT_HANDLING":
                return trip.getAircraftHandlingId() != null
                        ? aircraftHandlingService.getAircraftHandlingById(trip.getAircraftHandlingId()).orElse(null)
                        : null;
            case "CATERING":
                return trip.getCateringServiceId() != null
                        ? cateringServiceService.getCateringServiceById(trip.getCateringServiceId()).orElse(null)
                        : null;
            case "DEICING":
                return trip.getDeIcingServiceId() != null
                        ? deIcingServiceService.getDeIcingServiceById(trip.getDeIcingServiceId()).orElse(null)
                        : null;
            case "LAVATORY":
                return trip.getLavatoryServiceId() != null
                        ? lavatoryServiceService.getLavatoryServiceById(trip.getLavatoryServiceId()).orElse(null)
                        : null;
            case "RAMP":
                return trip.getRampServiceId() != null
                        ? rampServiceService.getRampServiceById(trip.getRampServiceId()).orElse(null)
                        : null;
            case "WATER":
                return trip.getWaterServiceId() != null
                        ? waterServiceService.getWaterServiceById(trip.getWaterServiceId()).orElse(null)
                        : null;
            default:
                throw new RuntimeException("Unknown service type: " + serviceType);
        }
    }
}