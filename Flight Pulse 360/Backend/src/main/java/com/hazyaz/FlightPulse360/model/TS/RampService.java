package com.hazyaz.FlightPulse360.model.TS;

import java.math.BigDecimal;

public class RampService {
    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    private Boolean pushbackRequired;
    private Boolean gpuRequired; // Ground Power Unit
    private Integer gpuDuration; // minutes
    private BigDecimal gpuChargePerHour;
    private Boolean acuRequired; // Air Conditioning Unit
    private Integer acuDuration;
    private BigDecimal acuChargePerHour;
    private Boolean chalksAndCones;
    private Boolean towingRequired;
    private String towingFromLocation;
    private String towingToLocation;
    private String rampEquipmentNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

}
