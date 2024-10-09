import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignUp from "../pages/sign-up/SignUp.jsx";
import ForgotPassword from "../pages/forgot-password/ForgotPassword.jsx";
import Home from "../pages/home/HomePage.jsx";
import RentYardPage from "../modules/core/components/rent-a-yard/SoccerField/RentYardPage.jsx";
import SoccerFieldInfo from "../modules/core/components/rent-a-yard/SoccerField/SoccerFieldInfo.jsx";
import SignIn from '../pages/sign-in/SignIn.jsx';
import GymPage from "../modules/core/components/gym/GymPage.jsx";
import FootballLayout from "../pages/admin/layout-admin/football-manage/FootballLayout.jsx";
import FieldListPage from "../pages/admin/layout-admin/football-manage/FieldListPage.jsx";
import StatisticalPage from "../pages/admin/layout-admin/football-manage/StatisticalPage.jsx";
import BookingSchedule from "../pages/admin/layout-admin/football-manage/BookingSchedule.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import EmployeeLayout from "../pages/admin/layout-admin/employee-manage/EmployeeLayout.jsx";
import StatisticalLayout from "../pages/admin/layout-admin/statistics-manage/StatisticalLayout.jsx";
import CustomerLayout from "../pages/admin/layout-admin/customer-manage/CustomerLayout.jsx";
import HomeAdminLayout from "../pages/admin/home-admin/HomeAdminLayout.jsx";
import PostLayout from "../pages/admin/layout-admin/post-manage/PostLayout.jsx";
import RoleLayout from "../pages/admin/layout-admin/role-manage/RoleLayout.jsx";
import SettingLayout from "../pages/admin/layout-admin/setting-manage/SettingLayout.jsx";
import HomeSoccerPage from "../pages/admin/layout-admin/football-manage/HomeSoccerLayout.jsx";
import GymCourse from '../pages/admin/layout-admin/gym-manage/show/GymCourse.jsx';
import GymCost from '../pages/admin/layout-admin/gym-manage/show/GymCost.jsx';
import GymStatistical from '../pages/admin/layout-admin/gym-manage/show/GymStatistical.jsx';
import Room from '../pages/admin/layout-admin/gym-manage/show/Room.jsx';
import RoomLayout from '../pages/admin/layout-admin/gym-manage/layout/RoomLayout.jsx';

export const router = createBrowserRouter([
    {
        path: 'admin',
        element: <AdminDashboard/>, // Quản lý sân sẽ là trang cha
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
                path: 'gym-manage',
                element: <RoomLayout/>,
                children: [
                    {
                        index: true,
                        element: <Room/>,
                    },
                    {
                        path: 'ad-room',
                        element: <Room/>,
                    },
                    {
                        path: 'gym-course',
                        element: <GymCourse/>,
                    },
                    {
                        path: 'gym-cost',
                        element: <GymCost/>,
                    },
                    {
                        path: 'gym-statistical',
                        element: <GymStatistical/>,
                    },
                ]
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
                      path: 'lichdat',
                      element: <BookingSchedule/>,
                  },
                  {
                      path: 'thongke',
                      element: <StatisticalPage/>,
                  },
              ]
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
            }
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
    {
        path: '',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: '/soccer',
                element: <SoccerFieldInfo/>,
            },
            {
                path: '/soccer/rent-yard',
                element: <RentYardPage/>
            }
            ,
            {
                path: '/gym',
                element: <GymPage/>
            }
        ],
        errorElement: <PageNotFound/>,
    },
]);
