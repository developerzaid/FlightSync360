package com.hazyaz.FlightPulse360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
@Entity
@Data
public class FuelService {


    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightPulse360.util.UniqueIdGenerator")
    private String fl_serviceId;

    public String getPrefix() {
        return "TPSRV-FL";
    }

    private String fl_serviceName;

    private String fl_groundEmail;
    private String fl_groundPhone;

    private String fl_type;
    private String fl_quantity;
    private String fl_deliveryDate;
    private String fl_deliveryTime;

    private String fl_unit;
    private String fl_upliftQtyLitres;
    private String fl_usGallons;
    private String fl_currency;
    private String fl_cost;

    private String fl_paymentTerms;
    private String fl_adrCopy;

    private String fl_loadingTime;

    private String fl_vendor;   // FK vendor id

    private List<String> fl_documents;
    private String fl_additionalNotes;
    private String fl_status; // processing, ongoing  {This is for ops team}


}
