import { useState } from 'react';
import axios from 'axios';

const EditCustomer = ({ user, updateUser, deleteCustomer, cancelEdit }) => {
    const [updatedUser, setUpdatedUser] = useState(user);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Nếu là ngày sinh, chuyển đổi lại định dạng ngày
        if (name === 'dob') {
            const formattedDate = new Date(value).toISOString().split('T')[0]; // Chuyển đổi về định dạng YYYY-MM-DD
            setUpdatedUser({
                ...updatedUser,
                [name]: formattedDate,
            });
        } else {
            setUpdatedUser({
                ...updatedUser,
                [name]: value,
            });
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }

        // Kiểm tra sự khớp giữa mật khẩu và xác nhận mật khẩu
        if (password !== confirmPassword) {
            setPasswordError('Mật khẩu và xác nhận mật khẩu không khớp');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
        if (password !== confirmPassword) {
            setPasswordError('Mật khẩu và xác nhận mật khẩu không khớp');
            return;
        }

        try {
            // Gửi yêu cầu PUT đến API để cập nhật thông tin người dùng
            const response = await axios.put(`/api/accounts/${updatedUser.id}`, {
                email: updatedUser.email, // Giữ nguyên email
                password: password, // Chỉ gửi mật khẩu nếu có thay đổi
                user: {
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    dob: updatedUser.dob,
                    gender: updatedUser.gender,
                    phoneNumber: updatedUser.phone,
                }
            });

            // Sau khi cập nhật thành công, thực hiện các hành động như cập nhật localStorage và thông báo
            updateUser(response.data); // Cập nhật dữ liệu người dùng trong state
            localStorage.setItem('user', JSON.stringify(response.data)); // Cập nhật localStorage
            alert('Cập nhật thành công!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin người dùng.');
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
        if (!confirmed) return;
    
        try {
            // Gửi yêu cầu DELETE đến API để xóa người dùng
            await axios.delete(`/api/accounts/${updatedUser.id}`);
            deleteCustomer(updatedUser.id); // Xóa người dùng khỏi state
            alert('Xóa thành công!');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Có lỗi xảy ra khi xóa người dùng.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="bg-white max-w-4xl w-full shadow-lg rounded-lg px-8 py-6 mb-8 mt-2">
            <h2 className="flex text-2xl font-semibold mb-6 text-center">Edit User</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    name="firstName"
                    value={updatedUser.firstName || ""}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName || ""}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                    disabled
                />
                <input
                    type="tel"
                    name="phone"
                    value={updatedUser.phone || ""}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="date"
                    name="dob"
                    value={updatedUser.dob || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <select
                    name="gender"
                    value={updatedUser.gender || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {/* Mật khẩu */}
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />

                {/* Xác nhận mật khẩu */}
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                )}
            </div>
            <div className="flex flex-col justify-between items-center md:flex-row md:space-x-4">
                <div className="flex gap-4 w-full">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Update User
                    </button>
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
                <div className="w-full mt-4 md:mt-0">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Delete User
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditCustomer;
