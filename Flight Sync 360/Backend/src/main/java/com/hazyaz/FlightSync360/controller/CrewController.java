package com.hazyaz.FlightSync360.controller;

import com.hazyaz.FlightSync360.model.Crew;
import com.hazyaz.FlightSync360.service.Entity.CrewService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CrewController {

    @Autowired
    CrewService crewService;


    // CONTROLLERS for all the crews
    @Operation(tags = "ET: Crew" ,description = "Shows the list of all crews")
    @GetMapping("/all-crew/{companyId}")
    public ResponseEntity<List<Crew>> all_crew(@PathVariable String companyId){
        return ResponseEntity.ok(crewService.getAllCrew(companyId));
    }

    @Operation(tags = "ET: Crew" ,description = "Allows to get single Crew")
    @GetMapping("/crew/{id}")
    public ResponseEntity<Crew> get_Single_Crew(@PathVariable String id){
        return ResponseEntity.ok(crewService.getSingleCrew(id));
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

    @Operation(tags = "ET: Crew" ,description = "delete the crews")
    @DeleteMapping("/delete-crew/{id}")
    public ResponseEntity<String> delete_crew(@PathVariable String id) {
        return ResponseEntity.ok(crewService.deleteCrew(id));
    }


}
