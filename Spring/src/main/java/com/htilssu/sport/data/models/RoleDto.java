package com.htilssu.sport.data.models;

import java.io.Serializable;

/**
 * DTO for {@link Role}
 */
public record RoleDto(Long id, String name) implements Serializable {

}