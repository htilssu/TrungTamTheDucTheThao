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

    const commonButtonStyle = {
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
    };

    const ServiceButton = ({ icon: Icon, text, path }) => (
        <Button
            onClick={() => handleButtonClick(path)}
            sx={commonButtonStyle}
        >
            <Icon style={{ marginRight: '8px', fontSize: '2rem' }} />
            {text}
        </Button>
    );

    const buttonData = [
        { icon: PiCourtBasketballLight, text: 'Quản lý sân bóng', path: '/admin/soccer-management' },
        { icon: CgGym, text: 'Quản lý phòng gym', path: '/admin/gym-management' },
        { icon: GrYoga, text: 'Quản lý lớp yoga', path: '/admin/yoga-management' },
    ];

    return (
        <Box sx={{ width: '100%', padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Quản lý Dịch vụ
            </Typography>
            <div className="flex justify-center space-x-4 mb-6">
                {buttonData.map((button, index) => (
                    <ServiceButton key={index} {...button} />
                ))}
            </div>
        </Box>
    );
}
