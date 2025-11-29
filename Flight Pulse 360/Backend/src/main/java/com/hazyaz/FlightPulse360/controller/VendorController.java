package com.hazyaz.FlightPulse360.controller;

import com.hazyaz.FlightPulse360.model.Vendor;
import com.hazyaz.FlightPulse360.service.Entity.VendorService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class VendorController {

    @Autowired
    VendorService vendorService;

    // CONTROLLERS FOR LOGING IN USER
    @Operation(tags = "ET: Vendor" ,description = "shows all the vendors in the list")
    @GetMapping("/all-vendor/{companyId}")
    public ResponseEntity<List<Vendor>> all_vendor(@PathVariable String companyId){
        return ResponseEntity.ok(vendorService.getAllVendor(companyId));
    }

    @Operation(tags = "ET: Vendor" ,description = "Allows to get single vendor")
    @GetMapping("/vendor/{id}")
    public ResponseEntity<Vendor> get_Single_vendor(@PathVariable String id){
        return ResponseEntity.ok(vendorService.getSingleVendor(id));
    }

    // CONTROLLERS FOR SIGNING UP NEW USER
    @Operation(tags = "ET: Vendor" ,description = "Helps in adding new vendor")
    @PostMapping("/add-vendor")
    public ResponseEntity<Vendor> add_vendor(@RequestBody Vendor vendor){
        return ResponseEntity.ok(vendorService.addVendor(vendor));
    }

    // CONTROLLERS FOR SIGNING UP NEW USER
    @Operation(tags = "ET: Vendor" ,description = "Helps in updating the new vendor")
    @PutMapping("/update-vendor/{id}")
    public ResponseEntity<Vendor> update_vendor(@PathVariable String id, @RequestBody Map<String, Object> updates){
        return ResponseEntity.ok(vendorService.updateVendor(id,updates));
    }

    @Operation(tags = "ET: Vendor" ,description = "Helps in deleting the vendor")
    @DeleteMapping("/delete-vendor/{id}")
    public ResponseEntity<String> update_vendor(@PathVariable String id){
        return ResponseEntity.ok(vendorService.deleteVendor(id));
    }


}
