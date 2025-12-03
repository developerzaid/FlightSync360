package com.hazyaz.FlightSync360.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.time.Instant;

public class User {


    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String urId;

    private String ur_firstName;
    private String ur_lastName;
    private String ur_email;
    private String ur_companyName;


    private String ur_companyId;

    private String ur_password;
    private String ur_country;
    private String ur_phone;
    private String uxUniversalCompanyId; //FK to all

    private int ur_noOfSeats;
    private int ur_activeSeats;

    private Instant ur_purchaseDate;
    private Instant ur_renewalDate;

    private String ur_status;

    public String getPrefix() {
        return "UX";
    }
}
