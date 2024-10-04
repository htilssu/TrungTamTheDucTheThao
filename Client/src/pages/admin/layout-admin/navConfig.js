import { Home, ManageAccounts, Security, Settings, Assignment } from '@mui/icons-material';

export const navItems = [
  { icon: Home, label: 'Trang chủ', path: '/admin/dashboard' },
  {
    icon: ManageAccounts,
    label: 'Quản lý',
    subItems: [
      { icon: ManageAccounts, label: 'Quản lý người dùng', path: '/admin/users' },
      { icon: Assignment, label: 'Quản lý bài đăng', path: '/admin/manage' },
    ],
  },
  { icon: Security, label: 'Phân quyền', path: '/admin/roles' },
  { icon: Settings, label: 'Cài đặt', path: '/admin/settings-admin' },
];
