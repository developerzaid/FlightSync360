package com.hazyaz.FlightPulse360.controller;

import com.hazyaz.FlightPulse360.model.MasterTrip;
import com.hazyaz.FlightPulse360.service.MasterTripService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class MasterTripController {

    @Autowired
    private MasterTripService masterTripService;

    @Operation(tags = "Master" ,description = "add single master trip")
    @PostMapping("/add-masterTrip")
    public ResponseEntity<MasterTrip> add_singleMasterTrip(@RequestBody MasterTrip masterTrip) {
        return ResponseEntity.ok(masterTripService.addMasterTrip(masterTrip));
    }

    @Operation(tags = "Master" ,description = "get Single master trip")
    @GetMapping("/masterTrip/{tripId}")
    public ResponseEntity<MasterTrip> get_singleMasterTrip(@PathVariable String tripId) {
        return ResponseEntity.ok(masterTripService.getSingleMasterTrip(tripId));
    }

    @Operation(tags = "Master" ,description = "get all the trips from a single user")
    @GetMapping("/masterTrip/{companyId}")
    public ResponseEntity<List<MasterTrip>> get_AllMasterTrip(@PathVariable String companyId) {
        return ResponseEntity.ok(masterTripService.getAllMasterTrip(companyId));
    }

    @Operation(tags = "Master" ,description = "Delete the master trip")
    @PostMapping("/masterTrip")
    public ResponseEntity<MasterTrip> add_masterTrip(MasterTrip masterTrip) {
        return ResponseEntity.ok(masterTripService.addMasterTrip(masterTrip));
    }

//    @Operation(tags = "Master" ,description = "Delete the master trip")
//    @PutMapping("/masterTrip/{tripId}")
//    public ResponseEntity<Map<String,Object> >update_masterTrip(String tripId, Map<String, Object> MasterUpdates) {
//        return ResponseEntity.ok(masterTripService.updateMasterTrip(tripId, MasterUpdates));
//    }

    @Operation(tags = "Master" ,description = "Delete the master trip")
    @DeleteMapping("/masterTrip/{tripId}")
    public String delete_masterTrip(String tripId) {
        return masterTripService.deleteMasterTrip(tripId);
    }


}
