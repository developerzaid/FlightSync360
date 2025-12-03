package com.hazyaz.FlightSync360.authentication;


import com.hazyaz.FlightSync360.dto.UserLogin;
import com.hazyaz.FlightSync360.dto.UserRegistration;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {


    @Autowired
    UserRegistration userRegistration;

    @Autowired
    AuthenticationService authenticationService;

    // CONTROLLERS FOR LOGING IN USER
    @Operation(tags = "Authentication " ,description = "shows the login screen for the user")
    @PostMapping("/login")
    public String auth_login(@RequestBody UserLogin userLogin){

        return "This is a login screen";
    }


    // CONTROLLERS FOR SIGNING UP NEW USER
    @Operation(tags = "Authentication " ,description = "When user submits thier details from the frontend")
    @PostMapping("/register")
    public String auth_register(@RequestBody UserRegistration userRegistration){
        authenticationService.RegisterUserWithDetails(userRegistration);
        return "This is a registration screen";
    }

}
