package com.hazyaz.FlightPulse360.service.Entity;

import com.hazyaz.FlightPulse360.model.Crew;
import com.hazyaz.FlightPulse360.repository.Entity.CrewRepository;
import com.hazyaz.FlightPulse360.util.FieldsUpdater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class CrewService {

    @Autowired
    CrewRepository crewRepository;

    @Autowired
    FieldsUpdater fieldsUpdater;

    public List<Crew> getAllCrew(String CompanyId){
       return crewRepository.findAllByUxUniversalCompanyId(CompanyId);
    }

    public Crew getSingleCrew(String id){
        return crewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crew not found"));
    }

    public Crew updateCrew(String id, Map<String, Object> updates){
        Crew existingCrew = crewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crew not found"));

        Class<?> clazz = Crew.class;
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String fieldName = entry.getKey();
            Object value = entry.getValue();

            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);

                Object converted = fieldsUpdater.convertValue(field.getType(), value);
                field.set(existingCrew, converted);

            } catch (NoSuchFieldException e) {
                System.out.println("Skipping unknown field: " + fieldName);
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        return crewRepository.save(existingCrew);
    }

    public Crew addCrew(Crew crew){
        return crewRepository.save(crew);
    }

    public String deleteCrew(String id){
        crewRepository.deleteById(id);
        return "File Deleted";
    }

}
