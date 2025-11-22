package com.hazyaz.FlightPulse360.model.TS;

import java.time.LocalDateTime;

public class AircraftCleaning {


    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;
    // Status & Tracking

    // Cleaning Services
    private String cleaningType; // TRANSIT, OVERNIGHT, DEEP_CLEAN, EXTERIOR
    private Boolean interiorCleaning;
    private Boolean exteriorCleaning;
    private Integer numberOfSeats; // Usually 4-19 seats
    private Boolean galleyCleaning;
    private Boolean lavatoryCleaning;
    private Boolean cockpitCleaning;
    private Boolean windowCleaning;
    private LocalDateTime cleaningStartTime;
    private Integer cleaningDuration; // minutes
    private String cleaningCharge;
    private String cleaningNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}


}
