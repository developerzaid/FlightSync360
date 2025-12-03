package com.hazyaz.FlightSync360.model.TS.GH;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;
@Entity
public class CateringService {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String cs_serviceId;

    public String getPrefix() {
        return "TPSRV-CS";
    }

    private String cs_serviceName;

    private String cs_vendor; // FK to specific vendor
    // Catering for Private Jets
    private String cs_cateringCompany;
    private String cs_cateringContact;
    private String cs_cateringContactPhone;
    private Integer cs_numberOfMeals;
    private String cs_mealTypes; // breakfast, lunch, dinner, snacks
    private String cs_specialDietaryRequirements; // vegetarian, vegan, kosher, halal, allergies
    private LocalDateTime cs_cateringDeliveryTime;


    private List<String> cs_documents;
    private String cs_additionalNotes;
    private String cs_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getCs_serviceId() {
        return cs_serviceId;
    }

    public void setCs_serviceId(String cs_serviceId) {
        this.cs_serviceId = cs_serviceId;
    }

    public String getCs_serviceName() {
        return cs_serviceName;
    }

    public void setCs_serviceName(String cs_serviceName) {
        this.cs_serviceName = cs_serviceName;
    }

    public String getCs_vendor() {
        return cs_vendor;
    }

    public void setCs_vendor(String cs_vendor) {
        this.cs_vendor = cs_vendor;
    }

    public String getCs_cateringCompany() {
        return cs_cateringCompany;
    }

    public void setCs_cateringCompany(String cs_cateringCompany) {
        this.cs_cateringCompany = cs_cateringCompany;
    }

    public String getCs_cateringContact() {
        return cs_cateringContact;
    }

    public void setCs_cateringContact(String cs_cateringContact) {
        this.cs_cateringContact = cs_cateringContact;
    }

    public String getCs_cateringContactPhone() {
        return cs_cateringContactPhone;
    }

    public void setCs_cateringContactPhone(String cs_cateringContactPhone) {
        this.cs_cateringContactPhone = cs_cateringContactPhone;
    }

    public Integer getCs_numberOfMeals() {
        return cs_numberOfMeals;
    }

    public void setCs_numberOfMeals(Integer cs_numberOfMeals) {
        this.cs_numberOfMeals = cs_numberOfMeals;
    }

    public String getCs_mealTypes() {
        return cs_mealTypes;
    }

    public void setCs_mealTypes(String cs_mealTypes) {
        this.cs_mealTypes = cs_mealTypes;
    }

    public String getCs_specialDietaryRequirements() {
        return cs_specialDietaryRequirements;
    }

    public void setCs_specialDietaryRequirements(String cs_specialDietaryRequirements) {
        this.cs_specialDietaryRequirements = cs_specialDietaryRequirements;
    }

    public LocalDateTime getCs_cateringDeliveryTime() {
        return cs_cateringDeliveryTime;
    }

    public void setCs_cateringDeliveryTime(LocalDateTime cs_cateringDeliveryTime) {
        this.cs_cateringDeliveryTime = cs_cateringDeliveryTime;
    }

    public List<String> getCs_documents() {
        return cs_documents;
    }

    public void setCs_documents(List<String> cs_documents) {
        this.cs_documents = cs_documents;
    }

    public String getCs_additionalNotes() {
        return cs_additionalNotes;
    }

    public void setCs_additionalNotes(String cs_additionalNotes) {
        this.cs_additionalNotes = cs_additionalNotes;
    }

    public String getCs_serviceStatus() {
        return cs_serviceStatus;
    }

    public void setCs_serviceStatus(String cs_serviceStatus) {
        this.cs_serviceStatus = cs_serviceStatus;
    }
}
