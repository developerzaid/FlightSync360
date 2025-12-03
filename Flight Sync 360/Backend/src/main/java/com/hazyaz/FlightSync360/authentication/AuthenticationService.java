package com.hazyaz.FlightSync360.authentication;

import com.hazyaz.FlightSync360.dto.UserLogin;
import com.hazyaz.FlightSync360.dto.UserRegistration;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

   public void loginUserWithDetails(UserLogin userLogin){
       String ur_email =  userLogin.getUr_email();
       String ur_password = userLogin.getUr_password();

       // Do some calculations
   }
    public void RegisterUserWithDetails(UserRegistration userRegistration){


        // Do some calculations
    }

}
