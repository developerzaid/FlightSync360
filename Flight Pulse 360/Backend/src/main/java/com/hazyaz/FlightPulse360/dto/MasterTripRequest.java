package com.hazyaz.FlightPulse360.dto;

import com.hazyaz.FlightPulse360.model.*;
import com.hazyaz.FlightPulse360.model.TS.*;
import com.hazyaz.FlightPulse360.model.TS.GH.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


public class MasterTripRequest {

        // ---------- FIELDS ----------
        private MasterTrip masterTrip;

        private String uxCompanyId;
        private String mt_tripNumber;
        private String mt_flightNumber;
        private String mt_tripType;
        private String mt_purpose;
        private String mt_status;
        private String mt_fromAirport;
        private String mt_toAirport;
        private LocalDateTime mt_scheduledDepartureUtc;
        private LocalDateTime mt_scheduledDepartureLocal;
        private LocalDateTime mt_scheduledArrivalUtc;
        private LocalDateTime mt_scheduledArrivalLocal;
        private String mt_duration;

        private Client clients;
        private List<Passenger> passenger;
        private List<Crew> crew;
        private Aircraft aircraft;

        private FuelService fuelService;
        private CrewConcierge crewConcierge;
        private PassengerConcierge passengerConcierge;
        private PermitsAndClearance permitsAndClearance;
        private AircraftHandling aircraftHandling;
        private CateringService cateringService;
        private DeIcingService deIcingService;
        private LavatoryService lavatoryService;
        private RampService rampService;
        private WaterService waterService;

        private String mt_additionalNotes;
        private String mt_additionalDocuments;
        private String mt_dispatcherNotes;
        private String mt_safetyNotes;
        private String mt_regulatoryNotes;

    public MasterTrip getMasterTrip() {
        return masterTrip;
    }

    public void setMasterTrip(MasterTrip masterTrip) {
        this.masterTrip = masterTrip;
    }

    public String getUxCompanyId() {
        return uxCompanyId;
    }

    public void setUxCompanyId(String uxCompanyId) {
        this.uxCompanyId = uxCompanyId;
    }

    public String getMt_tripNumber() {
        return mt_tripNumber;
    }

    public void setMt_tripNumber(String mt_tripNumber) {
        this.mt_tripNumber = mt_tripNumber;
    }

    public String getMt_flightNumber() {
        return mt_flightNumber;
    }

    public void setMt_flightNumber(String mt_flightNumber) {
        this.mt_flightNumber = mt_flightNumber;
    }

    public String getMt_tripType() {
        return mt_tripType;
    }

    public void setMt_tripType(String mt_tripType) {
        this.mt_tripType = mt_tripType;
    }

    public String getMt_purpose() {
        return mt_purpose;
    }

    public void setMt_purpose(String mt_purpose) {
        this.mt_purpose = mt_purpose;
    }

    public String getMt_status() {
        return mt_status;
    }

    public void setMt_status(String mt_status) {
        this.mt_status = mt_status;
    }

    public String getMt_fromAirport() {
        return mt_fromAirport;
    }

    public void setMt_fromAirport(String mt_fromAirport) {
        this.mt_fromAirport = mt_fromAirport;
    }

    public String getMt_toAirport() {
        return mt_toAirport;
    }

    public void setMt_toAirport(String mt_toAirport) {
        this.mt_toAirport = mt_toAirport;
    }

    public LocalDateTime getMt_scheduledDepartureUtc() {
        return mt_scheduledDepartureUtc;
    }

    public void setMt_scheduledDepartureUtc(LocalDateTime mt_scheduledDepartureUtc) {
        this.mt_scheduledDepartureUtc = mt_scheduledDepartureUtc;
    }

    public LocalDateTime getMt_scheduledDepartureLocal() {
        return mt_scheduledDepartureLocal;
    }

    public void setMt_scheduledDepartureLocal(LocalDateTime mt_scheduledDepartureLocal) {
        this.mt_scheduledDepartureLocal = mt_scheduledDepartureLocal;
    }

    public LocalDateTime getMt_scheduledArrivalUtc() {
        return mt_scheduledArrivalUtc;
    }

