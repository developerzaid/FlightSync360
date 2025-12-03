package com.hazyaz.FlightSync360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Passenger {


    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String pxId;

    private String uxUniversalCompanyId;

    private String px_name;
    private String px_phoneNo;
    private String px_emailAddress;
    private String px_country;

    //  if the client is just client
    private String px_passportNo;
    private String px_passportExpiry;
    private String px_dob;
    private String px_nationality;
    private String px_additionalNotes;

    //  figure out a way to store all the list of documents
    private String px_documents;





    public String getPrefix() {
        return "PX";
    }

}
