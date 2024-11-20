import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { BeatLoader } from "react-spinners";
import axios from 'axios';
import { toast } from 'react-toastify';
import {wGet, wPost} from "../../../../utils/request.util.js";

const AddEmployeeForm = ({ addEmployee, cancelAdd }) => {
    const [employee, setEmployee] = useState({
        name: '',
        phoneNumber: '',
        experience: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const isPhoneNumberValid = () => {
        return /^\d{10}$/.test(employee.phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!isPhoneNumberValid()) {
            toast.error('Số điện thoại không hợp lệ! Phải có đúng 10 chữ số.');
            setLoading(false);
            return;
        }

        try {
            // Kiểm tra số điện thoại tồn tại trong danh sách các huấn luyện viên
            const checkResponse = await wGet('/api/coach');
            const data = await checkResponse.json()

            // Kiểm tra nếu số điện thoại đã tồn tại trong danh sách huấn luyện viên
            const phoneNumberExists = data.some(coach => coach.phoneNumber === employee.phoneNumber);

            if (phoneNumberExists) {
                toast.error('Số điện thoại này đã được sử dụng bởi huấn luyện viên khác!');
                setLoading(false);
                return;
            }

            // Nếu số điện thoại chưa tồn tại, tiến hành thêm mới huấn luyện viên
            const newEmployee = { ...employee, avatar };
            await wPost('/api/coach/add', newEmployee);
            toast.success('Thêm huấn luyện viên thành công');

            setEmployee({
                name: '',
                phoneNumber: '',
                experience: '',
                description: '',
            });
            setAvatar(null);

        } catch (error) {
            console.error('Lỗi khi thêm huấn luyện viên:', error);
            toast.error('Có lỗi xảy ra khi thêm huấn luyện viên!');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            employee.name &&
            isPhoneNumberValid() &&
            employee.experience &&
            employee.description
        );
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-white px-8 py-6 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Thêm Huấn Luyện Viên</h2>
            <div className="grid grid-cols-2 gap-x-6">
                <TextField
                    label="Tên Huấn Luyện Viên"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    label="Kinh Nghiệm"
                    name="experience"
                    value={employee.experience}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    label="Số điện thoại"
                    name="phoneNumber"
                    value={employee.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    type="text"
                    error={!isPhoneNumberValid() && employee.phoneNumber !== ''}
                    helperText={!isPhoneNumberValid() && employee.phoneNumber !== '' ? 'Số điện thoại phải có đúng 10 chữ số' : ''}
                />

                <TextField
                    label="Giới thiệu bản thân"
                    name="description"
                    value={employee.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                {!loading && (
                    <>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={!isFormValid()}
                        >
                            Thêm HLV
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            onClick={cancelAdd}
                        >
                            Hủy
                        </Button>
                    </>
                )}
            </div>

            {loading && (
                <div className="flex justify-center mt-4">
                    <BeatLoader color="#2ac1d9" margin={2} size={13} />
                </div>
            )}
        </form>
    );
};

export default AddEmployeeForm;
