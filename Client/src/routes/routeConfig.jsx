import {createBrowserRouter} from 'react-router-dom';

import Home from "../pages/HomePage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignIn from '../modules/core/components/account/SignIn.jsx';
import Forgotpassword from "../modules/core/components/account/ForgotPassword.jsx";
import SignUp from "../modules/core/components/account/SignUp.jsx";


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
        path: 'sign-in',
        element: <SignIn/>,
    },
    {
        path: 'signup', element: <SignUp/>,
    },
    {
        path: 'forgot-password', element: <Forgotpassword/>,
    },
]);
