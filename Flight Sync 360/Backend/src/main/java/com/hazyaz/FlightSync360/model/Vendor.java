package com.hazyaz.FlightSync360.model;

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
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String vnId;

    private String uxUniversalCompanyId;

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
}
