package com.hazyaz.FlightPulse360.model.TS.GH;

import com.hazyaz.FlightPulse360.model.Vendor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Entity
@Data
public class AircraftHandling {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String ach_serviceId;

    public String getPrefix() {
        return "TPSRV-ACH";
    }

    private String arh_serviceName;

    private String ach_parkingPosition; // Stand number/gate
    private String ach_arrivalTime;
    private String ach_departureTime;
    private String ach_parkingDuration; // in hours

    private String ach_maxTakeoffWeight; // MTOW in kg
    private String ach_hangarNumber;
    private String ach_towingLocation;
    private String ach_parkingChargeType; // HOURLY, DAILY, OVERNIGHT
    private String ach_parkingRate;
    private String ach_parkingNotes;

    private String ach_vendor; // FK to specific vendor

    private String ach_groundFrequency;
    private String ach_groundHandlerName;
    private String ach_groundHandlerContact;
    private String ach_groundHandlerEmail;


    private List<String> ach_documents;
    private String ach_additionalNotes;
    private String ach_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

}
