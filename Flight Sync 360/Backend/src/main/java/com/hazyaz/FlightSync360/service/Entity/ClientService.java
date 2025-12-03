package com.hazyaz.FlightSync360.service.Entity;

import com.hazyaz.FlightSync360.model.Client;
import com.hazyaz.FlightSync360.repository.Entity.ClientRepository;
import com.hazyaz.FlightSync360.util.FieldsUpdater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    FieldsUpdater fieldsUpdater;

    public List<Client> getAllClient(String CompanyId){
        return clientRepository.findAllByUxUniversalCompanyId(CompanyId);
    }

    public Client getSingleClient(String id){
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    public Client updateClient(String id, Map<String, Object> updates){
        Client existingCrew = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Class<?> clazz = Client.class;
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
        return clientRepository.save(existingCrew);
    }



    public Client addClient(Client client){
        return clientRepository.save(client);
    }

    public String deleteClient(String id){
        clientRepository.deleteById(id);
        return "Client Deleted";
    }

}
