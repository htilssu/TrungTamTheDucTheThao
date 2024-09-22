import {createBrowserRouter} from 'react-router-dom';
import Home from "../pages/HomePage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignUp from './../pages/sign-up/SignUp';
import ForgotPassword from './../pages/forgot-password/ForgotPassword';
import SignIn from '../pages/sign-in/SignIn.jsx';



export const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
        children: [
          {
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
]);
