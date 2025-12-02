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

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getWts_serviceId() {
        return wts_serviceId;
    }

    public void setWts_serviceId(String wts_serviceId) {
        this.wts_serviceId = wts_serviceId;
    }

    public String getWts_serviceName() {
        return wts_serviceName;
    }

    public void setWts_serviceName(String wts_serviceName) {
        this.wts_serviceName = wts_serviceName;
    }

    public String getWts_vendor() {
        return wts_vendor;
    }

    public void setWts_vendor(String wts_vendor) {
        this.wts_vendor = wts_vendor;
    }

    public Boolean getWts_waterServiceRequired() {
        return wts_waterServiceRequired;
    }

    public void setWts_waterServiceRequired(Boolean wts_waterServiceRequired) {
        this.wts_waterServiceRequired = wts_waterServiceRequired;
    }

    public Double getWts_waterVolume() {
        return wts_waterVolume;
    }

    public void setWts_waterVolume(Double wts_waterVolume) {
        this.wts_waterVolume = wts_waterVolume;
    }

    public LocalDateTime getWts_serviceTime() {
        return wts_serviceTime;
    }

    public void setWts_serviceTime(LocalDateTime wts_serviceTime) {
        this.wts_serviceTime = wts_serviceTime;
    }

    public String getWts_serviceCharge() {
        return wts_serviceCharge;
    }

    public void setWts_serviceCharge(String wts_serviceCharge) {
        this.wts_serviceCharge = wts_serviceCharge;
    }

    public String getWts_waterServiceNotes() {
        return wts_waterServiceNotes;
    }

    public void setWts_waterServiceNotes(String wts_waterServiceNotes) {
        this.wts_waterServiceNotes = wts_waterServiceNotes;
    }

    public List<String> getWts_documents() {
        return wts_documents;
    }

    public void setWts_documents(List<String> wts_documents) {
        this.wts_documents = wts_documents;
    }

    public String getWts_additionalNotes() {
        return wts_additionalNotes;
    }

    public void setWts_additionalNotes(String wts_additionalNotes) {
        this.wts_additionalNotes = wts_additionalNotes;
    }

    public String getWts_serviceStatus() {
        return wts_serviceStatus;
    }

    public void setWts_serviceStatus(String wts_serviceStatus) {
        this.wts_serviceStatus = wts_serviceStatus;
    }

    public String getWts_payment() {
        return wts_payment;
    }

    public void setWts_payment(String wts_payment) {
        this.wts_payment = wts_payment;
    }
}
