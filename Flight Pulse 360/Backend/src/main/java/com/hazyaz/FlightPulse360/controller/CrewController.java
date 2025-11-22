package com.hazyaz.FlightPulse360.controller;

import com.hazyaz.FlightPulse360.dto.UserLogin;
import com.hazyaz.FlightPulse360.model.Crew;
import com.hazyaz.FlightPulse360.service.CrewService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;
import java.util.Map;

@RestController
public class CrewController {

    @Autowired
    CrewService crewService;


    // CONTROLLERS for all the crews
    @Operation(tags = "ET: Crew" ,description = "Shows the list of all crews")
    @GetMapping("/all-crew")
    public ResponseEntity<List<Crew>> all_crew(){
        return ResponseEntity.ok(crewService.getAllCrew());
    }

    // CONTROLLERS adding new crew
    @Operation(tags = "ET: Crew" ,description = "add the new crews")
    @PostMapping("/add-crew")
    public ResponseEntity<Crew> add_crew(@RequestBody Crew crew) {
        return ResponseEntity.ok(crewService.addCrew(crew));
    }

    @Operation(tags = "ET: Crew" ,description = "Update the crews")
    @PutMapping("/update-crew/{id}")
    public ResponseEntity<Crew> update_crew(@PathVariable String id, @RequestBody Map<String,Object> updates) {
        return ResponseEntity.ok(crewService.updateCrew(id, updates));
    }

    @Operation(tags = "ET: Crew" ,description = "Update the crews")
    @DeleteMapping("/delete-crew/{id}")
    public ResponseEntity<String> delete_crew(@PathVariable String id) {
        return ResponseEntity.ok(crewService.deleteCrew(id));
    }


}
