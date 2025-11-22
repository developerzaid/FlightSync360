package com.hazyaz.FlightPulse360.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class FieldsUpdater {


    public Object convertValue(Class<?> targetType, Object value) {
        if (value == null) return null;

        if (targetType.equals(Integer.class) || targetType.equals(int.class)) {
            return Integer.valueOf(value.toString());
        } else if (targetType.equals(Long.class) || targetType.equals(long.class)) {
            return Long.valueOf(value.toString());
        } else if (targetType.equals(LocalDate.class)) {
            return LocalDate.parse(value.toString());
        }

        return value; // String or anything else
    }



}
