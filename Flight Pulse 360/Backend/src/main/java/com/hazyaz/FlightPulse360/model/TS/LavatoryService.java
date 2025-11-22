package com.hazyaz.FlightPulse360.model.TS;

public class LavatoryService {
    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // Lavatory Operations
    private Boolean lavaServiceRequired;
    private Integer numberOfLavatories; // Usually 1-2 for private jets
    private String serviceType; // EMPTY_ONLY, FULL_SERVICE
    private String serviceTime;
    private String serviceCharge;
    private String lavaServiceNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

}
