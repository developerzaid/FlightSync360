package com.hazyaz.FlightSync360.dto;

import com.hazyaz.FlightSync360.model.*;
import com.hazyaz.FlightSync360.model.TS.*;
import com.hazyaz.FlightSync360.model.TS.GH.*;


public class MasterTripRequest {

    // ---------- FIELDS ----------
    private MasterTrip masterTrip;


    private FuelService fuelService;
    private CrewConcierge crewConcierge;
    private PassengerConcierge passengerConcierge;
    private PermitsAndClearance permitsAndClearance;
    private AircraftHandling aircraftHandling;
    private CateringService cateringService;
    private DeIcingService deIcingService;
    private LavatoryService lavatoryService;
    private RampService rampService;
    private WaterService waterService;


    public MasterTrip getMasterTrip() {
        return masterTrip;
    }


    public void setMasterTrip(MasterTrip masterTrip) {
        this.masterTrip = masterTrip;
    }


    public FuelService getFuelService() {
        return fuelService;
    }

    public void setFuelService(FuelService fuelService) {
        this.fuelService = fuelService;
    }

    public CrewConcierge getCrewConcierge() {
        return crewConcierge;
    }

    public void setCrewConcierge(CrewConcierge crewConcierge) {
        this.crewConcierge = crewConcierge;
    }

    public PassengerConcierge getPassengerConcierge() {
        return passengerConcierge;
    }

    public void setPassengerConcierge(PassengerConcierge passengerConcierge) {
        this.passengerConcierge = passengerConcierge;
    }

    public PermitsAndClearance getPermitsAndClearance() {
        return permitsAndClearance;
    }

    public void setPermitsAndClearance(PermitsAndClearance permitsAndClearance) {
        this.permitsAndClearance = permitsAndClearance;
    }

    public AircraftHandling getAircraftHandling() {
        return aircraftHandling;
    }

    public void setAircraftHandling(AircraftHandling aircraftHandling) {
        this.aircraftHandling = aircraftHandling;
    }

    public CateringService getCateringService() {
        return cateringService;
    }

    public void setCateringService(CateringService cateringService) {
        this.cateringService = cateringService;
    }

    public DeIcingService getDeIcingService() {
        return deIcingService;
    }

    public void setDeIcingService(DeIcingService deIcingService) {
        this.deIcingService = deIcingService;
    }

    public LavatoryService getLavatoryService() {
        return lavatoryService;
    }

    public void setLavatoryService(LavatoryService lavatoryService) {
        this.lavatoryService = lavatoryService;
    }

    public RampService getRampService() {
        return rampService;
    }

    public void setRampService(RampService rampService) {
        this.rampService = rampService;
    }

    public WaterService getWaterService() {
        return waterService;
    }

    public void setWaterService(WaterService waterService) {
        this.waterService = waterService;
    }

}

