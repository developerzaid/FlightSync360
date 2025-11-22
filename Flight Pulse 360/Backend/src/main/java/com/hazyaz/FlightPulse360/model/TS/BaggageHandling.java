package com.hazyaz.FlightPulse360.model.TS;

public class BaggageHandling {


    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // Baggage Operations
    // Baggage Operations (Simple for private jets)
    private Integer totalBaggagePieces;
    private Double totalBaggageWeight; // kg
    private Integer oversizedBaggage; // golf clubs, skis, etc.
    private String specialBaggage; // sports equipment, musical instruments, pets
    private Boolean directAircraftLoading; // no belt loaders
    private String baggageHandlingNotes;


    private String ach_createdAt;
    private String ach_createdBy;
    private String ach_lastModifiedAt;
    private String ach_lastModifiedBy;
    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}


}
