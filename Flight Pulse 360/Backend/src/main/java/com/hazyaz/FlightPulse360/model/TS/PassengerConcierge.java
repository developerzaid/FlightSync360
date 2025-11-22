package com.hazyaz.FlightPulse360.model.TS;

import java.time.LocalDateTime;

public class PassengerConcierge {

    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // Passenger Ground Transportation
    private Boolean passengerTransportRequired;
    private Integer passengersRequiringTransport;
    private String transportDestination; // hotel, residence, office, meeting venue
    private String transportType; // LUXURY_SEDAN, LIMOUSINE, SUV, VAN, HELICOPTER
    private Integer vehiclesRequired;
    private String transportProvider;
    private String chauffeurName;
    private String chauffeurContact;
    private String vehicleType; // Mercedes S-Class, Range Rover, etc.
    private LocalDateTime pickupTime;
    private String pickupLocation;
    private String transportCost;

    // Passenger Hotel (if arranging)
    private Boolean passengerHotelRequired;
    private String passengerHotelName;
    private String passengerHotelAddress;
    private Integer passengerRoomsRequired;
    private LocalDateTime passengerCheckIn;
    private LocalDateTime passengerCheckOut;
    private String passengerRoomType; // SUITE, PRESIDENTIAL, DELUXE
    private String passengerHotelCost;

    // VIP Services
    private Boolean vipMeetAndGreet;
    private String vipGreeterName;
    private Boolean redCarpetService;
    private Boolean photographyService;
    private Boolean securityEscort;
    private Boolean airportLoungeAccess;

    // Additional Concierge
    private Boolean restaurantReservations;
    private String restaurantDetails;
    private Boolean eventTickets;
    private String eventDetails;
    private Boolean translatorRequired;
    private String translatorLanguages;
    private String specialRequests;
    private String passengerConciergeCost;
    private String passengerConciergeNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

}
