package com.htilssu.sport.data.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookingStatisticsDTO {
    private String status;
    private Long count;

    private Double paidRevenue;
    private Double unpaidRevenue;

    private Long fieldId;
    private Long fieldBookingCount;
    private Double fieldRevenue;

    private String date;
    private Long dailyBookingCount;
    private Double dailyRevenue;

}

