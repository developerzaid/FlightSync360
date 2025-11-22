package com.hazyaz.FlightPulse360.service;

import com.hazyaz.FlightPulse360.model.Aircraft;
import com.hazyaz.FlightPulse360.repository.AircraftRepository;
import com.hazyaz.FlightPulse360.util.FieldsUpdater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class AircraftService{

    @Autowired
    AircraftRepository aircraftRepository;

    @Autowired
    FieldsUpdater fieldsUpdater;


    public void addAircraft(Aircraft aircraft){
       aircraftRepository.save(aircraft);
    }

    public List<Aircraft> getAllAircraft(){
        return aircraftRepository.findAll();
    }

    public Aircraft updateAircraft(String id, Map<String,Object> updates){
        Aircraft existingAircraft = aircraftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));

        Class<?> clazz = Aircraft.class;
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String fieldName = entry.getKey();
            Object value = entry.getValue();

            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);

                Object converted = fieldsUpdater.convertValue(field.getType(), value);
                field.set(existingAircraft, converted);

            } catch (NoSuchFieldException e) {
                System.out.println("Skipping unknown field: " + fieldName);
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        return aircraftRepository.save(existingAircraft);
    }

    public String deleteAircraft(String id){
        aircraftRepository.deleteById(id);
        return "Flight Deleted";
    }



}
