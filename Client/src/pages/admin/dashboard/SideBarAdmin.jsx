import { useState } from 'react';
import { FaHome, FaUserCog, FaShieldAlt, FaCog, FaUsers, FaClipboard, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SideBarAdmin() {
  const navigate = useNavigate();
  const [openManage, setOpenManage] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 shadow-xl">
      <div className="p-6 text-3xl font-bold text-gray-200 border-b border-gray-700">
        Admin Panel
      </div>
      <List className="mt-6 space-y-4 px-2">
        {/* Trang chủ */}
        <ListItem 
          button 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard')}
        >
          <FaHome className="mr-4 text-gray-400" />
          <ListItemText primary="Trang chủ" primaryTypographyProps={{ className: 'font-semibold text-lg' }} />
        </ListItem>

        {/* Quản lý */}
        <ListItem 
          button 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-between"
          onClick={() => setOpenManage(!openManage)}
        >
          <div className="flex items-center">
            <FaUserCog className="mr-4 text-gray-400" />
            <ListItemText primary="Quản lý" primaryTypographyProps={{ className: 'font-semibold text-lg' }} />
          </div>
          {/* Mũi tên quay theo hướng ngược lại */}
          {openManage ? <FaChevronDown className="text-gray-400 ml-36" /> : <FaChevronUp className="text-gray-400 ml-36" />}
        </ListItem>

        {/* Sub-menu for Quản lý */}
        <Collapse in={openManage} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className="pl-4 space-y-2">
            <ListItem 
              button 
              className="hover:bg-gray-700 hover:text-gray-200 bg-gray-800 border-l-4 border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate('/admin/manage')}
            >
              <FaUsers className="mr-4 text-gray-400" />
              <ListItemText primary="Quản lý bài viết" primaryTypographyProps={{ className: 'font-normal text-base' }} />
            </ListItem>
            {/* Quản lý người dùng */}
            <ListItem 
              button 
              className="hover:bg-gray-700 hover:text-gray-200 bg-gray-800 border-l-4 border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate('/admin/manage/users')}
            >
              <FaUsers className="mr-4 text-gray-400" />
              <ListItemText primary="Quản lý người dùng" primaryTypographyProps={{ className: 'font-normal text-base' }} />
            </ListItem>

            {/* Quản lý bài đăng */}
            <ListItem 
              button 
              className="hover:bg-gray-700 hover:text-gray-200 bg-gray-800 border-l-4 border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate('/admin/manage/posts')}
            >
              <FaClipboard className="mr-4 text-gray-400" />
              <ListItemText primary="Quản lý bài đăng" primaryTypographyProps={{ className: 'font-normal text-base' }} />
            </ListItem>
          </List>
        </Collapse>

        {/* Phân quyền */}
        <ListItem 
          button 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin-dashboard/roles')}
        >
          <FaShieldAlt className="mr-4 text-gray-400" />
          <ListItemText primary="Phân quyền" primaryTypographyProps={{ className: 'font-semibold text-lg' }} />
        </ListItem>

        {/* Cài đặt */}
        <ListItem 
          button 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin-dashboard/settings')}
        >
          <FaCog className="mr-4 text-gray-400" />
          <ListItemText primary="Cài đặt" primaryTypographyProps={{ className: 'font-semibold text-lg' }} />
        </ListItem>
      </List>
    </div>
  );
}
