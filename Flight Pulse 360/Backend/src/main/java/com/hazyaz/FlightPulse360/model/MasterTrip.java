package com.hazyaz.FlightPulse360.model;

import com.hazyaz.FlightPulse360.model.TS.CrewConcierge;
import com.hazyaz.FlightPulse360.model.TS.FuelService;
import com.hazyaz.FlightPulse360.model.TS.GH.*;
import com.hazyaz.FlightPulse360.model.TS.PassengerConcierge;
import com.hazyaz.FlightPulse360.model.TS.PermitsAndClearance;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class MasterTrip {

        @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
        @JoinColumn(name = "aircraft_id")
        private Aircraft aircraft;

        // Same for Client
        @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
        @JoinColumn(name = "client_id")
        private Client clients;

        // Keep ALL for owned collections
        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "trip_id")
        private List<Passenger> passenger;

        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "trip_id")
        private List<Crew> crew;


        @Id
        @GeneratedValue(generator = "Id-Generator")
        @GenericGenerator(name = "Id-Generator",
                strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
        private String uxTripId;

        private String uxCompanyId;       // company-level filter

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




        // ... rest of code


        //---------SERVICE REF ID ----------------
        // Store just the service IDs - services live in their own tables
        private String crewConciergeId;        // References CrewConcierge.crc_serviceId
        private String fuelServiceId;          // References FuelService.fl_serviceId
        private String passengerConciergeId;   // References PassengerConcierge.pc_serviceId
        private String permitsAndClearanceId;  // References PermitsAndClearance.pac_serviceId
        private String aircraftHandlingId;     // References AircraftHandling.ach_serviceId
        private String cateringServiceId;      // References CateringService.cs_serviceId
        private String deIcingServiceId;       // References DeIcingService.dis_serviceId
        private String lavatoryServiceId;      // References LavatoryService.ls_serviceId
        private String rampServiceId;          // References RampService.rps_serviceId
        private String waterServiceId;         // References WaterService.wts_serviceId


        // ---------- SERVICES ----------
        private String mt_additionalNotes;
        private String mt_additionalDocuments;
        private String mt_dispatcherNotes;
        private String mt_safetyNotes;
        private String mt_regulatoryNotes;

        public String getPrefix() {
                return "MSTR";
        }

        public String getUxTripId() {
                return uxTripId;
        }

        public void setUxTripId(String uxTripId) {
                this.uxTripId = uxTripId;
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

        public String getCrewConciergeId() {
                return crewConciergeId;
        }

        public void setCrewConciergeId(String crewConciergeId) {
                this.crewConciergeId = crewConciergeId;
        }

        public String getFuelServiceId() {
                return fuelServiceId;
        }

        public void setFuelServiceId(String fuelServiceId) {
                this.fuelServiceId = fuelServiceId;
        }

        public String getPassengerConciergeId() {
                return passengerConciergeId;
        }

        public void setPassengerConciergeId(String passengerConciergeId) {
                this.passengerConciergeId = passengerConciergeId;
        }

        public String getPermitsAndClearanceId() {
                return permitsAndClearanceId;
        }

        public void setPermitsAndClearanceId(String permitsAndClearanceId) {
                this.permitsAndClearanceId = permitsAndClearanceId;
        }

        public String getAircraftHandlingId() {
                return aircraftHandlingId;
        }

        public void setAircraftHandlingId(String aircraftHandlingId) {
                this.aircraftHandlingId = aircraftHandlingId;
        }

        public String getCateringServiceId() {
                return cateringServiceId;
        }

        public void setCateringServiceId(String cateringServiceId) {
                this.cateringServiceId = cateringServiceId;
        }

        public String getDeIcingServiceId() {
                return deIcingServiceId;
        }

        public void setDeIcingServiceId(String deIcingServiceId) {
                this.deIcingServiceId = deIcingServiceId;
        }

        public String getLavatoryServiceId() {
                return lavatoryServiceId;
        }

        public void setLavatoryServiceId(String lavatoryServiceId) {
                this.lavatoryServiceId = lavatoryServiceId;
        }

        public String getRampServiceId() {
                return rampServiceId;
        }

        public void setRampServiceId(String rampServiceId) {
                this.rampServiceId = rampServiceId;
        }

        public String getWaterServiceId() {
                return waterServiceId;
        }

        public void setWaterServiceId(String waterServiceId) {
                this.waterServiceId = waterServiceId;
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
