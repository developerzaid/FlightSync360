package com.hazyaz.FlightSync360.model.TS.GH;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Entity
public class AircraftHandling {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
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

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getAch_serviceId() {
        return ach_serviceId;
    }

    public void setAch_serviceId(String ach_serviceId) {
        this.ach_serviceId = ach_serviceId;
    }

    public String getArh_serviceName() {
        return arh_serviceName;
    }

    public void setArh_serviceName(String arh_serviceName) {
        this.arh_serviceName = arh_serviceName;
    }

    public String getAch_parkingPosition() {
        return ach_parkingPosition;
    }

    public void setAch_parkingPosition(String ach_parkingPosition) {
        this.ach_parkingPosition = ach_parkingPosition;
    }

    public String getAch_arrivalTime() {
        return ach_arrivalTime;
    }

    public void setAch_arrivalTime(String ach_arrivalTime) {
        this.ach_arrivalTime = ach_arrivalTime;
    }

    public String getAch_departureTime() {
        return ach_departureTime;
    }

    public void setAch_departureTime(String ach_departureTime) {
        this.ach_departureTime = ach_departureTime;
    }

    public String getAch_parkingDuration() {
        return ach_parkingDuration;
    }

    public void setAch_parkingDuration(String ach_parkingDuration) {
        this.ach_parkingDuration = ach_parkingDuration;
    }

    public String getAch_maxTakeoffWeight() {
        return ach_maxTakeoffWeight;
    }

    public void setAch_maxTakeoffWeight(String ach_maxTakeoffWeight) {
        this.ach_maxTakeoffWeight = ach_maxTakeoffWeight;
    }

    public String getAch_hangarNumber() {
        return ach_hangarNumber;
    }

    public void setAch_hangarNumber(String ach_hangarNumber) {
        this.ach_hangarNumber = ach_hangarNumber;
    }

    public String getAch_towingLocation() {
        return ach_towingLocation;
    }

    public void setAch_towingLocation(String ach_towingLocation) {
        this.ach_towingLocation = ach_towingLocation;
    }

    public String getAch_parkingChargeType() {
        return ach_parkingChargeType;
    }

    public void setAch_parkingChargeType(String ach_parkingChargeType) {
        this.ach_parkingChargeType = ach_parkingChargeType;
    }

    public String getAch_parkingRate() {
        return ach_parkingRate;
    }

    public void setAch_parkingRate(String ach_parkingRate) {
        this.ach_parkingRate = ach_parkingRate;
    }

    public String getAch_parkingNotes() {
        return ach_parkingNotes;
    }

    public void setAch_parkingNotes(String ach_parkingNotes) {
        this.ach_parkingNotes = ach_parkingNotes;
    }

    public String getAch_vendor() {
        return ach_vendor;
    }

    public void setAch_vendor(String ach_vendor) {
        this.ach_vendor = ach_vendor;
    }

    public String getAch_groundFrequency() {
        return ach_groundFrequency;
    }

    public void setAch_groundFrequency(String ach_groundFrequency) {
        this.ach_groundFrequency = ach_groundFrequency;
    }

    public String getAch_groundHandlerName() {
        return ach_groundHandlerName;
    }

    public void setAch_groundHandlerName(String ach_groundHandlerName) {
        this.ach_groundHandlerName = ach_groundHandlerName;
    }

    public String getAch_groundHandlerContact() {
        return ach_groundHandlerContact;
    }

    public void setAch_groundHandlerContact(String ach_groundHandlerContact) {
        this.ach_groundHandlerContact = ach_groundHandlerContact;
    }

    public String getAch_groundHandlerEmail() {
        return ach_groundHandlerEmail;
    }

    public void setAch_groundHandlerEmail(String ach_groundHandlerEmail) {
        this.ach_groundHandlerEmail = ach_groundHandlerEmail;
    }

    public List<String> getAch_documents() {
        return ach_documents;
    }

    public void setAch_documents(List<String> ach_documents) {
        this.ach_documents = ach_documents;
    }

    public String getAch_additionalNotes() {
        return ach_additionalNotes;
    }

    public void setAch_additionalNotes(String ach_additionalNotes) {
        this.ach_additionalNotes = ach_additionalNotes;
    }

    public String getAch_serviceStatus() {
        return ach_serviceStatus;
    }

    public void setAch_serviceStatus(String ach_serviceStatus) {
        this.ach_serviceStatus = ach_serviceStatus;
    }
}
