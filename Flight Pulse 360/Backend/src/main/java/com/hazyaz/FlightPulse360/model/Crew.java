package com.hazyaz.FlightPulse360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
public class Crew {


    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String crId;

    private String uxUniversalCompanyId;

    private String cr_name;
    private String cr_type; // Can be Ground Staff, Cabin Attendant, Pilot and other
    private String cr_email;
    private String cr_phone;
    private String cr_passportNo;
    private String cr_visaDetails;

//    License and certification
    private String cr_licenseNo;
    private String cr_licenseExpiryDate;
    private String cr_totalFlightHours;
    private String cr_typeRatingCertificate;

//    Additional Information
    private String cr_baseLocation;
    private String cr_languageSpoken;
    private String cr_notes;

//  figure out a way to store all the list of documents
    private String ac_documents;


    public String getPrefix() {
        return "CR";
    }
}
