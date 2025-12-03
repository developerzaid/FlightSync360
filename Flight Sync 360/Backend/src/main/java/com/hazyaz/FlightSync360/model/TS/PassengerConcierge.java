package com.hazyaz.FlightSync360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;
@Entity

public class PassengerConcierge {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String pc_serviceId;

    public String getPrefix() {
        return "TPSRV-PC";
    }
    private String pc_serviceName;

    // Passenger Ground Transportation
    private Integer pc_passengersRequiringTransport;
    private String pc_transportDestination; // hotel, residence, office, meeting venue
    private String pc_transportType; // LUXURY_SEDAN, LIMOUSINE, SUV, VAN, HELICOPTER

    private String pc_transportProvider;
    private String pc_chauffeurName;
    private String pc_chauffeurContact;
    private String pc_vehicleType; // Mercedes S-Class, Range Rover, etc.
    private LocalDateTime pc_pickupTime;
    private String pc_pickupLocation;


    // Passenger Hotel (if arranging)
    private String pc_passengerHotelName;
    private String pc_passengerHotelAddress;
    private Integer pc_passengerRoomsRequired;
    private LocalDateTime pc_passengerCheckIn;
    private LocalDateTime pc_passengerCheckOut;
    private String pc_passengerRoomType; // SUITE, PRESIDENTIAL, DELUXE


    private List<String> pc_documents;
    private String pc_additionalNotes;
    private String pc_status; // processing, ongoing  {This is for ops team}
    private String pc_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getPc_serviceId() {
        return pc_serviceId;
    }

    public void setPc_serviceId(String pc_serviceId) {
        this.pc_serviceId = pc_serviceId;
    }

    public String getPc_serviceName() {
        return pc_serviceName;
    }

    public void setPc_serviceName(String pc_serviceName) {
        this.pc_serviceName = pc_serviceName;
    }

    public Integer getPc_passengersRequiringTransport() {
        return pc_passengersRequiringTransport;
    }

    public void setPc_passengersRequiringTransport(Integer pc_passengersRequiringTransport) {
        this.pc_passengersRequiringTransport = pc_passengersRequiringTransport;
    }

    public String getPc_transportDestination() {
        return pc_transportDestination;
    }

    public void setPc_transportDestination(String pc_transportDestination) {
        this.pc_transportDestination = pc_transportDestination;
    }

    public String getPc_transportType() {
        return pc_transportType;
    }

    public void setPc_transportType(String pc_transportType) {
        this.pc_transportType = pc_transportType;
    }

    public String getPc_transportProvider() {
        return pc_transportProvider;
    }

    public void setPc_transportProvider(String pc_transportProvider) {
        this.pc_transportProvider = pc_transportProvider;
    }

    public String getPc_chauffeurName() {
        return pc_chauffeurName;
    }

    public void setPc_chauffeurName(String pc_chauffeurName) {
        this.pc_chauffeurName = pc_chauffeurName;
    }

    public String getPc_chauffeurContact() {
        return pc_chauffeurContact;
    }

    public void setPc_chauffeurContact(String pc_chauffeurContact) {
        this.pc_chauffeurContact = pc_chauffeurContact;
    }

    public String getPc_vehicleType() {
        return pc_vehicleType;
    }

    public void setPc_vehicleType(String pc_vehicleType) {
        this.pc_vehicleType = pc_vehicleType;
    }

    public LocalDateTime getPc_pickupTime() {
        return pc_pickupTime;
    }

    public void setPc_pickupTime(LocalDateTime pc_pickupTime) {
        this.pc_pickupTime = pc_pickupTime;
    }

    public String getPc_pickupLocation() {
        return pc_pickupLocation;
    }

    public void setPc_pickupLocation(String pc_pickupLocation) {
        this.pc_pickupLocation = pc_pickupLocation;
    }

    public String getPc_passengerHotelName() {
        return pc_passengerHotelName;
    }

    public void setPc_passengerHotelName(String pc_passengerHotelName) {
        this.pc_passengerHotelName = pc_passengerHotelName;
    }

    public String getPc_passengerHotelAddress() {
        return pc_passengerHotelAddress;
    }

    public void setPc_passengerHotelAddress(String pc_passengerHotelAddress) {
        this.pc_passengerHotelAddress = pc_passengerHotelAddress;
    }

    public Integer getPc_passengerRoomsRequired() {
        return pc_passengerRoomsRequired;
    }

    public void setPc_passengerRoomsRequired(Integer pc_passengerRoomsRequired) {
        this.pc_passengerRoomsRequired = pc_passengerRoomsRequired;
    }

    public LocalDateTime getPc_passengerCheckIn() {
        return pc_passengerCheckIn;
    }

    public void setPc_passengerCheckIn(LocalDateTime pc_passengerCheckIn) {
        this.pc_passengerCheckIn = pc_passengerCheckIn;
    }

    public LocalDateTime getPc_passengerCheckOut() {
        return pc_passengerCheckOut;
    }

    public void setPc_passengerCheckOut(LocalDateTime pc_passengerCheckOut) {
        this.pc_passengerCheckOut = pc_passengerCheckOut;
    }

    public String getPc_passengerRoomType() {
        return pc_passengerRoomType;
    }

    public void setPc_passengerRoomType(String pc_passengerRoomType) {
        this.pc_passengerRoomType = pc_passengerRoomType;
    }

    public List<String> getPc_documents() {
        return pc_documents;
    }

    public void setPc_documents(List<String> pc_documents) {
        this.pc_documents = pc_documents;
    }

    public String getPc_additionalNotes() {
        return pc_additionalNotes;
    }

    public void setPc_additionalNotes(String pc_additionalNotes) {
        this.pc_additionalNotes = pc_additionalNotes;
    }

    public String getPc_status() {
        return pc_status;
    }

    public void setPc_status(String pc_status) {
        this.pc_status = pc_status;
    }

    public String getPc_serviceStatus() {
        return pc_serviceStatus;
    }

    public void setPc_serviceStatus(String pc_serviceStatus) {
        this.pc_serviceStatus = pc_serviceStatus;
    }
}
