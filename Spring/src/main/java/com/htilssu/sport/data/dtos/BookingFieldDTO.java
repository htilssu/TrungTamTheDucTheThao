package com.htilssu.sport.data.dtos;

import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.User;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class BookingFieldDTO {
    private Long bookingId;
    private FootballField footballField;
    private User customer;
    private String customerName;
    private String customerPhone;
    private Timestamp startTime;
    private Timestamp endTime;
    private String bookingStatus;
    private Double depositAmount;
    private Double totalAmount;
}
