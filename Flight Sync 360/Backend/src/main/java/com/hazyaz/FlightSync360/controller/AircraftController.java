package com.hazyaz.FlightSync360.controller;

import com.hazyaz.FlightSync360.model.Aircraft;
import com.hazyaz.FlightSync360.service.Entity.AircraftService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class AircraftController {

    @Autowired
    AircraftService aircraftService;

    @Operation(tags = "ET: Aircraft" ,description = "Allows the user to add new aircraft")
    @PostMapping("/add-aircraft")
    public Aircraft add_aircraft(@RequestBody Aircraft aircraft){
        aircraftService.addAircraft(aircraft);
        return aircraft;
    }

    @Operation(tags = "ET: Aircraft" ,description = "Allows the user to see all the aircraft")
    @GetMapping("/all-aircraft/{companyId}")
    public ResponseEntity<List<Aircraft>> all_aircraft(@PathVariable String companyId){
        return ResponseEntity.ok(aircraftService.getAllAircraft(companyId));
    }

    @Operation(tags = "ET: Aircraft" ,description = "Allows to get single aircraft")
    @GetMapping("/aircraft/{id}")
    public ResponseEntity<Aircraft> get_Single_aircraft(@PathVariable String id){
        return ResponseEntity.ok(aircraftService.getSingleAircraft(id));
    }
    @Operation(tags = "ET: Aircraft" ,description = "Allows the update aircraft")
    @PutMapping("/update-aircraft/{id}")
    public ResponseEntity<Aircraft> update_aircraft(@PathVariable String id, @RequestBody Map<String,Object> updates){
        return ResponseEntity.ok(aircraftService.updateAircraft(id, updates));
    }

    @Operation(tags = "ET: Aircraft" ,description = "Allows the Delete aircraft")
    @DeleteMapping("/delete-aircraft/{id}")
    public ResponseEntity<String> delete_aircraft(@PathVariable String id){
        return ResponseEntity.ok(aircraftService.deleteAircraft(id));
    }





}
