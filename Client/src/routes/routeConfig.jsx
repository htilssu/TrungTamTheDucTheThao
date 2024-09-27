import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignUp from "../pages/sign-up/SignUp.jsx";
import ForgotPassword from "../pages/forgot-password/ForgotPassword.jsx";
import Home from "../pages/home/HomePage.jsx";
import RentYardPage from "../modules/core/components/rent-a-yard/SoccerField/RentYardPage.jsx";
import SoccerFieldInfo from "../modules/core/components/rent-a-yard/SoccerField/SoccerFieldInfo.jsx";
import SignIn from '../pages/sign-in/SignIn.jsx';
import Layout from '../pages/admin/dashboard/LayoutDashBoard.jsx';
import ServiceManagementController from '../pages/admin/ServiceManagementController.jsx';
import OverviewPage from '../pages/admin/OverviewPage.jsx';
import GymManagement from '../pages/admin/management-post/GymManagement.jsx';
import SoccerManagement from '../pages/admin/management-post/SoccerManagement.jsx';

export const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
        ],
        errorElement: <PageNotFound/>,
    },
    {
        path: 'sign-up', element: <SignUp/>,
    },
    {
        path: 'sign-in', element: <SignIn/>,
    },
    {
        path: 'forgot-password', element: <ForgotPassword/>,
    },
    {
        path: 'admin', 
        element: <Layout/>, 
        children: [
            {
                path: 'manage',
                element: <ServiceManagementController/> 
            },
            {
                path: 'soccer-management',
                element: <SoccerManagement/> 
            },
            {
                path: 'gym-management',
                element: <GymManagement/> 
            },
            {
                path: 'dashboard',
                element: <OverviewPage/> 
            },
        ]
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
    ],
    errorElement: <PageNotFound/>,
  },
]);
