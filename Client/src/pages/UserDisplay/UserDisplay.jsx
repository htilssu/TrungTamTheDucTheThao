import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDisplay = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    gender: true, // Mặc định cho giới tính
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Trả về chuỗi rỗng nếu ngày không hợp lệ
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm lấy thông tin người dùng từ API
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((response) => {
        const userData = response.data;
        console.log("User Data:", userData); // Thêm dòng này để kiểm tra
        setUser({
          ...userData,
          dob: userData.dob, // Đảm bảo lưu giá trị ngày sinh dưới dạng chuỗi
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError("Không tìm thấy người dùng");
        setLoading(false);
      });
  }, [id]);

  // Hàm xử lý khi lưu thông tin đã sửa
  const handleSave = () => {
    // Chuyển đổi ngày sinh về định dạng YYYY-MM-DD trước khi gửi
    const formattedDate = new Date(user.dob).toISOString().split("T")[0];
    const updatedUser = { ...user, dob: formattedDate };

    axios
      .put(`http://localhost:8080/user/${id}`, updatedUser)
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        setError("Có lỗi xảy ra khi lưu thông tin");
      });
  };

  // Hàm xử lý khi thay đổi giá trị các trường
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Chuyển đổi giá trị "true" và "false" cho trường gender thành Boolean
    const updatedValue = name === "gender" ? (value === "true") : value;
    setUser({ ...user, [name]: updatedValue });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Thông tin người dùng</h1>
      <div>
        <label>Họ: </label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          placeholder="Nhập họ"
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Tên: </label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          placeholder="Nhập tên"
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Số điện thoại: </label>
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          placeholder="Nhập số điện thoại"
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Ngày sinh: </label>
        {!isEditing ? (
          <span>{user.dob && typeof user.dob === 'string' ? formatDate(user.dob) : "Ngày sinh không hợp lệ"}</span> // Hiển thị ngày sinh đã được định dạng
        ) : (
          <input
            type="date"
            name="dob"
            value={user.dob && typeof user.dob === 'string' ? user.dob.split("T")[0] : ""} // Kiểm tra trước khi split
            onChange={handleChange}
            disabled={!isEditing}
          />
        )}
      </div>
      <div>
        <label>Giới tính: </label>
        {!isEditing ? (
          <span>{user.gender ? "Nam" : "Nữ"}</span> // Hiển thị giới tính dưới dạng text nếu không ở chế độ chỉnh sửa
        ) : (
          <select name="gender" value={user.gender} onChange={handleChange}>
            <option value={true}>Nam</option>
            <option value={false}>Nữ</option>
          </select>
        )}
      </div>
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
      ) : (
        <button onClick={handleSave}>Lưu</button>
      )}
    </div>
  );
};

export default UserDisplay;
