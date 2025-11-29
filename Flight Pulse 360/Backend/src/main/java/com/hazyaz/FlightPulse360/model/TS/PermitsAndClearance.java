package com.hazyaz.FlightPulse360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Entity
@Data
public class PermitsAndClearance {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String pac_serviceId;



    public String getPrefix() {
        return "TPSRV-PAC";
    }

    private String pac_serviceName;

    private String pac_vendorId;   // FK vendor id
    private String pac_contactPerson;
    private String pac_contactEmail;

    private String pac_permitType;

    private String pac_landingNumber;
    private String pac_landingPermitNumber;

    private String pac_overflightCountries; // comma-separated ISO codes
    private String pac_overflightPermitNumber;

    private String pac_processingFees;
    private String pac_governmentFees;

    private String pac_totalFees;
    private String pac_currency;

    private String pac_applicationDate;
    private String pac_expectedApprovalDate;


    private List<String> pac_documents;
    private String pac_additionalNotes;
    private String pac_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

}

