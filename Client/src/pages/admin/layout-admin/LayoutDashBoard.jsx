import { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import SideBarAdmin from './SideBarAdmin';
import { Outlet } from 'react-router-dom';  

export default function LayoutDashBoard() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Đăng xuất');
    setAnchorEl(null);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <AppBar
        position="fixed"  // Dùng position fixed để giữ nguyên Navbar
        className="bg-white border-b border-gray-300 w-full z-10" // z-index để luôn nổi trên cùng
      >
        <Toolbar className="flex justify-between bg-white">
          <Typography variant="h6" className="text-black">Admin Dashboard</Typography>
          <div className="flex items-center">
            <span className="mr-2 text-black">Anh Tuấn</span>
            <IconButton onClick={handleAvatarClick}>
              <Avatar alt="User Avatar" src="/path_to_avatar_image.jpg" />
            </IconButton>

            {/* Menu hiển thị khi bấm vào Avatar */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 border-r border-gray-300 fixed top-16 bottom-0 left-0 z-10">
          <SideBarAdmin />
        </div>

        {/* Content */}
        <div className="flex-grow p-6 ml-72 mt-16">
          {/* Outlet để hiển thị nội dung theo route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
