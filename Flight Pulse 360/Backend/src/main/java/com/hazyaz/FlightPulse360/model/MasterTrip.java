package com.hazyaz.FlightPulse360.model;

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
        private String mt_tripType;
        private String mt_purpose;
        private String mt_status;

        private String mt_fromAirport;
        private String mt_toAirport;

        private LocalDateTime mt_scheduledDepartureUtc;
        private LocalDateTime mt_scheduledDepartureLocal;
        private LocalDateTime mt_scheduledArrivalUtc;
        private LocalDateTime mt_scheduledArrivalLocal;

        private String mt_departureTimezone;
        private String mt_arrivalTimezone;

        // ---------- MULTI LEG ----------
//        @OneToMany(cascade = CascadeType.ALL)
//        @JoinColumn(name = "uxTripId")
//        private List<TripLeg> mt_legs;

        // ---------- LINKED OBJECTS ----------
        @ManyToOne(cascade = CascadeType.ALL)
        private Client client;

        @ManyToOne(cascade = CascadeType.ALL)
        private Aircraft aircraft;

        @OneToMany(cascade = CascadeType.ALL)
        private List<Client> clients;

        @OneToMany(cascade = CascadeType.ALL)
        private List<Crew> crew;

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
