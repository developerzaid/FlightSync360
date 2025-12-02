package com.hazyaz.FlightPulse360.model.TS.GH;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
@Entity

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

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getLs_serviceId() {
        return ls_serviceId;
    }

    public void setLs_serviceId(String ls_serviceId) {
        this.ls_serviceId = ls_serviceId;
    }

    public String getLs_serviceName() {
        return ls_serviceName;
    }

    public void setLs_serviceName(String ls_serviceName) {
        this.ls_serviceName = ls_serviceName;
    }

    public String getLs_vendor() {
        return ls_vendor;
    }

    public void setLs_vendor(String ls_vendor) {
        this.ls_vendor = ls_vendor;
    }

    public Boolean getLs_lavaServiceRequired() {
        return ls_lavaServiceRequired;
    }

    public void setLs_lavaServiceRequired(Boolean ls_lavaServiceRequired) {
        this.ls_lavaServiceRequired = ls_lavaServiceRequired;
    }

    public Integer getLs_numberOfLavatories() {
        return ls_numberOfLavatories;
    }

    public void setLs_numberOfLavatories(Integer ls_numberOfLavatories) {
        this.ls_numberOfLavatories = ls_numberOfLavatories;
    }

    public String getLs_serviceType() {
        return ls_serviceType;
    }

    public void setLs_serviceType(String ls_serviceType) {
        this.ls_serviceType = ls_serviceType;
    }

    public String getLs_serviceTime() {
        return ls_serviceTime;
    }

    public void setLs_serviceTime(String ls_serviceTime) {
        this.ls_serviceTime = ls_serviceTime;
    }

    public String getLs_lavaServiceNotes() {
        return ls_lavaServiceNotes;
    }

    public void setLs_lavaServiceNotes(String ls_lavaServiceNotes) {
        this.ls_lavaServiceNotes = ls_lavaServiceNotes;
    }

    public List<String> getLs_documents() {
        return ls_documents;
    }

    public void setLs_documents(List<String> ls_documents) {
        this.ls_documents = ls_documents;
    }

    public String getLs_additionalNotes() {
        return ls_additionalNotes;
    }

    public void setLs_additionalNotes(String ls_additionalNotes) {
        this.ls_additionalNotes = ls_additionalNotes;
    }

    public String getLs_serviceStatus() {
        return ls_serviceStatus;
    }

    public void setLs_serviceStatus(String ls_serviceStatus) {
        this.ls_serviceStatus = ls_serviceStatus;
    }

    public String getLs_payment() {
        return ls_payment;
    }

    public void setLs_payment(String ls_payment) {
        this.ls_payment = ls_payment;
    }
}
