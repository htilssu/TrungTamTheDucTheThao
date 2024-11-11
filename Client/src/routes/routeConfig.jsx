import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout.jsx';
import {PageNotFound} from '../pages/PageNotFound.jsx';
import SignUp from '../pages/sign-up/SignUp.jsx';
import ForgotPassword from '../pages/forgot-password/ForgotPassword.jsx';
import Home from '../pages/home/HomePage.jsx';
import RentYardPage from '../modules/core/components/rent-a-yard/SoccerField/RentYardPage.jsx';
import SoccerFieldInfo from '../modules/core/components/rent-a-yard/SoccerField/SoccerFieldInfo.jsx';
import SignIn from '../pages/sign-in/SignIn.jsx';
import HistoryBooking from '../modules/core/components/rent-a-yard/SoccerField/HistoryBooking.jsx';
import GymPage from '../modules/core/components/gym/GymPage.jsx';
import FootballLayout from '../pages/admin/layout-admin/football-manage/FootballLayout.jsx';
import FieldListPage from '../pages/admin/layout-admin/football-manage/FieldListPage.jsx';
import StatisticalPage from '../pages/admin/layout-admin/football-manage/StatisticalPage.jsx';
import BookingFieldPage from '../pages/admin/layout-admin/football-manage/booking-field/BookingFieldPage.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import EmployeeLayout from '../pages/admin/layout-admin/employee-manage/EmployeeLayout.jsx';
import StatisticalLayout from '../pages/admin/layout-admin/statistics-manage/StatisticalLayout.jsx';
import CustomerLayout from '../pages/admin/layout-admin/customer-manage/CustomerLayout.jsx';
import HomeAdminLayout from '../pages/admin/home-admin/HomeAdminLayout.jsx';
import PostLayout from '../pages/admin/layout-admin/post-manage/PostLayout.jsx';
import RoleLayout from '../pages/admin/layout-admin/role-manage/RoleLayout.jsx';
import SettingLayout from '../pages/admin/layout-admin/setting-manage/SettingLayout.jsx';
import RoomLayout from '../pages/admin/layout-admin/gym-manage/RoomLayout.jsx';
import HomeSoccerPage from '../pages/admin/layout-admin/football-manage/HomeSoccerLayout.jsx';
import UserDisplay from '../pages/UserDisplay/UserDisplay.jsx';
import BookingPage from '../modules/core/components/booking/field/BookingFieldList.jsx';
import ContactPage from '../modules/core/components/contact/ContactPage.jsx';
import Room from './../pages/admin/layout-admin/gym-manage/Room';
import Room from './../pages/admin/layout-admin/gym-manage/Room';

import CoursesManage from '../pages/admin/CoursesManage/CoursesManage.jsx';
import Sellcourses from '../pages/admin/layout-admin/courses-manage/Sellcourses.jsx';
import EquipmentType from '../pages/admin/equipment/EquipmentType.jsx';
import EquipmentLayout from '../pages/admin/equipment/EquipmentLayout.jsx';
import Equipment from '../pages/admin/equipment/Equipment.jsx';
import EquipmentList from '../pages/admin/equipment/EquipmentList.jsx';
import HistoryBookingAdmin from '../pages/admin/layout-admin/football-manage/HistoryBookingPage.jsx';

export const router = createBrowserRouter([
  {
    path: 'admin',
    element: <AdminDashboard/>,
    children: [
      {
        index: true,
        element: <HomeAdminLayout/>,
      },
      {
        path: 'post-manage',
        element: <PostLayout/>,
      },
      {
        path: 'room-manage',
        element: <RoomLayout/>,
        children: [
          {
            index: true,
            element: <Room/>,
          },
        ],
      },
      {
        path: 'customer-manage',
        element: <CustomerLayout/>,
      },
      {
        path: 'statistic-manage',
        element: <StatisticalLayout/>,
      },
      {
        path: 'employee-manage',
        element: <EmployeeLayout/>,
      },
      {
        path: 'courses-manage',
        element: <CoursesManage/>,
      },

      {
        path: 'courses-manage',
        element: <CoursesManage/>,
      },
      {
        path: 'sellcourses',
        element: <Sellcourses/>,
      },
      {
        path: 'equipmentType',
        element: <EquipmentType/>,
      },
      {
        path: 'equipment',
        element: <Equipment/>,
      },

      {
        path: 'equipmentlayout',
        element: <EquipmentLayout/>,
      },
      {
        path: 'equipmentList',
        element: <EquipmentList/>,
      },
      {
        path: 'soccer-manage',
        element: <FootballLayout/>,
        children: [
          {
            index: true,
            element: <HomeSoccerPage/>,
          },
          {
            path: 'list',
            element: <FieldListPage/>,
          },
          {
            path: 'booking',
            element: <BookingFieldPage/>,
          },
          {
            path: 'history',
            element: <HistoryBookingAdmin/>,
          },
          {
            path: 'thongke',
            element: <StatisticalPage/>,
          },
        ],
      },
      {
        path: 'role-manage',
        element: <RoleLayout/>,
      },
      {
        path: 'setting',
        element: <SettingLayout/>,
      },
    ],
    errorElement: <PageNotFound/>,
  },
  {
    path: '',
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'soccer',
        element: <SoccerFieldInfo/>,
      },
      {
        path: 'soccer/rent-yard',
        element: <RentYardPage/>,
      },
      {
        path: 'gym',
        element: <GymPage/>,
      },
      {
        path: 'user/:id',
        element: <UserDisplay/>,
      },
      {
        path: 'booking',
        element: <BookingPage/>,
      }
      ,
      {
        path: '/history-booking',
        element: <HistoryBooking/>,
      },
      {
        path: '/sellcourses',
        element: <Sellcourses/>,
      },
      {
        path: '/contact',
        element: <ContactPage/>,
      },
    ],
    errorElement: <PageNotFound/>,
  },
  {
    path: 'sign-up',
    element: <SignUp/>,
  },
  {
    path: 'sign-in',
    element: <SignIn/>,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword/>,
  },

]);
