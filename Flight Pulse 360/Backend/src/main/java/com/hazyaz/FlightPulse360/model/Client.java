package com.hazyaz.FlightPulse360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Client {

    @Id
    private String ct_id;

    private String ct_name;
    private String ct_company;
    private String ct_phoneNo;
    private String ct_emailAddress;
    private String ct_country;
    private String ct_city;
    private String ct_address;
    private String ct_role; // PASSENGER | COMPANY | OTHERS

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

}