    public void setMt_scheduledArrivalUtc(LocalDateTime mt_scheduledArrivalUtc) {
        this.mt_scheduledArrivalUtc = mt_scheduledArrivalUtc;
    }

    public LocalDateTime getMt_scheduledArrivalLocal() {
        return mt_scheduledArrivalLocal;
    }

    public void setMt_scheduledArrivalLocal(LocalDateTime mt_scheduledArrivalLocal) {
        this.mt_scheduledArrivalLocal = mt_scheduledArrivalLocal;
    }

    public String getMt_duration() {
        return mt_duration;
    }

    public void setMt_duration(String mt_duration) {
        this.mt_duration = mt_duration;
    }

    public Client getClients() {
        return clients;
    }

    public void setClients(Client clients) {
        this.clients = clients;
    }

    public List<Passenger> getPassenger() {
        return passenger;
    }

    public void setPassenger(List<Passenger> passenger) {
        this.passenger = passenger;
    }

    public List<Crew> getCrew() {
        return crew;
    }

    public void setCrew(List<Crew> crew) {
        this.crew = crew;
    }

    public Aircraft getAircraft() {
        return aircraft;
    }

    public void setAircraft(Aircraft aircraft) {
        this.aircraft = aircraft;
    }

    public FuelService getFuelService() {
        return fuelService;
    }

    public void setFuelService(FuelService fuelService) {
        this.fuelService = fuelService;
    }

    public CrewConcierge getCrewConcierge() {
        return crewConcierge;
    }

    public void setCrewConcierge(CrewConcierge crewConcierge) {
        this.crewConcierge = crewConcierge;
    }

    public PassengerConcierge getPassengerConcierge() {
        return passengerConcierge;
    }

    public void setPassengerConcierge(PassengerConcierge passengerConcierge) {
        this.passengerConcierge = passengerConcierge;
    }

    public PermitsAndClearance getPermitsAndClearance() {
        return permitsAndClearance;
    }

    public void setPermitsAndClearance(PermitsAndClearance permitsAndClearance) {
        this.permitsAndClearance = permitsAndClearance;
    }

    public AircraftHandling getAircraftHandling() {
        return aircraftHandling;
    }

    public void setAircraftHandling(AircraftHandling aircraftHandling) {
        this.aircraftHandling = aircraftHandling;
    }

    public CateringService getCateringService() {
        return cateringService;
    }

    public void setCateringService(CateringService cateringService) {
        this.cateringService = cateringService;
    }

    public DeIcingService getDeIcingService() {
        return deIcingService;
    }

    public void setDeIcingService(DeIcingService deIcingService) {
        this.deIcingService = deIcingService;
    }

    public LavatoryService getLavatoryService() {
        return lavatoryService;
    }

    public void setLavatoryService(LavatoryService lavatoryService) {
        this.lavatoryService = lavatoryService;
    }

    public RampService getRampService() {
        return rampService;
    }

    public void setRampService(RampService rampService) {
        this.rampService = rampService;
    }

    public WaterService getWaterService() {
        return waterService;
    }

    public void setWaterService(WaterService waterService) {
        this.waterService = waterService;
    }

    public String getMt_additionalNotes() {
        return mt_additionalNotes;
    }

    public void setMt_additionalNotes(String mt_additionalNotes) {
        this.mt_additionalNotes = mt_additionalNotes;
    }

    public String getMt_additionalDocuments() {
        return mt_additionalDocuments;
    }

    public void setMt_additionalDocuments(String mt_additionalDocuments) {
        this.mt_additionalDocuments = mt_additionalDocuments;
    }

    public String getMt_dispatcherNotes() {
        return mt_dispatcherNotes;
    }

    public void setMt_dispatcherNotes(String mt_dispatcherNotes) {
        this.mt_dispatcherNotes = mt_dispatcherNotes;
    }

    public String getMt_safetyNotes() {
        return mt_safetyNotes;
    }

    public void setMt_safetyNotes(String mt_safetyNotes) {
        this.mt_safetyNotes = mt_safetyNotes;
    }

    public String getMt_regulatoryNotes() {
        return mt_regulatoryNotes;
    }

    public void setMt_regulatoryNotes(String mt_regulatoryNotes) {
        this.mt_regulatoryNotes = mt_regulatoryNotes;
    }
}