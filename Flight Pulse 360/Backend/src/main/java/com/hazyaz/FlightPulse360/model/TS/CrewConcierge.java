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
public class CrewConcierge {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String crc_serviceId;

    public String getPrefix() {
        return "TPSRV-CRC";
    }

    private String crc_serviceName;

    // Crew Members
    private Integer crc_totalCrewMembers;
    private Integer crc_pilots;
    private Integer crc_flightAttendants;

    // Hotel Arrangements
    private String crc_hotelName;
    private String crc_hotelAddress;
    private String crc_hotelContactNumber;
    private Integer crc_roomsRequired;
    private LocalDateTime crc_hotelCheckIn;
    private LocalDateTime crc_hotelCheckOut;
    private Integer crc_numberOfNights;

    // Crew Transportation
    private String crc_transportType; // VAN, SEDAN
    private String crc_transportProvider;
    private String crc_driverName;
    private String crc_driverContact;

    // Airport to Hotel
    private LocalDateTime crc_pickupTimeFromAirport;
    private String crc_pickupLocationAirport;

    // Hotel to Airport
    private LocalDateTime crc_pickupTimeFromHotel;

    private List<String> vn_documents;
    private String crc_additionalNotes;
    private String crc_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

}
