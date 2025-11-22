package com.hazyaz.FlightPulse360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Vendor {

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String vn_Id;

        private String vn_name;
        private String vn_company;
        private String vn_phoneNo;
        private String vn_alternatePhoneNo;
        private String vn_emailAddress;
        private String vn_alternateEmailAddress;
        private String vn_serviceType;
        private String vn_country;
        private String vn_city;
        private String vn_address;

    //    Business details of the company

        private String vn_taxId;
        private String vn_paymentTerms;
        private String vn_bankDetails;
        private String vn_Insurance;


        private String vn_additionalNotes;

    //    figure out a way to store all the list of documents
        private String vn_documents;

    public String getPrefix() {
        return "VN";
    }

    public String getVn_Id() {
        return vn_Id;
    }

    public void setVn_Id(String vn_Id) {
        this.vn_Id = vn_Id;
    }

    public String getVn_name() {
        return vn_name;
    }

    public void setVn_name(String vn_name) {
        this.vn_name = vn_name;
    }

    public String getVn_company() {
        return vn_company;
    }

    public void setVn_company(String vn_company) {
        this.vn_company = vn_company;
    }

    public String getVn_phoneNo() {
        return vn_phoneNo;
    }

    public void setVn_phoneNo(String vn_phoneNo) {
        this.vn_phoneNo = vn_phoneNo;
    }

    public String getVn_alternatePhoneNo() {
        return vn_alternatePhoneNo;
    }

    public void setVn_alternatePhoneNo(String vn_alternatePhoneNo) {
        this.vn_alternatePhoneNo = vn_alternatePhoneNo;
    }

    public String getVn_emailAddress() {
        return vn_emailAddress;
    }

    public void setVn_emailAddress(String vn_emailAddress) {
        this.vn_emailAddress = vn_emailAddress;
    }

    public String getVn_alternateEmailAddress() {
        return vn_alternateEmailAddress;
    }

    public void setVn_alternateEmailAddress(String vn_alternateEmailAddress) {
        this.vn_alternateEmailAddress = vn_alternateEmailAddress;
    }

    public String getVn_serviceType() {
        return vn_serviceType;
    }

    public void setVn_serviceType(String vn_serviceType) {
        this.vn_serviceType = vn_serviceType;
    }

    public String getVn_country() {
        return vn_country;
    }

    public void setVn_country(String vn_country) {
        this.vn_country = vn_country;
    }

    public String getVn_city() {
        return vn_city;
    }

    public void setVn_city(String vn_city) {
        this.vn_city = vn_city;
    }

    public String getVn_address() {
        return vn_address;
    }

    public void setVn_address(String vn_address) {
        this.vn_address = vn_address;
    }

    public String getVn_taxId() {
        return vn_taxId;
    }

    public void setVn_taxId(String vn_taxId) {
        this.vn_taxId = vn_taxId;
    }

    public String getVn_paymentTerms() {
        return vn_paymentTerms;
    }

    public void setVn_paymentTerms(String vn_paymentTerms) {
        this.vn_paymentTerms = vn_paymentTerms;
    }

    public String getVn_bankDetails() {
        return vn_bankDetails;
    }

    public void setVn_bankDetails(String vn_bankDetails) {
        this.vn_bankDetails = vn_bankDetails;
    }

    public String getVn_Insurance() {
        return vn_Insurance;
    }

    public void setVn_Insurance(String vn_Insurance) {
        this.vn_Insurance = vn_Insurance;
    }

    public String getVn_additionalNotes() {
        return vn_additionalNotes;
    }

    public void setVn_additionalNotes(String vn_additionalNotes) {
        this.vn_additionalNotes = vn_additionalNotes;
    }

    public String getVn_documents() {
        return vn_documents;
    }

    public void setVn_documents(String vn_documents) {
        this.vn_documents = vn_documents;
    }
}
