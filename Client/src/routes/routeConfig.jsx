import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/HomePage.jsx';
import {MainLayout} from '../layouts/MainLayout.jsx';
import {PageNotFound} from '../pages/PageNotFound.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: <MainLayout/>,
        children: [
          {
            element: <Home/>,
          },
        ],
      },
    ],
    errorElement: <PageNotFound/>,
  },
]);
