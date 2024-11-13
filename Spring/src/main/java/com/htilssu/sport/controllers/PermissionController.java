package com.htilssu.sport.controllers;

import com.htilssu.sport.data.dtos.RoleAssignRequestDto;
import com.htilssu.sport.data.dtos.RoleDetailDto;
import com.htilssu.sport.data.mappers.RoleMapper;
import com.htilssu.sport.data.models.Role;
import com.htilssu.sport.data.models.RoleDto;
import com.htilssu.sport.services.RoleService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/v1/permission")
@Tag(name = "Permission", description = "Permission API")
@RestController
@AllArgsConstructor
public class PermissionController {

    private final RoleService roleService;
    private final RoleMapper roleMapper;

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get all roles successfully",
                         content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/roles")
    public List<RoleDto> roles() {
        return roleService.getAllRoles()
                .stream()
                .map(roleMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping("roles/assign")
    public void assignRole(@RequestBody @Validated RoleAssignRequestDto request) {

        roleService.assignRole(request);
    }

    @GetMapping("/roles/{id}")
    public RoleDetailDto getRole(@PathVariable Long id) {
        final Role role = roleService.getRoleByIdOrThrow(id);
        role.setUsers(role.getUsers()
                .stream()
                .limit(20)
                .toList());
        return roleMapper.toDto1(role);
    }
}
