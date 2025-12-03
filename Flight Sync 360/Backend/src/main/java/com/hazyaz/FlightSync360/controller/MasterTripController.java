package com.hazyaz.FlightSync360.controller;

import com.hazyaz.FlightSync360.dto.MasterTripRequest;
import com.hazyaz.FlightSync360.model.MasterTrip;
import com.hazyaz.FlightSync360.service.MasterTripService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class MasterTripController {

    @Autowired
    private MasterTripService masterTripService;

    @Operation(tags = "Master" ,description = "add single master trip")
    @PostMapping("/add-masterTrip")
    public ResponseEntity<MasterTrip> add_singleMasterTrip(@RequestBody MasterTripRequest masterTrip) {
        return ResponseEntity.ok(masterTripService.createMasterTrip(masterTrip));
    }

    @Operation(tags = "Master" ,description = "get Single master trip")
    @GetMapping("/masterTrip/{tripId}")
    public ResponseEntity<Optional<MasterTripRequest>> get_singleMasterTrip(@PathVariable String tripId) {
        return ResponseEntity.ok(masterTripService.getMasterTripWithServices(tripId));
    }

    @Operation(tags = "Master" ,description = "Update the details ")
    @PutMapping("/masterTrip/{tripId}")
    public ResponseEntity<MasterTrip> update_singleMasterTrip(@PathVariable String tripId, @RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(masterTripService.updateMasterTrip(tripId, updates));
    }


    @Operation(tags = "Master" ,description = "Delete the master trip")
    @DeleteMapping("/masterTrip/{tripId}")
    public String delete_masterTrip(String tripId) {
        masterTripService.deleteMasterTrip(tripId);
        return "Trip Deleted";
    }


}
