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
public class DeIcingService {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String dis_serviceId;

    public String getPrefix() {
        return "TPSRV-DIS";
    }

    private String dis_vendor; // FK to specific vendor
    private String dis_serviceName;
    // De-icing Operations (Winter only)
    private String dis_fluidType; // TYPE_I, TYPE_IV
    private Double dis_fluidQuantity; // liters
    private Double dis_outsideTemperature; // Celsius
    private LocalDateTime dis_deicingTime;
    private Integer dis_deicingDuration;

    private List<String> dis_documents;
    private String dis_additionalNotes;
    private String dis_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
}
