package com.hazyaz.FlightSync360.controller;

import com.hazyaz.FlightSync360.model.Client;
import com.hazyaz.FlightSync360.service.Entity.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ClientController {


    @Autowired
    ClientService clientService;

    // CONTROLLERS for all the crews
    @Operation(tags = "ET: Client", description = "Shows the list of all client")
    @GetMapping("/all-client/{companyId}")
    public ResponseEntity<List<Client>> all_client(@PathVariable String companyId) {
        return ResponseEntity.ok(clientService.getAllClient(companyId));
    }


    @Operation(tags = "ET: Client" ,description = "Allows to get single Client")
    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> get_Single_Client(@PathVariable String id){
        return ResponseEntity.ok(clientService.getSingleClient(id));
    }

    // CONTROLLERS adding new crew
    @Operation(tags = "ET: Client", description = "add the new client")
    @PostMapping("/add-client")
    public ResponseEntity<Client> add_client(@RequestBody Client client) {
        return ResponseEntity.ok(clientService.addClient(client));
    }

    @Operation(tags = "ET: Client" ,description = "Update the Client")
    @PutMapping("/update-client/{id}")
    public ResponseEntity<Client> update_client(@PathVariable String id, @RequestBody Map<String,Object> updates) {
        return ResponseEntity.ok(clientService.updateClient(id, updates));
    }

    @Operation(tags = "ET: Client" ,description = "delete the Client")
    @DeleteMapping("/delete-client/{id}")
    public ResponseEntity<String> delete_client(@PathVariable String id) {
        return ResponseEntity.ok(clientService.deleteClient(id));
    }


}