package com.hazyaz.FlightSync360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Entity

public class PermitsAndClearance {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
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

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getPac_serviceId() {
        return pac_serviceId;
    }

    public void setPac_serviceId(String pac_serviceId) {
        this.pac_serviceId = pac_serviceId;
    }

    public String getPac_serviceName() {
        return pac_serviceName;
    }

    public void setPac_serviceName(String pac_serviceName) {
        this.pac_serviceName = pac_serviceName;
    }

    public String getPac_vendorId() {
        return pac_vendorId;
    }

    public void setPac_vendorId(String pac_vendorId) {
        this.pac_vendorId = pac_vendorId;
    }

    public String getPac_contactPerson() {
        return pac_contactPerson;
    }

    public void setPac_contactPerson(String pac_contactPerson) {
        this.pac_contactPerson = pac_contactPerson;
    }

    public String getPac_contactEmail() {
        return pac_contactEmail;
    }

    public void setPac_contactEmail(String pac_contactEmail) {
        this.pac_contactEmail = pac_contactEmail;
    }

    public String getPac_permitType() {
        return pac_permitType;
    }

    public void setPac_permitType(String pac_permitType) {
        this.pac_permitType = pac_permitType;
    }

    public String getPac_landingNumber() {
        return pac_landingNumber;
    }

    public void setPac_landingNumber(String pac_landingNumber) {
        this.pac_landingNumber = pac_landingNumber;
    }

    public String getPac_landingPermitNumber() {
        return pac_landingPermitNumber;
    }

    public void setPac_landingPermitNumber(String pac_landingPermitNumber) {
        this.pac_landingPermitNumber = pac_landingPermitNumber;
    }

    public String getPac_overflightCountries() {
        return pac_overflightCountries;
    }

    public void setPac_overflightCountries(String pac_overflightCountries) {
        this.pac_overflightCountries = pac_overflightCountries;
    }

    public String getPac_overflightPermitNumber() {
        return pac_overflightPermitNumber;
    }

    public void setPac_overflightPermitNumber(String pac_overflightPermitNumber) {
        this.pac_overflightPermitNumber = pac_overflightPermitNumber;
    }

    public String getPac_processingFees() {
        return pac_processingFees;
    }

    public void setPac_processingFees(String pac_processingFees) {
        this.pac_processingFees = pac_processingFees;
    }

    public String getPac_governmentFees() {
        return pac_governmentFees;
    }

    public void setPac_governmentFees(String pac_governmentFees) {
        this.pac_governmentFees = pac_governmentFees;
    }

    public String getPac_totalFees() {
        return pac_totalFees;
    }

    public void setPac_totalFees(String pac_totalFees) {
        this.pac_totalFees = pac_totalFees;
    }

    public String getPac_currency() {
        return pac_currency;
    }

    public void setPac_currency(String pac_currency) {
        this.pac_currency = pac_currency;
    }

    public String getPac_applicationDate() {
        return pac_applicationDate;
    }

    public void setPac_applicationDate(String pac_applicationDate) {
        this.pac_applicationDate = pac_applicationDate;
    }

    public String getPac_expectedApprovalDate() {
        return pac_expectedApprovalDate;
    }

    public void setPac_expectedApprovalDate(String pac_expectedApprovalDate) {
        this.pac_expectedApprovalDate = pac_expectedApprovalDate;
    }

    public List<String> getPac_documents() {
        return pac_documents;
    }

    public void setPac_documents(List<String> pac_documents) {
        this.pac_documents = pac_documents;
    }

    public String getPac_additionalNotes() {
        return pac_additionalNotes;
    }

    public void setPac_additionalNotes(String pac_additionalNotes) {
        this.pac_additionalNotes = pac_additionalNotes;
    }

    public String getPac_serviceStatus() {
        return pac_serviceStatus;
    }

    public void setPac_serviceStatus(String pac_serviceStatus) {
        this.pac_serviceStatus = pac_serviceStatus;
    }
}

