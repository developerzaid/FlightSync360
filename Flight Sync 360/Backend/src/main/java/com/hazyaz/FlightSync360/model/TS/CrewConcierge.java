package com.hazyaz.FlightSync360.model.TS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;
@Entity

public class CrewConcierge {

    @Column(name = "uxTripId", nullable = false)
    private String uxTripId; // Universal Trip ID for

    @Id
    @GeneratedValue(generator = "Id-Generator")
    @GenericGenerator(name = "Id-Generator", strategy = "com.hazyaz.FlightSync360.util.UniqueIdGenerator")
    private String crc_serviceId;

    public String getPrefix() {
        return "TPSRV-CRC";
    }

    private String crc_serviceName;

    // Crew Members
    private Integer crc_totalCrewMembers;
    private Integer crc_pilots;
    private Integer crc_flightAttendants;

    // Hotel Arrangements
    private String crc_hotelName;
    private String crc_hotelAddress;
    private String crc_hotelContactNumber;
    private Integer crc_roomsRequired;
    private LocalDateTime crc_hotelCheckIn;
    private LocalDateTime crc_hotelCheckOut;
    private Integer crc_numberOfNights;

    // Crew Transportation
    private String crc_transportType; // VAN, SEDAN
    private String crc_transportProvider;
    private String crc_driverName;
    private String crc_driverContact;

    // Airport to Hotel
    private LocalDateTime crc_pickupTimeFromAirport;
    private String crc_pickupLocationAirport;

    // Hotel to Airport
    private LocalDateTime crc_pickupTimeFromHotel;

    private List<String> vn_documents;
    private String crc_additionalNotes;
    private String crc_serviceStatus; // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED

    public String getUxTripId() {
        return uxTripId;
    }

    public void setUxTripId(String uxTripId) {
        this.uxTripId = uxTripId;
    }

    public String getCrc_serviceId() {
        return crc_serviceId;
    }

    public void setCrc_serviceId(String crc_serviceId) {
        this.crc_serviceId = crc_serviceId;
    }

    public String getCrc_serviceName() {
        return crc_serviceName;
    }

    public void setCrc_serviceName(String crc_serviceName) {
        this.crc_serviceName = crc_serviceName;
    }

    public Integer getCrc_totalCrewMembers() {
        return crc_totalCrewMembers;
    }

    public void setCrc_totalCrewMembers(Integer crc_totalCrewMembers) {
        this.crc_totalCrewMembers = crc_totalCrewMembers;
    }

    public Integer getCrc_pilots() {
        return crc_pilots;
    }

    public void setCrc_pilots(Integer crc_pilots) {
        this.crc_pilots = crc_pilots;
    }

    public Integer getCrc_flightAttendants() {
        return crc_flightAttendants;
    }

    public void setCrc_flightAttendants(Integer crc_flightAttendants) {
        this.crc_flightAttendants = crc_flightAttendants;
    }

    public String getCrc_hotelName() {
        return crc_hotelName;
    }

    public void setCrc_hotelName(String crc_hotelName) {
        this.crc_hotelName = crc_hotelName;
    }

    public String getCrc_hotelAddress() {
        return crc_hotelAddress;
    }

    public void setCrc_hotelAddress(String crc_hotelAddress) {
        this.crc_hotelAddress = crc_hotelAddress;
    }

    public String getCrc_hotelContactNumber() {
        return crc_hotelContactNumber;
    }

    public void setCrc_hotelContactNumber(String crc_hotelContactNumber) {
        this.crc_hotelContactNumber = crc_hotelContactNumber;
    }

    public Integer getCrc_roomsRequired() {
        return crc_roomsRequired;
    }

    public void setCrc_roomsRequired(Integer crc_roomsRequired) {
        this.crc_roomsRequired = crc_roomsRequired;
    }

    public LocalDateTime getCrc_hotelCheckIn() {
        return crc_hotelCheckIn;
    }

    public void setCrc_hotelCheckIn(LocalDateTime crc_hotelCheckIn) {
        this.crc_hotelCheckIn = crc_hotelCheckIn;
    }

    public LocalDateTime getCrc_hotelCheckOut() {
        return crc_hotelCheckOut;
    }

    public void setCrc_hotelCheckOut(LocalDateTime crc_hotelCheckOut) {
        this.crc_hotelCheckOut = crc_hotelCheckOut;
    }

    public Integer getCrc_numberOfNights() {
        return crc_numberOfNights;
    }

    public void setCrc_numberOfNights(Integer crc_numberOfNights) {
        this.crc_numberOfNights = crc_numberOfNights;
    }

    public String getCrc_transportType() {
        return crc_transportType;
    }

    public void setCrc_transportType(String crc_transportType) {
        this.crc_transportType = crc_transportType;
    }

    public String getCrc_transportProvider() {
        return crc_transportProvider;
    }

    public void setCrc_transportProvider(String crc_transportProvider) {
        this.crc_transportProvider = crc_transportProvider;
    }

    public String getCrc_driverName() {
        return crc_driverName;
    }

    public void setCrc_driverName(String crc_driverName) {
        this.crc_driverName = crc_driverName;
    }

    public String getCrc_driverContact() {
        return crc_driverContact;
    }

    public void setCrc_driverContact(String crc_driverContact) {
        this.crc_driverContact = crc_driverContact;
    }

    public LocalDateTime getCrc_pickupTimeFromAirport() {
        return crc_pickupTimeFromAirport;
    }

    public void setCrc_pickupTimeFromAirport(LocalDateTime crc_pickupTimeFromAirport) {
        this.crc_pickupTimeFromAirport = crc_pickupTimeFromAirport;
    }

    public String getCrc_pickupLocationAirport() {
        return crc_pickupLocationAirport;
    }

    public void setCrc_pickupLocationAirport(String crc_pickupLocationAirport) {
        this.crc_pickupLocationAirport = crc_pickupLocationAirport;
    }

    public LocalDateTime getCrc_pickupTimeFromHotel() {
        return crc_pickupTimeFromHotel;
    }

    public void setCrc_pickupTimeFromHotel(LocalDateTime crc_pickupTimeFromHotel) {
        this.crc_pickupTimeFromHotel = crc_pickupTimeFromHotel;
    }

    public List<String> getVn_documents() {
        return vn_documents;
    }

    public void setVn_documents(List<String> vn_documents) {
        this.vn_documents = vn_documents;
    }

    public String getCrc_additionalNotes() {
        return crc_additionalNotes;
    }

    public void setCrc_additionalNotes(String crc_additionalNotes) {
        this.crc_additionalNotes = crc_additionalNotes;
    }

    public String getCrc_serviceStatus() {
        return crc_serviceStatus;
    }

    public void setCrc_serviceStatus(String crc_serviceStatus) {
        this.crc_serviceStatus = crc_serviceStatus;
    }
}
