package com.hazyaz.FlightPulse360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Data
public class PassengerConcierge {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String pc_serviceId;

    public String getPrefix() {
        return "TPSRV-PC";
    }
    private String pc_serviceName;

    // Passenger Ground Transportation
    private Integer pc_passengersRequiringTransport;
    private String pc_transportDestination; // hotel, residence, office, meeting venue
    private String pc_transportType; // LUXURY_SEDAN, LIMOUSINE, SUV, VAN, HELICOPTER

    private String pc_transportProvider;
    private String pc_chauffeurName;
    private String pc_chauffeurContact;
    private String pc_vehicleType; // Mercedes S-Class, Range Rover, etc.
    private LocalDateTime pc_pickupTime;
    private String pc_pickupLocation;


    // Passenger Hotel (if arranging)
    private String pc_passengerHotelName;
    private String pc_passengerHotelAddress;
    private Integer pc_passengerRoomsRequired;
    private LocalDateTime pc_passengerCheckIn;
    private LocalDateTime pc_passengerCheckOut;
    private String pc_passengerRoomType; // SUITE, PRESIDENTIAL, DELUXE


    private List<String> pc_documents;
    private String pc_additionalNotes;
    private String pc_status; // processing, ongoing  {This is for ops team}
    private String pc_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

}
