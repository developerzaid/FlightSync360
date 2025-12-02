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

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getDis_serviceId() {
        return dis_serviceId;
    }

    public void setDis_serviceId(String dis_serviceId) {
        this.dis_serviceId = dis_serviceId;
    }

    public String getDis_vendor() {
        return dis_vendor;
    }

    public void setDis_vendor(String dis_vendor) {
        this.dis_vendor = dis_vendor;
    }

    public String getDis_serviceName() {
        return dis_serviceName;
    }

    public void setDis_serviceName(String dis_serviceName) {
        this.dis_serviceName = dis_serviceName;
    }

    public String getDis_fluidType() {
        return dis_fluidType;
    }

    public void setDis_fluidType(String dis_fluidType) {
        this.dis_fluidType = dis_fluidType;
    }

    public Double getDis_fluidQuantity() {
        return dis_fluidQuantity;
    }

    public void setDis_fluidQuantity(Double dis_fluidQuantity) {
        this.dis_fluidQuantity = dis_fluidQuantity;
    }

    public Double getDis_outsideTemperature() {
        return dis_outsideTemperature;
    }

    public void setDis_outsideTemperature(Double dis_outsideTemperature) {
        this.dis_outsideTemperature = dis_outsideTemperature;
    }

    public LocalDateTime getDis_deicingTime() {
        return dis_deicingTime;
    }

    public void setDis_deicingTime(LocalDateTime dis_deicingTime) {
        this.dis_deicingTime = dis_deicingTime;
    }

    public Integer getDis_deicingDuration() {
        return dis_deicingDuration;
    }

    public void setDis_deicingDuration(Integer dis_deicingDuration) {
        this.dis_deicingDuration = dis_deicingDuration;
    }

    public List<String> getDis_documents() {
        return dis_documents;
    }

    public void setDis_documents(List<String> dis_documents) {
        this.dis_documents = dis_documents;
    }

    public String getDis_additionalNotes() {
        return dis_additionalNotes;
    }

    public void setDis_additionalNotes(String dis_additionalNotes) {
        this.dis_additionalNotes = dis_additionalNotes;
    }

    public String getDis_serviceStatus() {
        return dis_serviceStatus;
    }

    public void setDis_serviceStatus(String dis_serviceStatus) {
        this.dis_serviceStatus = dis_serviceStatus;
    }
}
