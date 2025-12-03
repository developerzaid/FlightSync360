package com.hazyaz.FlightSync360.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Data
@Entity
public class Aircraft {

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String acId;


    private String uxUniversalCompanyId;


    private String ac_TailNo;
    private String ac_Type;
    private String ac_Manufacturer;
    private String ac_Model;
    private String ac_YearManufactured;
    private String ac_PassengerCapacity;
    private String ac_MaxRange;
    private String ac_CruiseSpeed;


    private String ac_FuelCapacity;
    private String ac_WingSpan;
    private String ac_maxTakeOffWeight;


//    Operation and Regisration
    private String ac_HomeBase;
    private String ac_RegistrationDate;
    private String ac_InsuranceDetails;
    private String ac_Notes;

//    figure out a way to store all the list of documents
    private List<String> ac_documents;

//    Main link with the user


    public String getPrefix() {
        return "AC";
    }


}
