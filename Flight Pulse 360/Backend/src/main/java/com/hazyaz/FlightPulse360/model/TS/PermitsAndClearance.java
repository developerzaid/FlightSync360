package com.hazyaz.FlightPulse360.model.TS;

public class PermitsAndClearance {


    private Boolean diplomaticClearanceRequired;
    private String diplomaticClearanceNumber;
    private Boolean nightFlightPermitRequired;
    private String nightFlightPermitNumber;
    private Boolean parkingPermitRequired;
    private String parkingPermitNumber;

    private Boolean pprRequired;
    private String pprAuthority;
    private String pprReferenceNumber;

    private Boolean landingPermitRequired;
    private String landingPermitNumber;

    private Boolean overflightRequired;
    private String overflightCountries; // comma-separated ISO codes
    private String overflightPermitNumber;
}

