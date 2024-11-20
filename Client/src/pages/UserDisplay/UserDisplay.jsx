import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import {wGet, wPut} from "../../utils/request.util.js";

const UserDisplay = () => {
    const {id} = useParams(); // Lấy ID từ URL
    const history = useNavigate();
    const {user, setUser} = useContext(UserContext); // Lấy context
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [originalDob, setOriginalDob] = useState(""); // Thêm biến trạng thái cho ngày sinh gốc
    // Thêm state cho việc hiển thị thông báo
    const [fadeOut, setFadeOut] = useState(false); // Thêm state cho việc mờ dần
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return "";
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const formatDateToDisplay = (dateString) => {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return "";
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const validateForm = () => {
        const errors = {};
        if (!user.firstName.trim()) errors.firstName = "Họ không được để trống.";
        if (!user.lastName.trim()) errors.lastName = "Tên không được để trống.";
        if (!user.phoneNumber.trim()) {
            errors.phoneNumber = "Số điện thoại không được để trống.";
        } else if (user.phoneNumber.length !== 10) {
            errors.phoneNumber = "Số điện thoại phải có 10 chữ số.";
        } else if (!/^\d+$/.test(user.phoneNumber)) {
            errors.phoneNumber = "Số điện thoại chỉ được chứa số.";
        }

        // Kiểm tra ngày sinh
        if (!user.dob) {
            errors.dob = "Ngày sinh không được để trống.";
        } else {
            const today = new Date();
            const dob = new Date(user.dob);
            let age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (age < 16) {
                errors.dob = "Người dùng phải từ 16 tuổi trở lên.";
            }
        }
        return errors;
    };

    // Fetch user data
    useEffect(() => {
        wGet(`/user/${id}`)
            .then(async response => {
                const data = await response.json()
                setUser(data); // Lưu dữ liệu người dùng vào context
                setOriginalDob(data.dob); // Lưu lại ngày sinh ban đầu
                setAvatarUrl(data.avatar); // Set the avatar URL in state
                setLoading(false);
            })
            .catch(error => {
                setError("Không tìm thấy người dùng");
                setLoading(false);
            });
    }, [id, setUser]);
//Xử lý sự kiện lưu
    const handleSave = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        setSaving(true);

        const updatedUser = {
            ...user,
            dob: user.dob || originalDob,
            avatar: avatarUrl, // Send the updated avatar URL to the backend
        };
        wPut(`/user/${id}`, updatedUser)
            .then(async (response) => {
                const data = await response.json()
                setUser(data);
                setIsEditing(false);
                setSaving(false);
                setValidationErrors({});
                // Đặt lại trạng thái trước khi hiển thị thông báo
                setFadeOut(false);
                setShowSuccessMessage(true);

                // Bắt đầu mờ dần sau 1 giây
                setTimeout(() => setFadeOut(true), 1000);

                // Ẩn thông báo sau khi mờ dần
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    setFadeOut(false); // Reset lại fadeOut để sử dụng cho lần sau
                }, 1650);
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setValidationErrors(error.response.data);
                } else {
                    console.error("Lỗi không xác định:", error);
                }
                setSaving(false);
            });
    };
    //Xử lý sự kiện thay đổi
    const handleChange = (e) => {
        const {name, value} = e.target;
        const updatedValue = name === "gender" ? (value === "true") : value;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : updatedValue,

        }));
    };
    //Xử lý sự kiện thay đổi avatar
    const handleAvatarChange = (e) => {
        setAvatarUrl(e.target.value);
    };

    //Xử lý sự kiện quay về
    const handleBack = () => {
        history(-1); // Quay lại trang trước
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }
    if (error) return <p>{error}</p>;
    return (
        <div>
            {/* Thông báo thành công */}
            {showSuccessMessage && (
                <div
                    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-1000 ${
                        fadeOut ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <div className="bg-white rounded-lg shadow-lg p-4 w-96 relative">
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            &times; {/* Ký hiệu 'X' để đóng */}
                        </button>

                        {/* Icon thành công */}
                        <div className="flex justify-center mb-2">
                            <svg
                                className="w-16 h-16 text-green-500 animate-bounce"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <div
                            className="mb-2 p-2 text-center bg-green-200 text-green-800 border border-green-300 rounded">
                            Lưu thành công!
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`custom-form  mx-auto p-4 mb-4 border border-gray-300 rounded-lg shadow-lg ${showSuccessMessage ? "opacity-50" : ""}`}>
                <h1 className="text-2xl font-bold mb-4 text-center">Thông tin người dùng</h1>

                {/* Profile and Cover Image */}
                <div className="w-full bg-contain bg-center rounded-lg"
                     style={{
                         backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQO5521qLHocLI1xyv_xZGm2v3iJTMrzZklg&s')`,

                     }}>
                    <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full"
                         style={{
                             backgroundImage: `url(${avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrGKrWJMnf0Lnvb8oezcde-Hvu9qTlCMZ_6w&s'})`,
                             backgroundSize: "cover",
                             backgroundPosition: "center"
                         }}>
                        {/* Avatar upload logic remains unchanged */}
                    </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* Input for Avatar URL */}
                    {isEditing && (
                        <div className="col-span-2 mb-2">
                            <label htmlFor="avatar" className="dark:text-gray-300">Ảnh đại diện</label>
                            <input
                                type="text"
                                name="avatar"
                                value={avatarUrl}
                                onChange={handleAvatarChange}
                                placeholder="Dán link ảnh vào đây"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                            />
                        </div>
                    )}
                    {/* First Name */}
                    <div className="mb-2">
                        <label htmlFor="firstName" className="dark:text-gray-300">Họ</label>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName || ""}
                            onChange={handleChange}
                            placeholder="Nhập họ"
                            disabled={!isEditing}
                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {validationErrors.firstName && (
                            <p className="text-red-500 mt-1">{validationErrors.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-2">
                        <label htmlFor="lastName" className="dark:text-gray-300">Tên</label>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName || ""}
                            onChange={handleChange}
                            placeholder="Nhập tên"
                            disabled={!isEditing}
                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {validationErrors.lastName && (
                            <p className="text-red-500 mt-1">{validationErrors.lastName}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className=" mb-2">
                        <label htmlFor="phoneNumber" className="dark:text-gray-300">Số điện thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber || ""}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            readOnly
                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {validationErrors.phoneNumber && (
                            <p className="text-red-500 mt-1">{validationErrors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="mb-2">
                        <h3 className="dark:text-gray-300  dark:border-gray-600">Giới tính</h3>
                        <select
                            name="gender"
                            value={user.gender || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-4 border-2 rounded-lg  dark:border-gray-600 dark:bg-gray-600 "
                            style={{
                                appearance: isEditing ? "auto" : "none", // Ẩn mũi tên khi không chỉnh sửa, hiển thị khi chỉnh sửa
                                WebkitAppearance: isEditing ? "auto" : "none",
                                MozAppearance: isEditing ? "auto" : "none",
                            }}
                        >
                            <option disabled value="">Chọn Giới tính</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-2">
                        <h3 className="dark:text-gray-300">Ngày sinh</h3>
                        {!isEditing ? (
                            <p className="flex-grow border-2 rounded-lg  p-4 text-left  dark:text-gray-200 dark:border-gray-600 bg-gray-100 pr-2">{user.dob ? formatDateToDisplay(user.dob) : "Ngày sinh không hợp lệ"}</p>
                        ) : (
                            <input
                                type="date"
                                name="dob"
                                value={user.dob || ""}
                                readOnly
                                onChange={handleChange}
                                className="p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 bg-white"
                            />
                        )}
                        {validationErrors.dob && (
                            <p className="text-red-500 mt-1">{validationErrors.dob}</p>
                        )}
                    </div>

                    {/* Buttons for "Back" and "Edit" */}
                    <div className="col-span-2 flex justify-between mt-4">
                        {/* "Back" Button */}
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                        >
                            Quay lại
                        </button>

                        {/* "Edit" Button */}
                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:shadow-lg transition duration-300 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {saving ? "Đang lưu..." : "Lưu"}
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 hover:shadow-lg transition duration-300"
                            >
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDisplay;