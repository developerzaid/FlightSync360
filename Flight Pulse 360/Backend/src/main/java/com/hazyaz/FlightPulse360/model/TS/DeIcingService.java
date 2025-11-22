package com.hazyaz.FlightPulse360.model.TS;

import java.time.LocalDateTime;

public class DeIcingService {
    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // De-icing Operations (Winter only)
    private Boolean deicingRequired;
    private String fluidType; // TYPE_I, TYPE_IV
    private Double fluidQuantity; // liters
    private Double outsideTemperature; // Celsius
    private LocalDateTime deicingTime;
    private Integer deicingDuration;
    private String deicingCharge;
    private String deicingNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}
}
