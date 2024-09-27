import { Box, Button, Typography } from '@mui/material';
import { PiCourtBasketballLight } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { GrYoga } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

export default function ServiceManagementController() {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ width: '100%', padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Quản lý Dịch vụ
            </Typography>
            <div className="flex justify-center space-x-4 mb-6">
                <Button
                    onClick={() => handleButtonClick('/admin/soccer-management')}
                    sx={{
                        fontSize: '1.1rem',
                        padding: '15px 25px',
                        borderRadius: '12px',
                        width: '220px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        boxShadow: 3,
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                        transition: 'background-color 0.3s, transform 0.2s',
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <PiCourtBasketballLight style={{ marginRight: '8px', fontSize: '2rem' }} />
                    Quản lý sân bóng
                </Button>
                <Button
                    onClick={() => handleButtonClick('/admin/gym-management')}
                    sx={{
                        fontSize: '1.1rem',
                        padding: '15px 25px',
                        borderRadius: '12px',
                        width: '220px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        boxShadow: 3,
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                        transition: 'background-color 0.3s, transform 0.2s',
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <CgGym style={{ marginRight: '8px', fontSize: '2rem' }} />
                    Quản lý phòng gym
                </Button>
                <Button
                    onClick={() => handleButtonClick('/admin/yoga-management')}
                    sx={{
                        fontSize: '1.1rem',
                        padding: '15px 25px',
                        borderRadius: '12px',
                        width: '220px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        boxShadow: 3,
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                        transition: 'background-color 0.3s, transform 0.2s',
                        '&:active': {
                            transform: 'scale(0.98)',
                        },
                    }}
                >
                    <GrYoga style={{ marginRight: '8px', fontSize: '2rem' }} />
                    Quản lý lớp yoga
                </Button>
            </div>
        </Box>
    );
}
