import { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Thành phần để thêm/sửa dịch vụ
const ServiceForm = ({ open, handleClose, handleSave, serviceData, setServiceData }) => {
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Cập nhật hình ảnh xem trước
                setServiceData((prevData) => ({ ...prevData, image: reader.result })); // Cập nhật dữ liệu dịch vụ
            };
            reader.readAsDataURL(file); // Đọc nội dung hình ảnh
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{serviceData?.id ? "Sửa dịch vụ" : "Thêm dịch vụ"}</DialogTitle>
            <DialogContent>
                <div className="flex items-center justify-between mb-2">
                    <label className="mr-2">Hình ảnh</label>
                    <TextField
                        margin="dense"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        fullWidth
                    />
                </div>
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-full mt-2" />
                )}
                <TextField
                    margin="dense"
                    label="Giá"
                    type="number"
                    name="price"
                    value={serviceData.price || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Địa chỉ"
                    type="text"
                    name="address"
                    value={serviceData.address || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Mô tả"
                    type="text"
                    name="description"
                    value={serviceData.description || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Khung giờ hoạt động"
                    type="text"
                    name="hours"
                    value={serviceData.hours || ''}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Số người tối đa"
                    type="number"
                    name="maxPeople"
                    value={serviceData.maxPeople || ''}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSave}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

// Thành phần con cho từng phần quản lý
const SoccerManagement = () => {
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const [serviceData, setServiceData] = useState({});

    const handleOpen = (service = {}) => {
        setServiceData(service);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setServiceData({});
    };

    const handleSave = () => {
        if (serviceData.id) {
            // Sửa dịch vụ
            setServices(services.map(service => service.id === serviceData.id ? serviceData : service));
        } else {
            // Thêm dịch vụ
            const newService = { ...serviceData, id: Date.now() };
            setServices([...services, newService]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        setServices(services.filter(service => service.id !== id));
    };

    return (
        <div>
            <Typography variant="h6">Quản lý sân bóng</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>Thêm dịch vụ</Button>
            <div className="mt-4">
                {services.map(service => (
                    <div key={service.id} className="flex items-center border border-gray-400 p-4 mt-2">
                        <div className="flex-1">
                            <Typography>Giá: {service.price}</Typography>
                            <Typography>Địa chỉ: {service.address}</Typography>
                            <Typography>Mô tả: {service.description}</Typography>
                            <Typography>Khung giờ hoạt động: {service.hours}</Typography>
                            <Typography>Số người tối đa: {service.maxPeople}</Typography>
                            <Button variant="outlined" onClick={() => handleOpen(service)}>Sửa</Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(service.id)}>Xóa</Button>
                        </div>
                        <img src={service.image} alt="Service" className="w-1/6 h-1/6 ml-4" />
                    </div>
                ))}
            </div>
            <ServiceForm open={open} handleClose={handleClose} handleSave={handleSave} serviceData={serviceData} setServiceData={setServiceData} />
        </div>
    );
};

const GymManagement = () => {
    return (
        <div>
            <Typography variant="h6">Quản lý phòng gym</Typography>
            {/* Nội dung quản lý phòng gym */}
        </div>
    );
};

const YogaManagement = () => {
    return (
        <div>
            <Typography variant="h6">Quản lý lớp yoga</Typography>
            {/* Nội dung quản lý lớp yoga */}
        </div>
    );
};

export default function ServiceManagementController() {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                variant="fullWidth"
            >
                <Tab label="Quản lý sân bóng" />
                <Tab label="Quản lý phòng gym" />
                <Tab label="Quản lý lớp yoga" />
            </Tabs>

            <Box sx={{ padding: 2 }}>
                {currentTab === 0 && <SoccerManagement />}
                {currentTab === 1 && <GymManagement />}
                {currentTab === 2 && <YogaManagement />}
            </Box>
        </Box>
    );
}
