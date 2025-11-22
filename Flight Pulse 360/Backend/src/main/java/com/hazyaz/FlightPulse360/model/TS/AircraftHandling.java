package com.hazyaz.FlightPulse360.model.TS;

import com.hazyaz.FlightPulse360.model.Vendor;

import java.util.List;

public class AircraftHandling {


    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;
    // Status & Tracking


    private String ach_id;

    private String ach_parkingPosition; // Stand number/gate
    private String ach_arrivalTime;
    private String ach_departureTime;
    private String ach_parkingDuration; // in hours

    // #ach_aircraftType
    // #ach_aircraftRegistration

    private String maxTakeoffWeight; // MTOW in kg
    private String hangarNumber;
    private String towingLocation;
    private String parkingChargeType; // HOURLY, DAILY, OVERNIGHT
    private String parkingRate;
    private String parkingNotes;

    private List<String> ach_documents;
    private String ach_additionalNotes;

    private Vendor ach_vendor; // FK to specific vendor

    private String ach_groundFrequency;
    private String ach_groundHandlerName;
    private String ach_groundHandlerContact;
    private String ach_groundHandlerEmail;

    private String ach_createdAt;
    private String ach_createdBy;
    private String ach_lastModifiedAt;
    private String ach_lastModifiedBy;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

}
