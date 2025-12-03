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

    public String getUrId() {
        return urId;
    }

    public void setUrId(String urId) {
        this.urId = urId;
    }

    public String getUr_firstName() {
        return ur_firstName;
    }

    public void setUr_firstName(String ur_firstName) {
        this.ur_firstName = ur_firstName;
    }

    public String getUr_lastName() {
        return ur_lastName;
    }

    public void setUr_lastName(String ur_lastName) {
        this.ur_lastName = ur_lastName;
    }

    public String getUr_email() {
        return ur_email;
    }

    public void setUr_email(String ur_email) {
        this.ur_email = ur_email;
    }

    public String getUr_companyName() {
        return ur_companyName;
    }

    public void setUr_companyName(String ur_companyName) {
        this.ur_companyName = ur_companyName;
    }

    public String getUr_companyId() {
        return ur_companyId;
    }

    public void setUr_companyId(String ur_companyId) {
        this.ur_companyId = ur_companyId;
    }

    public String getUr_password() {
        return ur_password;
    }

    public void setUr_password(String ur_password) {
        this.ur_password = ur_password;
    }

    public String getUr_country() {
        return ur_country;
    }

    public void setUr_country(String ur_country) {
        this.ur_country = ur_country;
    }

    public String getUr_phone() {
        return ur_phone;
    }

    public void setUr_phone(String ur_phone) {
        this.ur_phone = ur_phone;
    }

    public String getUxUniversalCompanyId() {
        return uxUniversalCompanyId;
    }

    public void setUxUniversalCompanyId(String uxUniversalCompanyId) {
        this.uxUniversalCompanyId = uxUniversalCompanyId;
    }

    public int getUr_noOfSeats() {
        return ur_noOfSeats;
    }

    public void setUr_noOfSeats(int ur_noOfSeats) {
        this.ur_noOfSeats = ur_noOfSeats;
    }

    public int getUr_activeSeats() {
        return ur_activeSeats;
    }

    public void setUr_activeSeats(int ur_activeSeats) {
        this.ur_activeSeats = ur_activeSeats;
    }

    public Instant getUr_purchaseDate() {
        return ur_purchaseDate;
    }

    public void setUr_purchaseDate(Instant ur_purchaseDate) {
        this.ur_purchaseDate = ur_purchaseDate;
    }

    public Instant getUr_renewalDate() {
        return ur_renewalDate;
    }

    public void setUr_renewalDate(Instant ur_renewalDate) {
        this.ur_renewalDate = ur_renewalDate;
    }

    public String getUr_status() {
        return ur_status;
    }

    public void setUr_status(String ur_status) {
        this.ur_status = ur_status;
    }
}
