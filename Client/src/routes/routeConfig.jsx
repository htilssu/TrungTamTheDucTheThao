import {createBrowserRouter} from 'react-router-dom';

import Home from "../pages/HomePage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignIn from '../modules/core/components/account/SignIn.jsx';
import Test from '../modules/core/components/account/test.jsx';
import SignUp from "../modules/core/components/account/SignUp.jsx";
import ForgotPassword from "../modules/core/components/account/ForgotPassword.jsx";



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
          {
            path: 'test', element: <Test/>,
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
