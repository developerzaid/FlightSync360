package com.hazyaz.FlightPulse360.model.TS.GH;

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
public class WaterService {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String wts_serviceId;

    public String getPrefix() {
        return "TPSRV-WTS";
    }

    private String wts_serviceName;

    private String wts_vendor; // FK to specific vendor
    // Potable Water Service
    private Boolean wts_waterServiceRequired;
    private Double wts_waterVolume; // liters (usually 50-200L for private jets)
    private LocalDateTime wts_serviceTime;
    private String wts_serviceCharge;
    private String wts_waterServiceNotes;

    private List<String> wts_documents;
    private String wts_additionalNotes;
    private String wts_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String wts_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}
}
