package com.hazyaz.FlightSync360.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Data
public class UserRegistration {

//    ur is for USER

    private String ur_id;

    private String ur_firstName;
    private String ur_lastName;
    private String ur_email;
    private String ur_companyName;
    private String ur_password;
    private String ur_country;
    private String ur_phone;

    private int ur_noOfSeats;

    private int ur_activeSeats;

    private Instant ur_purchaseDate;
    private Instant ur_renewalDate;

    private String ur_status;


}
