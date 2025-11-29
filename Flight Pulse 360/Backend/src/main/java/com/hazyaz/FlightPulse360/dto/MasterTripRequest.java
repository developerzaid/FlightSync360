package com.hazyaz.FlightPulse360.dto;

import com.hazyaz.FlightPulse360.model.*;
import com.hazyaz.FlightPulse360.model.TS.*;
import com.hazyaz.FlightPulse360.model.TS.GH.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
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

    }