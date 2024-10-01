import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from "../layouts/MainLayout.jsx";
import { PageNotFound } from "../pages/PageNotFound.jsx";
import SignUp from "../pages/sign-up/SignUp.jsx";
import ForgotPassword from "../pages/forgot-password/ForgotPassword.jsx";
import Home from "../pages/home/HomePage.jsx";
import RentYardPage from "../modules/core/components/rent-a-yard/SoccerField/RentYardPage.jsx";
import SoccerFieldInfo from "../modules/core/components/rent-a-yard/SoccerField/SoccerFieldInfo.jsx";
import SignIn from '../pages/sign-in/SignIn.jsx';
import GymPage from "../modules/core/components/gym/GymPage.jsx";
import ManagementHome from "../modules/core/components/admin/ManagementHome.jsx";
import FieldListPage from "../modules/core/components/admin/FieldListPage.jsx";
import StatisticalPage from "../modules/core/components/admin/StatisticalPage.jsx";
import BookingSchedule from "../modules/core/components/admin/BookingSchedule.jsx";
import LayoutDashBoard from '../pages/admin/layout-admin/LayoutDashBoard.jsx';
import OverviewPage from '../pages/admin/OverviewPage.jsx';
import ServiceManagementController from './../pages/admin/ServiceManagementController';
import RolesController from './../pages/admin/RolesController';
import SettingAdmin from './../pages/admin/SettingAdmin';
import GymManagement from './../pages/admin/post-admin/GymManagement';

export const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'soccer',
                element: <SoccerFieldInfo />,
            },
            {
                path: 'soccer/rent-yard',
                element: <RentYardPage />,
            },
            {
                path: 'gym',
                element: <GymPage />,
            }
        ],
        errorElement: <PageNotFound />,
    },
    {
        path: 'sign-up',
        element: <SignUp />,
    },
    {
        path: 'sign-in',
        element: <SignIn />,
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: 'admin',
        element: <LayoutDashBoard />,
        children: [
            {
                path: 'dashboard',
                element: <OverviewPage />,
            },
            {
                path: 'manage',
                element: <ServiceManagementController />,
            },
            {
                path: 'roles',
                element: <RolesController />,
            },
            {
                path: 'settings-admin',
                element: <SettingAdmin />,
            },
            {
                path: 'gym-management',
                element: <GymManagement />,
            },
        ],
        errorElement: <PageNotFound />,
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
            element: <SoccerFieldInfo />,
        },
        {
            path: '/soccer/rent-yard',
            element: <RentYardPage />
        }
        ,
        {
            path: '/gym',
            element: <GymPage />
        }
        ,
        {
            path: 'manage-soccer',
            element: <ManagementHome />, // Quản lý sân sẽ là trang cha
            children: [
                {
                    index: true, // Trang mặc định là danh sách sân
                    path: 'list',
                    element: <FieldListPage />,
                },
                {
                    path: 'lichdat', // Đường dẫn cho Lịch Đặt
                    element: <BookingSchedule />,
                },
                {
                    path: 'thongke', // Đường dẫn cho Thống Kê
                    element: <StatisticalPage />,
                },
            ],
        },
    ],
    errorElement: <PageNotFound/>,
  },
]);
