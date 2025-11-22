package com.hazyaz.FlightPulse360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Aircraft {

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String ac_Id;

    private String ac_TailNo;
    private String ac_Type;
    private String ac_Manufacturer;
    private String ac_Model;
    private String ac_YearManufactured;
    private String ac_PassengerCapacity;
    private String ac_MaxRange;
//    private String ac_CruiseSpeed;
    private String  AC_CRUISESPEED;

    private String ac_FuelCapacity;
    private String ac_WingSpan;
    private String ac_maxTakeOffWeight;


//    Operation and Regisration
    private String ac_HomeBase;
    private String ac_RegistrationDate;
    private String ac_InsuranceDetails;
    private String ac_Notes;

    //    figure out a way to store all the list of documents
    private String ac_documents;

//    Main link with the user
    private String uxUniversalLicense;

    public String getPrefix() {
        return "AC";
    }

    public String getAcId() {
        return ac_Id;
    }

    public String setAcId(){
        return ac_Id;
    }

    public String getAc_TailNo() {
        return ac_TailNo;
    }

    public void setAc_TailNo(String ac_TailNo) {
        this.ac_TailNo = ac_TailNo;
    }

    public String getAc_Type() {
        return ac_Type;
    }

    public void setAc_Type(String ac_Type) {
        this.ac_Type = ac_Type;
    }

    public String getAc_Manufacturer() {
        return ac_Manufacturer;
    }

    public void setAc_Manufacturer(String ac_Manufacturer) {
        this.ac_Manufacturer = ac_Manufacturer;
    }

    public String getAc_Model() {
        return ac_Model;
    }

    public void setAc_Model(String ac_Model) {
        this.ac_Model = ac_Model;
    }

    public String getAc_YearManufactured() {
        return ac_YearManufactured;
    }

    public void setAc_YearManufactured(String ac_YearManufactured) {
        this.ac_YearManufactured = ac_YearManufactured;
    }

    public String getAc_PassengerCapacity() {
        return ac_PassengerCapacity;
    }

    public void setAc_PassengerCapacity(String ac_PassengerCapacity) {
        this.ac_PassengerCapacity = ac_PassengerCapacity;
    }

    public String getAc_MaxRange() {
        return ac_MaxRange;
    }

    public void setAc_MaxRange(String ac_MaxRange) {
        this.ac_MaxRange = ac_MaxRange;
    }

    public String getAC_CRUISESPEED() {
        return AC_CRUISESPEED;
    }

    public void setAC_CRUISESPEED(String AC_CRUISESPEED) {
        this.AC_CRUISESPEED = AC_CRUISESPEED;
    }

    public String getAc_FuelCapacity() {
        return ac_FuelCapacity;
    }

    public void setAc_FuelCapacity(String ac_FuelCapacity) {
        this.ac_FuelCapacity = ac_FuelCapacity;
    }

    public String getAc_WingSpan() {
        return ac_WingSpan;
    }

    public void setAc_WingSpan(String ac_WingSpan) {
        this.ac_WingSpan = ac_WingSpan;
    }

    public String getAc_maxTakeOffWeight() {
        return ac_maxTakeOffWeight;
    }

    public void setAc_maxTakeOffWeight(String ac_maxTakeOffWeight) {
        this.ac_maxTakeOffWeight = ac_maxTakeOffWeight;
    }

    public String getAc_HomeBase() {
        return ac_HomeBase;
    }

    public void setAc_HomeBase(String ac_HomeBase) {
        this.ac_HomeBase = ac_HomeBase;
    }

    public String getAc_RegistrationDate() {
        return ac_RegistrationDate;
    }

    public void setAc_RegistrationDate(String ac_RegistrationDate) {
        this.ac_RegistrationDate = ac_RegistrationDate;
    }

    public String getAc_InsuranceDetails() {
        return ac_InsuranceDetails;
    }

    public void setAc_InsuranceDetails(String ac_InsuranceDetails) {
        this.ac_InsuranceDetails = ac_InsuranceDetails;
    }

    public String getAc_Notes() {
        return ac_Notes;
    }

    public void setAc_Notes(String ac_Notes) {
        this.ac_Notes = ac_Notes;
    }

    public String getAc_documents() {
        return ac_documents;
    }

    public void setAc_documents(String ac_documents) {
        this.ac_documents = ac_documents;
    }

    public String getUxUniversalLicense() {
        return uxUniversalLicense;
    }

    public void setUxUniversalLicense(String uxUniversalLicense) {
        this.uxUniversalLicense = uxUniversalLicense;
    }
}
