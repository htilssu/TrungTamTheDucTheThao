import {createBrowserRouter} from 'react-router-dom';
import Home from "../pages/HomePage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignIn from '../pages/sign-in/SignIn.jsx';
import Test from '../modules/core/components/account/test.jsx';
import SignUp from './../pages/sign-up/SignUp';
import ForgotPassword from './../pages/forgot-password/ForgotPassword';



export const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
        children: [
          {
            element: <Home/>,
          },
          {
            path: 'sign-in', element: <SignIn/>,
          },
        ],
        errorElement: <PageNotFound/>,
    },
    {
        path: 'sign-up', element: <SignUp/>,
    },
    {
        path: 'forgot-password', element: <ForgotPassword/>,
    },
]);
