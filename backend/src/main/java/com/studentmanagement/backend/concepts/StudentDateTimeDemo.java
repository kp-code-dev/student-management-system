package com.studentmanagement.backend.concepts;

// Unit 4: Java Utility Classes
// Topics: Date, TimeZone, Calendar and GregorianCalendar

import java.util.Date;
import java.util.TimeZone;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class StudentDateTimeDemo {

    public static void main(String[] args) {

        // Unit 4: Date Class
        // Displays the current date and time.
        Date currentDate = new Date();

        System.out.println("Current Date: " + currentDate);

        // Unit 4: TimeZone Class
        // Displays the default system time zone.
        TimeZone timeZone = TimeZone.getDefault();

        System.out.println("Time Zone: " + timeZone.getID());

        // Unit 4: Calendar Class
        // Gets the current date using Calendar.
        Calendar calendar = Calendar.getInstance();

        System.out.println("Year: " +
                calendar.get(Calendar.YEAR));

        System.out.println("Month: " +
                (calendar.get(Calendar.MONTH) + 1));

        System.out.println("Day: " +
                calendar.get(Calendar.DAY_OF_MONTH));

        // Unit 4: GregorianCalendar Class
        // Creates a calendar with a specific date.
        GregorianCalendar examDate =
                new GregorianCalendar(2026, Calendar.NOVEMBER, 15);

        System.out.println("Exam Year: " +
                examDate.get(Calendar.YEAR));

        System.out.println("Exam Month: " +
                (examDate.get(Calendar.MONTH) + 1));

        System.out.println("Exam Day: " +
                examDate.get(Calendar.DAY_OF_MONTH));
    }
}