package com.hazyaz.FlightPulse360.model.TS.GH;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
public class RampService {



    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String rps_serviceId;

    public String getPrefix() {
        return "TPSRV-RPS";
    }

    private String rps_serviceName;

    private String rps_groundHandlingServiceId; // FK to main TS service
    private String rps_serviceRequestId; // FK to main service request

    private String rps_vendor; // FK to specific vendor

    private Integer rps_gpuDuration; // minutes
    private BigDecimal rps_gpuChargePerHour;
    private Integer rps_acuDuration;
    private BigDecimal rps_acuChargePerHour;
    private Boolean rps_chalksAndCones;
    private Boolean rps_towingRequired;
    private String rps_towingFromLocation;
    private String rps_towingToLocation;
    private String rps_rampEquipmentNotes;

    private List<String> rps_documents;
    private String rps_additionalNotes;
    private String rps_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String rps_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}
}
