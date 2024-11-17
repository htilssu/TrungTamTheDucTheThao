import {useEffect, useState} from 'react';
import SearchBar from "./components/SearchBar.jsx";
import RolesManager from "./RolesManager.jsx";
import AdminTable from "./components/AdminTable.jsx";
import AdminEditModal from "./components/AdminEditModal.jsx";
import AdminDeleteModal from "./components/AdminDeleteModal.jsx";

const RolesUser = () => {
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [isRolesManagerOpen, setIsRolesManagerOpen] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            const data = [{id: 1, name: 'Nguyễn Văn A', email: 'admin1@example.com', role: 'Admin'}, {
                id: 2,
                name: 'Trần Thị B',
                email: 'admin2@example.com',
                role: 'Admin'
            }, {id: 3, name: 'Lê Văn C', email: 'admin3@example.com', role: 'HLV'}, {
                id: 4,
                name: 'Phạm Thị D',
                email: 'admin4@example.com',
                role: 'Super-Admin'
            },];
            setAdmins(data);
            setFilteredAdmins(data);
        };
        fetchAdmins();
    }, []);

    useEffect(() => {
        const filtered = admins.filter((admin) => admin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredAdmins(filtered);
    }, [searchTerm, admins]);

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setNewRole(admin.role);
    };

    const handleSave = () => {
        setAdmins((prevAdmins) => prevAdmins.map((admin) => admin.id === editingAdmin.id ? {
            ...admin,
            role: newRole
        } : admin));
        setEditingAdmin(null);
    };

    const handleDelete = () => {
        if (adminToDelete) {
            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminToDelete.id));
            setAdminToDelete(null);
        }
    };

    const toggleRolesManager = () => {
        setIsRolesManagerOpen(!isRolesManagerOpen);
    };

    const handleRolesUpdate = (updatedRoles) => {
        setRoles(updatedRoles);
    };

    return (<div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl text-center font-semibold text-gray-800 mb-6">Phân Quyền Hệ Thống</h1>
            <button
                onClick={toggleRolesManager}
                className={`py-2 px-6 rounded-lg text-white transition-all duration-300 mb-2 
                ${isRolesManagerOpen ? 'bg-gray-400 hover:bg-gray-500' : 'bg-emerald-500 hover:bg-emerald-600'}`}
            >
                {isRolesManagerOpen ? "Đóng Quản Lý Vai Trò" : "Quản Lý Vai Trò"}
            </button>
            {isRolesManagerOpen && <RolesManager onRolesUpdate={handleRolesUpdate}/>}

            <div className={"bg-white rounded-xl p-4"}>
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Danh sách Admin</h1>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

                <AdminTable admins={admins} filteredAdmins={filteredAdmins} handleEdit={handleEdit}
                            handleDelete={setAdminToDelete}/>
            </div>

            {editingAdmin && (<AdminEditModal
                    editingAdmin={editingAdmin}
                    roles={roles}
                    newRole={newRole}
                    setNewRole={setNewRole}
                    handleSave={handleSave}
                    handleClose={() => setEditingAdmin(null)}
                />)}

            {adminToDelete && (<AdminDeleteModal
                    adminToDelete={adminToDelete}
                    handleDelete={handleDelete}
                    handleClose={() => setAdminToDelete(null)}
                />)}
        </div>);
};

export default RolesUser;
