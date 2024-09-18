import {createBrowserRouter} from 'react-router-dom';

import Home from "../pages/HomePage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignUp from "../pages/sign-up/SignUp.jsx";
import ForgotPassword from "../pages/forgot-password/ForgotPassword.jsx";

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
        path: 'forgot-password', element: <ForgotPassword/>,
    },
]);
