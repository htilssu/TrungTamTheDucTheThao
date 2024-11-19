import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CgGym } from "react-icons/cg";
import { LuAtom } from "react-icons/lu";
import EquipmentType from "./EquipmentType.jsx";
import EquipmentList from "./EquipmentList.jsx";
import EquipmentForm from "./Equipment.jsx";

const ServiceEquipmentt = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const [equipments, setEquipments] = useState([]);

    const handleButtonClick = (component) => {
        // If the clicked component is already active, close it
        setActiveComponent((prev) => (prev === component ? null : component));
    };

    const handleAddEquipment = (newEquipment) => {
        setEquipments((prevEquipments) => [...prevEquipments, newEquipment]);
    };

    return (
        <Box sx={{ width: '100%', padding: 2, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Quản lý Trang thiết bị
            </Typography>

            <div className="flex justify-center space-x-4 mb-6">
                <Button
                    onClick={() => handleButtonClick('AddEquipmentType')}
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
                    }}
                >
                    <LuAtom style={{ marginRight: '8px', fontSize: '2rem' }} />
                    Thêm loại thiết bị
                </Button>
                <Button
                    onClick={() => handleButtonClick('AddEquipment')}
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
                    }}
                >
                    <CgGym style={{ marginRight: '8px', fontSize: '2rem' }} />
                    Thêm trang thiết bị
                </Button>
            </div>

            {activeComponent === 'AddEquipmentType' && <EquipmentType />}
            {activeComponent === 'AddEquipment' && <EquipmentForm onAddEquipment={handleAddEquipment} />}

            <Box mt={4} className="equipment-list">
                <Typography variant="h5"  gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Danh sách Trang thiết bị
                </Typography>
                <EquipmentList equipments={equipments} />
            </Box>
        </Box>
    );
};

export default ServiceEquipmentt;
