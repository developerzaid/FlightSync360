package com.hazyaz.FlightPulse360.model.TS;

import java.time.LocalDateTime;

public class CateringService {

    // Primary Keys & References
    private String serviceId; // UUID
    private String groundHandlingServiceId; // FK to main TS service
    private String serviceRequestId; // FK to main service request
    private String serviceName;

    // Catering for Private Jets
    private Boolean cateringRequired;
    private String cateringCompany;
    private String cateringContact;
    private String cateringContactPhone;
    private Integer numberOfMeals;
    private String mealTypes; // breakfast, lunch, dinner, snacks
    private String specialDietaryRequirements; // vegetarian, vegan, kosher, halal, allergies
    private Boolean alcoholicBeverages;
    private Boolean premiumBeverages; // champagne, wine selection
    private String specificBrandRequests; // Dom Perignon, specific whiskey, etc.
    private LocalDateTime cateringDeliveryTime;
    private String cateringCoordinationFee;
    private String cateringNotes;

    private String serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    private String fl_payment; // Processing, Servicing, Invoiced, Payment received {This is for sales team}

}
