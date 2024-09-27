import { useState } from 'react';
import { Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const GymManagement = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [packages, setPackages] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({ type: '', data: {} });
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (type, data = {}) => {
        setEditData({ type, data });
        setSelectedImage(data.image || null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditData({ type: '', data: {} });
        setSelectedImage(null);
    };

    const handleSave = () => {
        const { type, data } = editData;
        if (data.id) {
            if (type === 'course') {
                setCourses(courses.map(course => course.id === data.id ? data : course));
            } else if (type === 'trainer') {
                setTrainers(trainers.map(trainer => trainer.id === data.id ? data : trainer));
            } else if (type === 'package') {
                setPackages(packages.map(pkg => pkg.id === data.id ? data : pkg));
            }
        } else {
            const newItem = { ...data, id: Date.now() };
            if (type === 'course') {
                setCourses([...courses, newItem]);
            } else if (type === 'trainer') {
                setTrainers([...trainers, newItem]);
            } else if (type === 'package') {
                setPackages([...packages, newItem]);
            }
        }
        handleClose();
    };

    const handleDelete = (type, id) => {
        if (type === 'course') {
            setCourses(courses.filter(course => course.id !== id));
        } else if (type === 'trainer') {
            setTrainers(trainers.filter(trainer => trainer.id !== id));
        } else if (type === 'package') {
            setPackages(packages.filter(pkg => pkg.id !== id));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
                setEditData({ ...editData, data: { ...editData.data, image: event.target.result } });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button 
                variant="outlined" 
                onClick={() => navigate(-1)} 
                startIcon={<IoArrowBackCircleSharp />}
                style={{ marginBottom: '20px' }} 
            >
                Quay về
            </Button>

            <Typography variant="h5" component="h1" className="font-bold" style={{ marginBottom: '20px' }}>
                Quản lý phòng gym
            </Typography>

            {/* Quản lý khóa học */}
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Quản lý khóa học</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen('course')}>Thêm khóa học</Button>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                {courses.map(course => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Paper elevation={2} style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            {course.image && <img src={course.image} alt="Course" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                            <Typography variant="h6">Tên khóa học: {course.name}</Typography>
                            <Typography>Giá: {course.price}</Typography>
                            <Typography>Mô tả: {course.description}</Typography>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={() => handleOpen('course', course)}>Sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete('course', course.id)}>Xóa</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Quản lý huấn luyện viên */}
            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: '30px' }}>Quản lý huấn luyện viên</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen('trainer')}>Thêm huấn luyện viên</Button>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                {trainers.map(trainer => (
                    <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                        <Paper elevation={2} style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            {trainer.image && <img src={trainer.image} alt="Trainer" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                            <Typography variant="h6">Tên huấn luyện viên: {trainer.name}</Typography>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={() => handleOpen('trainer', trainer)}>Sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete('trainer', trainer.id)}>Xóa</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Quản lý gói */}
            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: '30px' }}>Quản lý gói</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen('package')}>Thêm gói</Button>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                {packages.map(pkg => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                        <Paper elevation={2} style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            {pkg.image && <img src={pkg.image} alt="Package" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
                            <Typography variant="h6">Tên gói: {pkg.name}</Typography>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={() => handleOpen('package', pkg)}>Sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete('package', pkg.id)}>Xóa</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog để thêm hoặc sửa thông tin */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editData.data.id ? `Sửa ${editData.type === 'course' ? 'khóa học' : editData.type === 'trainer' ? 'huấn luyện viên' : 'gói'}` : `Thêm ${editData.type === 'course' ? 'khóa học' : editData.type === 'trainer' ? 'huấn luyện viên' : 'gói'}`}</DialogTitle>
                <DialogContent>
                    {/* Phần chọn file ảnh */}
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ marginTop: '10px' }} 
                    />

                    {/* Hiển thị ảnh đã chọn (nếu có) */}
                    {selectedImage && (
                        <img 
                            src={selectedImage} 
                            alt="Selected" 
                            style={{ marginTop: '10px', width: '100%', height: 'auto' }} 
                        />
                    )}

                    {/* Các trường thông tin */}
                    {editData.type === 'course' && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên khóa học"
                                type="text"
                                value={editData.data.name || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, name: e.target.value } })}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Giá"
                                type="number"
                                value={editData.data.price || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, price: e.target.value } })}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Mô tả"
                                type="text"
                                value={editData.data.description || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, description: e.target.value } })}
                                fullWidth
                            />
                        </>
                    )}
                    {editData.type === 'trainer' && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên huấn luyện viên"
                                type="text"
                                value={editData.data.name || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, name: e.target.value } })}
                                fullWidth
                            />
                        </>
                    )}
                    {editData.type === 'package' && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên gói"
                                type="text"
                                value={editData.data.name || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, name: e.target.value } })}
                                fullWidth
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleSave} color="primary">Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GymManagement;
