const RolesList = ({ roles, onEditRole, onDeleteRole }) => {
    return (
        <div className="mb-6 px-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Danh Sách Vai Trò</h2>

            {/* Table to display roles */}
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-xl">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th> {/* Display ID */}
                    <th className="py-3 px-6 text-left">Tên Vai Trò</th>
                    <th className="py-3 px-6 text-left">Mô Tả</th>
                    <th className="py-3 px-6 text-left">Hành Động</th>
                </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                {roles?.length > 0 ? (
                    roles.map((role) => (
                        <tr key={role.id} className="border-b border-gray-200 hover:bg-gray-100">
                            {/* Display the role ID */}
                            <td className="py-3 px-6 text-left">{role.id}</td>
                            <td className="py-3 px-6 text-left">{role.name}</td>
                            <td className="py-3 px-6 text-left">{role.description}</td>
                            <td className="py-3 px-6 text-left">
                                {/* Edit Button */}
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-600 transition-all duration-300"
                                    onClick={() => onEditRole(role)}
                                >
                                    Sửa
                                </button>

                                {/* Delete Button */}
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-all duration-300"
                                    onClick={() => onDeleteRole(role.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="py-3 px-6 text-center text-gray-500">
                            Không có vai trò nào.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default RolesList;
