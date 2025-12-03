package com.hazyaz.FlightSync360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
@Entity
public class FuelService {


    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String fl_serviceId;

    public String getPrefix() {
        return "TPSRV-FL";
    }

    private String fl_serviceName;

    private String fl_groundEmail;
    private String fl_groundPhone;

    private String fl_type;
    private String fl_quantity;
    private String fl_deliveryDate;
    private String fl_deliveryTime;

    private String fl_unit;
    private String fl_upliftQtyLitres;
    private String fl_usGallons;
    private String fl_currency;
    private String fl_cost;

    private String fl_paymentTerms;
    private String fl_adrCopy;

    private String fl_loadingTime;

    private String fl_vendor;   // FK vendor id

    private List<String> fl_documents;
    private String fl_additionalNotes;
    private String fl_status; // processing, ongoing  {This is for ops team}

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getFl_serviceId() {
        return fl_serviceId;
    }

    public void setFl_serviceId(String fl_serviceId) {
        this.fl_serviceId = fl_serviceId;
    }

    public String getFl_serviceName() {
        return fl_serviceName;
    }

    public void setFl_serviceName(String fl_serviceName) {
        this.fl_serviceName = fl_serviceName;
    }

    public String getFl_groundEmail() {
        return fl_groundEmail;
    }

    public void setFl_groundEmail(String fl_groundEmail) {
        this.fl_groundEmail = fl_groundEmail;
    }

    public String getFl_groundPhone() {
        return fl_groundPhone;
    }

    public void setFl_groundPhone(String fl_groundPhone) {
        this.fl_groundPhone = fl_groundPhone;
    }

    public String getFl_type() {
        return fl_type;
    }

    public void setFl_type(String fl_type) {
        this.fl_type = fl_type;
    }

    public String getFl_quantity() {
        return fl_quantity;
    }

    public void setFl_quantity(String fl_quantity) {
        this.fl_quantity = fl_quantity;
    }

    public String getFl_deliveryDate() {
        return fl_deliveryDate;
    }

    public void setFl_deliveryDate(String fl_deliveryDate) {
        this.fl_deliveryDate = fl_deliveryDate;
    }

    public String getFl_deliveryTime() {
        return fl_deliveryTime;
    }

    public void setFl_deliveryTime(String fl_deliveryTime) {
        this.fl_deliveryTime = fl_deliveryTime;
    }

    public String getFl_unit() {
        return fl_unit;
    }

    public void setFl_unit(String fl_unit) {
        this.fl_unit = fl_unit;
    }

    public String getFl_upliftQtyLitres() {
        return fl_upliftQtyLitres;
    }

    public void setFl_upliftQtyLitres(String fl_upliftQtyLitres) {
        this.fl_upliftQtyLitres = fl_upliftQtyLitres;
    }

    public String getFl_usGallons() {
        return fl_usGallons;
    }

    public void setFl_usGallons(String fl_usGallons) {
        this.fl_usGallons = fl_usGallons;
    }

    public String getFl_currency() {
        return fl_currency;
    }

    public void setFl_currency(String fl_currency) {
        this.fl_currency = fl_currency;
    }

    public String getFl_cost() {
        return fl_cost;
    }

    public void setFl_cost(String fl_cost) {
        this.fl_cost = fl_cost;
    }

    public String getFl_paymentTerms() {
        return fl_paymentTerms;
    }

    public void setFl_paymentTerms(String fl_paymentTerms) {
        this.fl_paymentTerms = fl_paymentTerms;
    }

    public String getFl_adrCopy() {
        return fl_adrCopy;
    }

    public void setFl_adrCopy(String fl_adrCopy) {
        this.fl_adrCopy = fl_adrCopy;
    }

    public String getFl_loadingTime() {
        return fl_loadingTime;
    }

    public void setFl_loadingTime(String fl_loadingTime) {
        this.fl_loadingTime = fl_loadingTime;
    }

    public String getFl_vendor() {
        return fl_vendor;
    }

    public void setFl_vendor(String fl_vendor) {
        this.fl_vendor = fl_vendor;
    }

    public List<String> getFl_documents() {
        return fl_documents;
    }

    public void setFl_documents(List<String> fl_documents) {
        this.fl_documents = fl_documents;
    }

    public String getFl_additionalNotes() {
        return fl_additionalNotes;
    }

    public void setFl_additionalNotes(String fl_additionalNotes) {
        this.fl_additionalNotes = fl_additionalNotes;
    }

    public String getFl_status() {
        return fl_status;
    }

    public void setFl_status(String fl_status) {
        this.fl_status = fl_status;
    }
}
