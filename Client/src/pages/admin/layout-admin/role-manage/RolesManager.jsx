import { useState, useEffect } from 'react';
import RoleForm from "./components/RoleForm.jsx";
import RolesList from "./components/RolesList.jsx";
import EditRoleModal from "./components/EditRoleModal.jsx";

const RolesManager = ({ onRolesUpdate }) => {
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', description: 'Quản lý toàn bộ hệ thống' },
        { id: 2, name: 'User', description: 'Người dùng có quyền truy cập cơ bản' },
    ]);
    const [editingRole, setEditingRole] = useState(null);

    useEffect(() => {
        // Propagate the roles to parent component when updated
        onRolesUpdate(roles);
    }, [roles, onRolesUpdate]);

    const handleAddRole = (name, description) => {
        if (name.trim() && description.trim()) {
            const newRole = { id: Date.now(), name, description };
            setRoles((prevRoles) => [...prevRoles, newRole]);
        }
    };

    const handleEditRole = (role) => {
        setEditingRole(role);
    };

    const handleSaveEdit = (updatedRole) => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === updatedRole.id ? updatedRole : role
            )
        );
        setEditingRole(null);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg mb-10">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Quản Lý Vai Trò</h1>
            <RoleForm onAddRole={handleAddRole} roles={roles} />
            <RolesList roles={roles} onEditRole={handleEditRole} />
            {editingRole && (
                <EditRoleModal
                    role={editingRole}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingRole(null)}
                />
            )}
        </div>
    );
};

export default RolesManager;
