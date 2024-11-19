import { useState } from 'react';
import EditEmployeeForm from "./EditEmployeeForm.jsx";
import AddEmployeeForm from "./AddEmployeeForm.jsx";
import EmployeeList from "./EmployeeList.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
import Modal from "../../library-admin/ModalDetail.jsx";
import ModalConfirmation from "../../library-admin/ModalConfirmDelete.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EmployeeLayout = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // Thêm huấn luyện viên
    const addEmployee = (employee) => {
        setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
        setIsAdding(false);
    };

    // Cập nhật huấn luyện viên
    const updateEmployee = async (updatedEmployee) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/coach/edit/${updatedEmployee.id}`,
                updatedEmployee
            );
            if (response.status === 200) {
                setEmployees(
                    employees.map((employee) =>
                        employee.id === updatedEmployee.id ? response.data : employee
                    )
                );
                setEditingEmployee(null);
                toast.success("Cập nhật huấn luyện viên thành công!");
            } else {
                toast.error("Không thể cập nhật huấn luyện viên. Vui lòng thử lại.");
            }
        } catch  {
            toast.error("Có lỗi xảy ra khi cập nhật huấn luyện viên.");
        }
    };

    // Bắt đầu chỉnh sửa huấn luyện viên
    const editEmployee = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/coach/${id}`);
            setEditingEmployee(response.data);
        } catch  {
            toast.error("Không thể lấy thông tin huấn luyện viên.");
        }
    };

    // Xem chi tiết huấn luyện viên
    const viewEmployee = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/coach/${id}`);
            setSelectedEmployee(response.data);
        } catch  {
            toast.error("Không thể lấy thông tin huấn luyện viên.");
        }
    };

    

    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/coach/delete/${id}`);
            if (response.status === 200) {
                setEmployees(employees.filter((employee) => employee.id !== id));
            } else {
                toast.success("Xóa huấn luyện viên thành công!");
            }
        } catch {
            toast.error("Có lỗi xảy ra khi xóa huấn luyện viên.");
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="container mx-auto p-10 bg-gray-100 rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-primaryColor mb-2">
                    Quản Lý Huấn Luyện Viên
                </h1>

                <div className="flex justify-between items-center mb-6">
                    {!isAdding && !editingEmployee && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Thêm Huấn Luyện viên
                        </button>
                    )}

                    {editingEmployee && (
                        <EditEmployeeForm
                            employee={editingEmployee}
                            updateEmployee={updateEmployee}
                            cancelEdit={() => setEditingEmployee(null)}
                        />
                    )}
                </div>

                <Modal isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)}>
                    <EmployeeDetail employee={selectedEmployee} />
                </Modal>

                {isAdding && (
                    <AddEmployeeForm addEmployee={addEmployee} cancelAdd={() => setIsAdding(false)} />
                )}

                <div className="mb-6">
                    <EmployeeList
                        employees={employees}
                        editEmployee={editEmployee}
                        viewEmployee={viewEmployee}
                        deleteEmployee={deleteEmployee} // Truyền hàm xóa

                        />
                </div>
            </div>

            {/* Modal xác nhận xóa */}
            <ModalConfirmation
                isOpen={isConfirmingDelete}
                onClose={() => setIsConfirmingDelete(false)}
                onConfirm={deleteEmployee}
                employeeName={
                    employees.find((employee) => employee.id === employeeToDelete)?.name || ''
                }
            />
        </div>
    );
};

export default EmployeeLayout;
