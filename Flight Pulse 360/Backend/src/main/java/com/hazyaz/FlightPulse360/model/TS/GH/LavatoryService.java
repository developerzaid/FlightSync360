package com.hazyaz.FlightPulse360.model.TS.GH;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
@Entity
@Data
public class LavatoryService {


    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String ls_serviceId;

    public String getPrefix() {
        return "TPSRV-LS";
    }

    private String ls_serviceName;
private String ls_vendor; // FK to specific vendor
    // Lavatory Operations
    private Boolean ls_lavaServiceRequired;
    private Integer ls_numberOfLavatories; // Usually 1-2 for private jets
    private String ls_serviceType; // EMPTY_ONLY, FULL_SERVICE
    private String ls_serviceTime;
    private String ls_lavaServiceNotes;

    private List<String> ls_documents;
    private String ls_additionalNotes;
    private String ls_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String ls_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

}
