
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// const UserDisplay = () => {
//   const { id } = useParams(); // Lấy ID từ URL
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     dob: "", // Đảm bảo giá trị dob được khởi tạo
//     gender: true, // Mặc định cho giới tính
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});

//   // Hàm định dạng ngày về yyyy-MM-dd để tương thích với input type="date"
//   const formatDateForInput = (dateString) => {
//     const date = new Date(dateString);
//     if (Number.isNaN(date.getTime())) return "";
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   }; 
//   //Để hiển thị cho người dùng  
//   const formatDateToDisplay = (dateString) => {
//     const date = new Date(dateString);
//     if (Number.isNaN(date.getTime())) return ""; // Trả về chuỗi rỗng nếu ngày không hợp lệ
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`; // Định dạng DD-MM-YYYY
//   };
  
//   // Hàm validate form để kiểm tra các trường hợp đầu vào
//   const validateForm = () => {
//     const errors = {};
//     if (!user.firstName.trim()) errors.firstName = "Họ không được để trống.";
//     if (!user.lastName.trim()) errors.lastName = "Tên không được để trống.";
//     if (!user.phoneNumber.trim()) {
//       errors.phoneNumber = "Số điện thoại không được để trống.";
//     } else if (user.phoneNumber.length !== 10) {
//       errors.phoneNumber = "Số điện thoại phải có 10 chữ số.";
//     } else if (!/^\d+$/.test(user.phoneNumber)) {
//       errors.phoneNumber = "Số điện thoại chỉ được chứa số.";
//     }

//     // Kiểm tra ngày sinh
//     if (!user.dob) {
//       errors.dob = "Ngày sinh không được để trống.";
//     } else {
//       const today = new Date();
//       const dob = new Date(user.dob);
//       let age = today.getFullYear() - dob.getFullYear();
//       const monthDifference = today.getMonth() - dob.getMonth();
//       if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
//         age--;
//       }
//       if (age < 16) {
//         errors.dob = "Người dùng phải từ 16 tuổi trở lên.";
//       }
//     }
//     return errors;
//   };

//   // Lấy thông tin người dùng từ API và định dạng ngày sinh
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/user/${id}`)
//       .then((response) => {
//         const userData = response.data;
//         const formattedDob = userData.dob ? formatDateForInput(userData.dob) : "";
//         setUser({
//          ...userData,
//         dob: formattedDob,
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching user:", error.response?.status, error.message);
//         setError("Không tìm thấy người dùng");
//         setLoading(false);
//       });
//   }, [id]);

//   // Xử lý khi nhấn nút Lưu
//   const handleSave = () => {
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return; 
//     }
//     setSaving(true);
//       // Không cần dùng moment nếu input đã là type="date"
//       const formattedDob = user.dob ? user.dob : null;

//     // Định dạng ngày trước khi gửi đi
//     const updatedUser = {
//       ...user,
//       dob: formattedDob,
//     };
//     axios
//       .put(`http://localhost:8080/user/${id}`, updatedUser)
//       .then((response) => {
//         setUser(response.data);
//         setIsEditing(false);
//         setSaving(false);
//         setValidationErrors({});
//       })
//       .catch((error) => {
//         if (error.response && error.response.data) {
//           setValidationErrors(error.response.data);
//         } else {
//           console.error("Lỗi không xác định:", error);
//         }
//         setSaving(false);
//       });
//   };

//   // Hàm xử lý khi thay đổi giá trị input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValue = name === "gender" ? (value === "true") : value;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : updatedValue,
//     }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Thông tin người dùng</h1>
//       <div>
//         <label>Họ: </label>
//         <input
//           type="text"
//           name="firstName"
//           value={user.firstName}
//           placeholder="Nhập họ"
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//         {validationErrors.firstName && <p style={{ color: "red" }}>{validationErrors.firstName}</p>}
//       </div>
//       <div>
//         <label>Tên: </label>
//         <input
//           type="text"
//           name="lastName"
//           value={user.lastName}
//           placeholder="Nhập tên"
//           onChange={handleChange}
//           disabled={!isEditing}
//         />
//      {validationErrors.lastName && <p style={{ color: "red" }}>{validationErrors.lastName}</p>}
//       </div>
//       <div>
//         <label>Số điện thoại: </label>
//         <input
//           type="number"
//           name="phoneNumber"
//           value={user.phoneNumber}
//           placeholder="Nhập số điện thoại"
//           onChange={handleChange}
//           disabled={!isEditing}
//           onPaste={(e) => {
//           const pastedData = e.clipboardData.getData("Text");
//           if (!/^\d+$/.test(pastedData)) {
//           e.preventDefault();  // Ngăn không cho dán dữ liệu nếu nó chứa ký tự không phải số
//        }
//     }}
//         />
//      {validationErrors.phoneNumber && <p style={{ color: "red" }}>{validationErrors.phoneNumber}</p>}
//       </div>
//       <div>
//       <div>
//         <label>Ngày sinh: </label>
//         {!isEditing ? (
//           <span>{user.dob ? formatDateToDisplay(user.dob) : "Ngày sinh không hợp lệ"}</span>
//         ) : (
//           <input
//             type="date"
//             name="dob"
//             value={user.dob || ""}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//         )}
//         {validationErrors.dob && <p style={{ color: "red" }}>{validationErrors.dob}</p>}
//       </div>

