import { useState } from 'react';
import { Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const SoccerManagement = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);
    const [teams, setTeams] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({ type: '', data: {} });

    const handleOpen = (type, data = {}) => {
        setEditData({ type, data });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditData({ type: '', data: {} });
    };

    const handleSave = () => {
        const { type, data } = editData;
        if (data.id) {
            if (type === 'field') {
                setFields(fields.map(field => field.id === data.id ? data : field));
            } else if (type === 'team') {
                setTeams(teams.map(team => team.id === data.id ? data : team));
            } else if (type === 'rental') {
                setRentals(rentals.map(rental => rental.id === data.id ? data : rental));
            }
        } else {
            const newItem = { ...data, id: Date.now() };
            if (type === 'field') {
                setFields([...fields, newItem]);
            } else if (type === 'team') {
                setTeams([...teams, newItem]);
            } else if (type === 'rental') {
                setRentals([...rentals, newItem]);
            }
        }
        handleClose();
    };

    const handleDelete = (type, id) => {
        if (type === 'field') {
            setFields(fields.filter(field => field.id !== id));
        } else if (type === 'team') {
            setTeams(teams.filter(team => team.id !== id));
        } else if (type === 'rental') {
            setRentals(rentals.filter(rental => rental.id !== id));
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
                Quản lý sân bóng
            </Typography>

            {/* Quản lý sân bóng */}
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Quản lý sân bóng</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen('field')}>Thêm sân bóng</Button>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                {fields.map(field => (
                    <Grid item xs={12} sm={6} md={4} key={field.id}>
                        <Paper elevation={2} style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6">Tên sân: {field.name}</Typography>
                            <Typography>Giá: {field.price}</Typography>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={() => handleOpen('field', field)}>Sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete('field', field.id)}>Xóa</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Quản lý đội */}
            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: '30px' }}>Quản lý đội</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen('team')}>Thêm đội</Button>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                {teams.map(team => (
                    <Grid item xs={12} sm={6} md={4} key={team.id}>
                        <Paper elevation={2} style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6">Tên đội: {team.name}</Typography>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={() => handleOpen('team', team)}>Sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete('team', team.id)}>Xóa</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Quản lý đặt sân */}
            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: '30px' }}>Quản lý đặt sân</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen('rental')}>Thêm đặt sân</Button>
            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                {rentals.map(rental => (
                    <Grid item xs={12} sm={6} md={4} key={rental.id}>
                        <Paper elevation={2} style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6">Tên đội: {rental.teamName}</Typography>
                            <Typography>Thời gian: {rental.time}</Typography>
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={() => handleOpen('rental', rental)}>Sửa</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDelete('rental', rental.id)}>Xóa</Button>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog để thêm hoặc sửa thông tin */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editData.data.id ? `Sửa ${editData.type === 'field' ? 'sân bóng' : editData.type === 'team' ? 'đội' : 'đặt sân'}` : `Thêm ${editData.type === 'field' ? 'sân bóng' : editData.type === 'team' ? 'đội' : 'đặt sân'}`}</DialogTitle>
                <DialogContent>
                    {/* Các trường thông tin */}
                    {editData.type === 'field' && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên sân"
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
                        </>
                    )}
                    {editData.type === 'team' && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên đội"
                                type="text"
                                value={editData.data.name || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, name: e.target.value } })}
                                fullWidth
                            />
                        </>
                    )}
                    {editData.type === 'rental' && (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Tên đội"
                                type="text"
                                value={editData.data.teamName || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, teamName: e.target.value } })}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                label="Thời gian"
                                type="text"
                                value={editData.data.time || ''}
                                onChange={(e) => setEditData({ ...editData, data: { ...editData.data, time: e.target.value } })}
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

export default SoccerManagement;
