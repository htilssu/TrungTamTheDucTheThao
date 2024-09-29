import { useState } from 'react';
import { Home, ManageAccounts, Security, Settings, Group, Assignment, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SideBarAdmin() {
  const navigate = useNavigate();
  const [openManage, setOpenManage] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-gray-300 shadow-xl">
      <div className="p-6 text-3xl font-bold text-gray-200 border-b border-gray-700">
        Admin Panel
      </div>
      <div className="mt-6 space-y-4 px-2">
        {/* Trang chủ */}
        <div 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center"
          onClick={() => navigate('/admin/dashboard')}
        >
          <Home className="mr-4 text-gray-400" />
          <span className="font-semibold text-lg">Trang chủ</span>
        </div>

        {/* Quản lý */}
        <div 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-between"
          onClick={() => setOpenManage(!openManage)}
        >
          <div className="flex items-center">
            <ManageAccounts className="mr-4 text-gray-400" />
            <span className="font-semibold text-lg">Quản lý</span>
          </div>
          {openManage ? <ExpandMore className="text-gray-400" /> : <ExpandLess className="text-gray-400" />}
        </div>

        {/* Sub-menu for Quản lý */}
        {openManage && (
          <div className="pl-6 space-y-2">
            <div 
              className="hover:bg-gray-700 hover:text-gray-200 bg-gray-800 border-l-4 border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center"
              onClick={() => navigate('/admin/manage')}
            >
              <Group className="mr-4 text-gray-400" />
              <span className="font-normal text-base">Quản lý bài viết</span>
            </div>
            <div 
              className="hover:bg-gray-700 hover:text-gray-200 bg-gray-800 border-l-4 border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center"
              onClick={() => navigate('/admin/users')}
            >
              <Group className="mr-4 text-gray-400" />
              <span className="font-normal text-base">Quản lý người dùng</span>
            </div>
            <div 
              className="hover:bg-gray-700 hover:text-gray-200 bg-gray-800 border-l-4 border-blue-500 rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center"
              onClick={() => navigate('/admin/manage/posts')}
            >
              <Assignment className="mr-4 text-gray-400" />
              <span className="font-normal text-base">Quản lý bài đăng</span>
            </div>
          </div>
        )}

        {/* Phân quyền */}
        <div 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center"
          onClick={() => navigate('/admin/roles')}
        >
          <Security className="mr-4 text-gray-400" />
          <span className="font-semibold text-lg">Phân quyền</span>
        </div>

        {/* Cài đặt */}
        <div 
          className="hover:bg-gradient-to-r from-gray-700 to-gray-600 hover:text-white hover:shadow-xl rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center"
          onClick={() => navigate('/admin/settings-admin')}
        >
          <Settings className="mr-4 text-gray-400" />
          <span className="font-semibold text-lg">Cài đặt</span>
        </div>
      </div>
    </div>
  );
}