//       <div>
//         <label>Giới tính: </label>
//         {!isEditing ? (
//           <span>{user.gender ? "Nam" : "Nữ"}</span> // Hiển thị giới tính dưới dạng text nếu không ở chế độ chỉnh sửa
//         ) : (
//           <select name="gender" value={user.gender.toString()} onChange={handleChange}>
//             <option value={true}>Nam</option>
//             <option value={false}>Nữ</option>
//           </select>
//         )}
//       </div>
//       {!isEditing ? (
//         <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
//       ) : (
//         <button onClick={handleSave} disabled={saving}>
//           {saving ? "Đang lưu..." : "Lưu"}
//         </button>
//       )}
//     </div>
//     </div>
//   );
// };
// export default UserDisplay


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDisplay = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const history = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    gender: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [originalDob, setOriginalDob] = useState(""); // Thêm biến trạng thái cho ngày sinh gốc
   // Thêm state cho việc hiển thị thông báo
   const [fadeOut, setFadeOut] = useState(false); // Thêm state cho việc mờ dần

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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((response) => {
        const userData = response.data;
        const formattedDob = userData.dob ? formatDateForInput(userData.dob) : "";
        setUser({
          ...userData,
          dob: formattedDob,
        });
        setOriginalDob(formattedDob); // Lưu trữ giá trị gốc
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error.response?.status, error.message);
        setError("Không tìm thấy người dùng");
        setLoading(false);
      });
  }, [id]);

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setSaving(true);
    const formattedDob = user.dob ? user.dob : null;

    const updatedUser = {
      ...user,
      dob: user.dob || originalDob,
    };
    axios
      .put(`http://localhost:8080/user/${id}`, updatedUser)
      .then((response) => {
        setUser(response.data);
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
    const { name, value } = e.target;
    const updatedValue = name === "gender" ? (value === "true") : value;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : updatedValue,
    
    }));
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

          <div className="mb-2 p-2 text-center bg-green-200 text-green-800 border border-green-300 rounded">
            Lưu thành công!
          </div>
        </div>
      </div>
    )}

    {/* Form người dùng */}
    <div className={`max-w-md mx-auto p-4 mb-4 border border-gray-300 rounded-lg shadow-lg ${showSuccessMessage ? "opacity-50" : ""}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Thông tin người dùng</h1>

      {/** Sử dụng flex để căn chỉnh label và input cho tất cả các trường */}
      <div className="mb-4 flex items-center">
        <label className="mr-2 w-1/3 whitespace-nowrap">Họ:</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          placeholder="Nhập họ"
          onChange={handleChange}
          disabled={!isEditing}
          className={`flex-grow p-2 rounded transition-transform duration-200 transform ${isEditing ? 'border border-gray-300 focus:ring-2 focus:ring-blue-500 scale-105' : 'bg-transparent'} focus:outline-none text-right`}
        />
      </div>
      {validationErrors.firstName && (
        <p className="text-red-600 text-right transition-opacity duration-300 opacity-100">{validationErrors.firstName}</p>
      )}

      <div className="mb-4 flex items-center">
        <label className="mr-2 w-1/3 whitespace-nowrap">Tên:</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          placeholder="Nhập tên"
          onChange={handleChange}
          disabled={!isEditing}
          className={`flex-grow p-2 rounded transition-transform duration-200 transform ${isEditing ? 'border border-gray-300 focus:ring-2 focus:ring-blue-500 scale-105' : 'bg-transparent'} focus:outline-none text-right`}
        />
      </div>
      {validationErrors.lastName && (
        <p className="text-red-600 pb-2 text-right transition-opacity duration-300 opacity-100">{validationErrors.lastName}</p>
      )}

      <div className="mb-4 flex items-center">
        <label className="mr-2 w-1/3 whitespace-nowrap">Số điện thoại:</label>
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber}
          placeholder="Nhập số điện thoại"
          onChange={handleChange}
          readOnly ={isEditing}
          className={`flex-grow p-2 rounded transition-transform duration-200 transform ${isEditing ? 'border border-gray-300 focus:ring-2 focus:ring-blue-500 scale-105' : 'bg-transparent'} focus:outline-none text-right`}
        />
      </div>
      {validationErrors.phoneNumber && (
        <p className="text-red-600 transition-opacity duration-300 opacity-100">{validationErrors.phoneNumber}</p>
      )}

      <div className="mb-4 flex items-center">
        <label className="mr-2 w-1/3 whitespace-nowrap">Ngày sinh:</label>
        {!isEditing ? (
          <p className="flex-grow text-right p-2 pr-2">{user.dob ? formatDateToDisplay(user.dob) : "Ngày sinh không hợp lệ"}</p>
        ) : (
          <input
            type="date"
            name="dob"
            value={user.dob || ""}
            onChange={handleChange}
            className={`flex-grow p-2 rounded transition-transform duration-200 transform ${isEditing ? 'border border-gray-300 focus:ring-2 focus:ring-blue-500 scale-105' : 'bg-transparent'} focus:outline-none text-right`}
            readOnly ={isEditing}
          />
        )}
      </div>
      {validationErrors.dob && (
        <p className="text-red-600 transition-opacity duration-300 opacity-100">{validationErrors.dob}</p>
      )}

      <div className="mb-4 flex items-center">
        <label className="mr-2 w-1/3 whitespace-nowrap">Giới tính:</label>
        <select
          name="gender"
          value={user.gender}
          onChange={handleChange}
          disabled={!isEditing}
          className={`flex-grow p-2 rounded transition-transform duration-200 transform ${isEditing ? 'border border-gray-300 focus:ring-2 focus:ring-blue-500 scale-105' : 'bg-transparent'} focus:outline-none text-right ${!isEditing ? 'appearance-none' : ''}`}
        >
          <option value={true}>Nam</option>
          <option value={false}>Nữ</option>
        </select>
      </div>

      <div className="flex justify-between mt-4">
  <button
    onClick={handleBack}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 hover:shadow-lg transition duration-300"
  >
    Quay lại
  </button>

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
);
};

export default UserDisplay;
