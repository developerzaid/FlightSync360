package com.hazyaz.FlightSync360.model.TS.GH;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.List;

@Entity

public class RampService {



    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
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


    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getRps_serviceId() {
        return rps_serviceId;
    }

    public void setRps_serviceId(String rps_serviceId) {
        this.rps_serviceId = rps_serviceId;
    }

    public String getRps_serviceName() {
        return rps_serviceName;
    }

    public void setRps_serviceName(String rps_serviceName) {
        this.rps_serviceName = rps_serviceName;
    }

    public String getRps_groundHandlingServiceId() {
        return rps_groundHandlingServiceId;
    }

    public void setRps_groundHandlingServiceId(String rps_groundHandlingServiceId) {
        this.rps_groundHandlingServiceId = rps_groundHandlingServiceId;
    }

    public String getRps_serviceRequestId() {
        return rps_serviceRequestId;
    }

    public void setRps_serviceRequestId(String rps_serviceRequestId) {
        this.rps_serviceRequestId = rps_serviceRequestId;
    }

    public String getRps_vendor() {
        return rps_vendor;
    }

    public void setRps_vendor(String rps_vendor) {
        this.rps_vendor = rps_vendor;
    }

    public Integer getRps_gpuDuration() {
        return rps_gpuDuration;
    }

    public void setRps_gpuDuration(Integer rps_gpuDuration) {
        this.rps_gpuDuration = rps_gpuDuration;
    }

    public BigDecimal getRps_gpuChargePerHour() {
        return rps_gpuChargePerHour;
    }

    public void setRps_gpuChargePerHour(BigDecimal rps_gpuChargePerHour) {
        this.rps_gpuChargePerHour = rps_gpuChargePerHour;
    }

    public Integer getRps_acuDuration() {
        return rps_acuDuration;
    }

    public void setRps_acuDuration(Integer rps_acuDuration) {
        this.rps_acuDuration = rps_acuDuration;
    }

    public BigDecimal getRps_acuChargePerHour() {
        return rps_acuChargePerHour;
    }

    public void setRps_acuChargePerHour(BigDecimal rps_acuChargePerHour) {
        this.rps_acuChargePerHour = rps_acuChargePerHour;
    }

    public Boolean getRps_chalksAndCones() {
        return rps_chalksAndCones;
    }

    public void setRps_chalksAndCones(Boolean rps_chalksAndCones) {
        this.rps_chalksAndCones = rps_chalksAndCones;
    }

    public Boolean getRps_towingRequired() {
        return rps_towingRequired;
    }

    public void setRps_towingRequired(Boolean rps_towingRequired) {
        this.rps_towingRequired = rps_towingRequired;
    }

    public String getRps_towingFromLocation() {
        return rps_towingFromLocation;
    }

    public void setRps_towingFromLocation(String rps_towingFromLocation) {
        this.rps_towingFromLocation = rps_towingFromLocation;
    }

    public String getRps_towingToLocation() {
        return rps_towingToLocation;
    }

    public void setRps_towingToLocation(String rps_towingToLocation) {
        this.rps_towingToLocation = rps_towingToLocation;
    }

    public String getRps_rampEquipmentNotes() {
        return rps_rampEquipmentNotes;
    }

    public void setRps_rampEquipmentNotes(String rps_rampEquipmentNotes) {
        this.rps_rampEquipmentNotes = rps_rampEquipmentNotes;
    }

    public List<String> getRps_documents() {
        return rps_documents;
    }

    public void setRps_documents(List<String> rps_documents) {
        this.rps_documents = rps_documents;
    }

    public String getRps_additionalNotes() {
        return rps_additionalNotes;
    }

    public void setRps_additionalNotes(String rps_additionalNotes) {
        this.rps_additionalNotes = rps_additionalNotes;
    }

    public String getRps_serviceStatus() {
        return rps_serviceStatus;
    }

    public void setRps_serviceStatus(String rps_serviceStatus) {
        this.rps_serviceStatus = rps_serviceStatus;
    }

    public String getRps_payment() {
        return rps_payment;
    }

    public void setRps_payment(String rps_payment) {
        this.rps_payment = rps_payment;
    }
}
