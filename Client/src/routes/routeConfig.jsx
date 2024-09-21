import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from '../layouts/MainLayout.jsx';
import {PageNotFound} from '../pages/PageNotFound.jsx';
import SignUp from '../pages/sign-up/SignUp.jsx';
import ForgotPassword from '../pages/forgot-password/ForgotPassword.jsx';
import Home from '../pages/home/HomePage.jsx';
import SignIn from '../pages/sign-in/SignIn';

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
    path: 'sign-up',
    element: <SignUp/>,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword/>,
  },
]);
