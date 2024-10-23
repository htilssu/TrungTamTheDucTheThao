package com.htilssu.sport.data.dtos;

import java.io.Serializable;

/**
 * DTO for {@link com.htilssu.sport.data.models.Room}
 */
public class RoomDto {
        private Long id;
        private int capacity;
        private String name;
        private int floor;
        private String building;
        private RoomTypeDto roomType;
    
        public RoomDto() {}
    
        public RoomDto(Long id, int capacity, String name, int floor, String building, RoomTypeDto roomType) {
            this.id = id;
            this.capacity = capacity;
            this.name = name;
            this.floor = floor;
            this.building = building;
            this.roomType = roomType;
        }
    
        public Long getId() {
            return id;
        }
    
        public void setId(Long id) {
            this.id = id;
        }
    
        public int getCapacity() {
            return capacity;
        }
    
        public void setCapacity(int capacity) {
            this.capacity = capacity;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public int getFloor() {
            return floor;
        }
    
        public void setFloor(int floor) {
            this.floor = floor;
        }
    
        public String getBuilding() {
            return building;
        }
    
        public void setBuilding(String building) {
            this.building = building;
        }
    
        public RoomTypeDto getRoomType() {
            return roomType;
        }
    
        public void setRoomType(RoomTypeDto roomType) {
            this.roomType = roomType;
        }
    }