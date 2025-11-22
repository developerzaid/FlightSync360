package com.hazyaz.FlightPulse360.model.TS;

import java.time.LocalDateTime;

public class WaterService {
    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // Potable Water Service
    private Boolean waterServiceRequired;
    private Double waterVolume; // liters (usually 50-200L for private jets)
    private LocalDateTime serviceTime;
    private String serviceCharge;
    private String waterServiceNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}
}
