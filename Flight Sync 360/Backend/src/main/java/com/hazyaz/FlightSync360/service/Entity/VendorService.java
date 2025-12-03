package com.hazyaz.FlightSync360.service.Entity;

import com.hazyaz.FlightSync360.model.Vendor;
import com.hazyaz.FlightSync360.repository.Entity.VendorRepository;
import com.hazyaz.FlightSync360.util.FieldsUpdater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Service
public class VendorService {

    @Autowired
    VendorRepository vendorRepository;
    @Autowired
    FieldsUpdater fieldsUpdater;

    public List<Vendor> getAllVendor(String CompanyId){
       return vendorRepository.findAllByUxUniversalCompanyId(CompanyId);
    }
    public Vendor getSingleVendor(String id){
        return vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    public Vendor addVendor(Vendor vendor){
        return vendorRepository.save(vendor);
    }

    public Vendor updateVendor(String id, Map<String, Object> updates){
        Vendor existingVendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));

        Class<?> clazz = Vendor.class;
        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String fieldName = entry.getKey();
            Object value = entry.getValue();

            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);

                Object converted = fieldsUpdater.convertValue(field.getType(), value);
                field.set(existingVendor, converted);

            } catch (NoSuchFieldException e) {
                System.out.println("Skipping unknown field: " + fieldName);
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        return vendorRepository.save(existingVendor);
    }

    public String deleteVendor(String id){
        return "Vendor Deleted";
    }

}
