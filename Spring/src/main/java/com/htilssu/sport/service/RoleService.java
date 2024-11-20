package com.htilssu.sport.service;

import com.htilssu.sport.data.dtos.RoleAssignRequestDto;
import com.htilssu.sport.data.models.Role;
import com.htilssu.sport.data.models.User;
import com.htilssu.sport.exception.NotFoundException;
import com.htilssu.sport.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final UserService userService;
    public static final String DEFAULT_ROLE = "USER";

    public RoleService(RoleRepository roleRepository, UserService userService) {
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    public Collection<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public void assignRole(RoleAssignRequestDto request) {
        var role = getRoleByIdOrThrow(request.getRoleId());
        var user = userService.getUserByIdOrThrow(request.getUserId());

        role.setRole(user);
        roleRepository.save(role);
    }

    private Role getDefaultRole() {
        return roleRepository.findByName("USER")
                .orElseThrow(() -> new NotFoundException("Default role not found"));
    }

    public Role getRoleByIdOrThrow(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new NotFoundException("Role not found"));
    }

    public void assignRole(User user, String role) {
        if (role.equals(DEFAULT_ROLE)) {
            var defaultRole = getDefaultRole();
            defaultRole.setRole(user);
            roleRepository.save(defaultRole);
        }
        else {
            throw new NotFoundException("Role not found");
        }
    }
}
