package com.htilssu.sport.request;

import com.htilssu.sport.data.models.FootballField;
import com.htilssu.sport.data.models.PricingField;
import lombok.Data;

import java.util.List;

@Data
public class CreateFieldRequest {
    private FootballField field;
    private List<PricingField> prices; // Danh sách giá thuê
}
