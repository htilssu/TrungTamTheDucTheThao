package com.htilssu.sport.data.mappers;

import com.htilssu.sport.data.dtos.BookingDto;
import com.htilssu.sport.data.models.Booking;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface BookingMapper {

    @Mapping(source = "Room.RoomType", target = "idRoom.idRoomType")
    @Mapping(source = "Room", target = "idRoom")
    @Mapping(source = "User", target = "idUser")
    Booking toEntity(BookingDto bookingDto);
    @InheritInverseConfiguration(name = "toEntity")
    BookingDto toDto(Booking booking);
    @InheritConfiguration(name = "toEntity")
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Booking partialUpdate(
            BookingDto bookingDto,
            @MappingTarget Booking booking);
}