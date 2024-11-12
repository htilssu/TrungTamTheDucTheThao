import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { BeatLoader } from 'react-spinners';
import { TiDelete } from 'react-icons/ti';
import axios from 'axios';

const AddCustomer = ({ cancelAdd }) => {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        phoneNumber:'',
        email: '',
        password: '',
        confirmPassword:''
    });

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'gender') {
            // Ánh xạ giá trị gender
            setCustomer({
                ...customer,
                [name]: value === 'Male' ? true : value === 'Female' ? false : null, // true = Male, false = Female, null = Other
            });
        } else {
            setCustomer({
                ...customer,
                [name]: value,
            });
        }
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const registrationData = {
            email: customer.email,
            password: customer.password,
            confirmPassword:customer.confirmPassword,
            user: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                dob: customer.dob,
                gender: customer.gender,
                phoneNumber:customer.phoneNumber,
                avatar: avatar
            }
        };

        try {
            const response = await axios.post('/api/register', registrationData);
            console.log(response.data.message); // Success message from server
            // Reset form if successful
            setCustomer({   
                firstName: '',
                lastName: '',
                gender: '',
                dob: '',
                phoneNumber:'',
                email: '',
                password: '',
                confirmPassword:''
            });
            setAvatar(null);
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-white px-8 py-6 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Thêm Khách Hàng</h2>
            <div className="grid grid-cols-2 gap-x-6">
                <TextField
                    label="Tên"
                    name="firstName"
                    value={customer.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Họ"
                    name="lastName"
                    value={customer.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Giới Tính"
                    name="gender"
                    value={customer.gender === true ? 'Male' : customer.gender === false ? 'Female' : 'Other'}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    select
                >
                    <MenuItem value="Male">Nam</MenuItem>
                    <MenuItem value="Female">Nữ</MenuItem>
                    <MenuItem value="Other">Khác</MenuItem>
                </TextField>
                
                    {/* Phone Number */}
                <TextField
                    label="Số Điện Thoại"
                    name="phoneNumber"
                    value={customer.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="tel"
                />

                <TextField
                    label="Ngày Sinh"
                    name="dob"
                    value={customer.dob}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="email"
                />
                <TextField
                    label="Mật Khẩu"
                    name="password"
                    value={customer.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="password"
                />
                  <TextField
                    label="Xác Nhận Mật Khẩu"
                    name="confirmPassword"
                    value={customer.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="password"
                />
                <div className="col-span-2 mt-4 flex flex-col justify-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                        id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload">
                        <Button variant="contained" component="span" color="info">
                            Tải Ảnh Đại Diện
                        </Button>
                    </label>
                    {avatar && (
                        <div className="relative mt-4 ">
                            <img
                                src={avatar}
                                alt="Avatar Preview"
                                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-lg"
                            />
                            <button
                                className="absolute top-0 left-18 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition duration-200"
                                onClick={handleRemoveAvatar}
                            >
                                <TiDelete size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                {!loading ? (
                    <>
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Thêm Khách Hàng
                        </Button>
                        <Button variant="outlined" color="secondary" size="large" onClick={cancelAdd}>
                            Hủy
                        </Button>
                    </>
                ) : (
                    <div className="flex justify-center mt-4">
                        <BeatLoader color="#2ac1d9" margin={2} size={13} />
                    </div>
                )}
            </div>
            {errorMessage && (
                <div className="text-red-500 text-center mt-4">
                    {errorMessage}
                </div>
            )}
        </form>
    );
};

export default AddCustomer;
