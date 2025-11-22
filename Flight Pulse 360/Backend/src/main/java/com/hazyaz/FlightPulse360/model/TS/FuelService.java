package com.hazyaz.FlightPulse360.model.TS;

import java.util.List;

public class FuelService {

    private String fl_Id;
    private String fl_quantity;
    private String fl_date;
    private String fl_time;
    private String fl_unit;
    private String fl_upliftQtyLitres;
    private String fl_usGallons;
    private String fl_cost;     // Automatic, weekly updated
    private String fl_zone;     // ICAO code
    private String fl_country;
    private String fl_city;
    private String fl_serviceStn;
    private String fl_adrCopy;
    private String fl_groundEmail;
    private String fl_groundPhone;
    private String fl_type;
    private String fl_loadingTime;

    private String fl_vendor;   // FK Vendor Database, send vendor id and fetch from backend
    private String fl_client;   // FK Client Database, send client id fetch from backedn
    private String fl_aircraft; // FK aircraft Database
    private List<String> fl_crew;     // FK crew database

    private String fl_additionalNotes;

    //   Amazon S3 would be used for the storage of the files
    private List<String> vn_documents;

    // These would be in all the services
    private String fl_requestMode;     // whatsapp, email, call
    private String fl_requestDate;

    private String fl_status; // processing, ongoing  {This is for ops team}
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

    private String fl_createdAt;
    private String fl_createdBy;
    private String fl_lastModifiedAt;
    private String fl_lastModifiedBy;

}
