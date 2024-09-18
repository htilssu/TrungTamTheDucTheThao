import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/home/HomePage.jsx';
import {MainLayout} from '../layouts/MainLayout.jsx';
import {PageNotFound} from '../pages/PageNotFound.jsx';

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
]);
