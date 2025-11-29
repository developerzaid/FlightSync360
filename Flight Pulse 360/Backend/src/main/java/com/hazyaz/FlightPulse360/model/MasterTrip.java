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
@Data
public class MasterTrip {


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

        // ---------- MULTI LEG ----------
//        @OneToMany(cascade = CascadeType.ALL)
//        @JoinColumn(name = "uxTripId")
//        private List<TripLeg> mt_legs;

        // ---------- LINKED OBJECTS ----------

        @ManyToOne(cascade = CascadeType.ALL)
        private Client clients;

        @OneToMany(cascade = CascadeType.ALL)
        private List<Passenger> passenger;

        @OneToMany(cascade = CascadeType.ALL)
        private List<Crew> crew;

        @ManyToOne(cascade = CascadeType.ALL)
        private Aircraft aircraft;


        // ---------- SERVICES ----------

//        @ManyToOne(cascade = CascadeType.ALL)
//        private CrewConcierge crewConcierge;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private FuelService fuelService;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private PassengerConcierge passengerConcierge;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private PermitsAndClearance permitsAndClearance;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private AircraftHandling aircraftHandling;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private CateringService cateringService;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private DeIcingService deIcingService;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private LavatoryService lavatoryService;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private RampService rampService;
//
//        @ManyToOne(cascade = CascadeType.ALL)
//        private WaterService waterService;

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
}
