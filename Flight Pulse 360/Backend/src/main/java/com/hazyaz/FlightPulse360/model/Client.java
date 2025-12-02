package com.hazyaz.FlightPulse360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Client {

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String ctId;

    private String uxUniversalCompanyId;

    private String ct_name;
    private String ct_company;
    private String ct_phoneNo;
    private String ct_emailAddress;
    private String ct_country;
    private String ct_city;
    private String ct_address;
    private String ct_role; //COMPANY | OTHERS

//    If the client is a company
    private String ct_taxId;
    private String ct_paymentTerms;
    private String ct_bankDetails;
    private String ct_Insurance;


//  if the client is just client
    private String ct_passportNo;
    private String ct_passportExpiry;
    private String ct_dob;
    private String ct_nationality;
    private String ct_additionalNotes;

//  figure out a way to store all the list of documents
    private String ct_documents;





    public String getPrefix() {
        return "CL";
    }
}
