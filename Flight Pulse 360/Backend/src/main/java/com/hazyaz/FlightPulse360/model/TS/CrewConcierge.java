package com.hazyaz.FlightPulse360.model.TS;

import java.time.LocalDateTime;

public class CrewConcierge {

    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // Crew Members
    private Integer totalCrewMembers;
    private Integer pilots;
    private Integer flightAttendants;

    // Hotel Arrangements
    private Boolean crewHotelRequired;
    private String hotelName;
    private String hotelAddress;
    private String hotelContactNumber;
    private Integer roomsRequired;
    private LocalDateTime hotelCheckIn;
    private LocalDateTime hotelCheckOut;
    private Integer numberOfNights;
    private String roomType; // STANDARD, DELUXE
    private Boolean breakfastIncluded;
    private String hotelCostPerRoom;
    private String totalHotelCost;

    // Crew Transportation
    private Boolean crewTransportRequired;
    private String transportType; // VAN, SEDAN
    private String transportProvider;
    private String driverName;
    private String driverContact;

    // Airport to Hotel
    private Boolean airportToHotelTransport;
    private LocalDateTime pickupTimeFromAirport;
    private String pickupLocationAirport; // FBO location

    // Hotel to Airport
    private Boolean hotelToAirportTransport;
    private LocalDateTime pickupTimeFromHotel;

    private String transportCost;
    private String totalConciergeCost;
    private String conciergeNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}


}
