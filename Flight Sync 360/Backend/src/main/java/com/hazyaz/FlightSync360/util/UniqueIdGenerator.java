package com.hazyaz.FlightSync360.util;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public class UniqueIdGenerator implements IdentifierGenerator {

    public UniqueIdGenerator(){}

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) {

        String prefix;
        try {
            prefix = (String) object.getClass()
                    .getMethod("getPrefix")
                    .invoke(object);
        } catch (Exception e) {
            throw new RuntimeException("Prefix method missing", e);
        }

        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyddSSS"));

        String random = generateRandomCode(4); // 4 chars like AB9F

        return prefix + "-" + timestamp + "-" + random;
    }




    private String generateRandomCode(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }

        return sb.toString();
    }

}
