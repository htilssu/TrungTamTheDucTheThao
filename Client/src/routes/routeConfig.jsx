import {createBrowserRouter} from 'react-router-dom';
import Home from "../pages/HomePage.jsx";
import {MainLayout} from "../layouts/MainLayout.jsx";
import {PageNotFound} from "../pages/PageNotFound.jsx";
import SignIn from '../modules/core/components/account/SingIn.jsx';

export const router = createBrowserRouter([
  {
    path: "/" , children: [
      {
        element: <MainLayout/>, children: [
          {
            path: 'home', element: <Home/>,
          },
          {
            path: 'sign-in', element: <SignIn/>,
          },
          
        ],
      },
    ] ,errorElement:<PageNotFound/>,
  },
]);