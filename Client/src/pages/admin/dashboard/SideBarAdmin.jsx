import { FaHome, FaUserCog, FaShieldAlt, FaCog } from 'react-icons/fa';
import { List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function SideBarAdmin() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <List className="mt-6">
        <ListItem 
          button 
          className="hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/dashboard')} // Navigate to Dashboard
        >
          <FaHome className="mr-3 text-gray-400" />
          <ListItemText primary="Trang chủ" primaryTypographyProps={{ className: 'font-medium' }} />
        </ListItem>

        <ListItem 
          button 
          className="hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 ease-in-out cursor-pointer"
          onClick={() => navigate('/admin/manage')}
        >
          <FaUserCog className="mr-3 text-gray-400" />
          <ListItemText primary="Quản lý" primaryTypographyProps={{ className: 'font-medium' }} />
        </ListItem>

        <ListItem 
          button 
          className="hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 ease-in-out"
          onClick={() => navigate('/admin-dashboard/roles')} // Navigate to Roles
        >
          <FaShieldAlt className="mr-3 text-gray-400" />
          <ListItemText primary="Phân quyền" primaryTypographyProps={{ className: 'font-medium' }} />
        </ListItem>

        <ListItem 
          button 
          className="hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-200 ease-in-out"
          onClick={() => navigate('/admin-dashboard/settings')} // Navigate to Settings
        >
          <FaCog className="mr-3 text-gray-400" />
          <ListItemText primary="Cài đặt" primaryTypographyProps={{ className: 'font-medium' }} />
        </ListItem>
      </List>
    </div>
  );
}
