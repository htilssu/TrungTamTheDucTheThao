import {createBrowserRouter} from 'react-router-dom';

import Home from '../pages/HomePage.jsx';
import {MainLayout} from '../layouts/MainLayout.jsx';
import {PageNotFound} from '../pages/PageNotFound.jsx';
import SignIn from '../pages/sign-in/SignIn.jsx';

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
]);
