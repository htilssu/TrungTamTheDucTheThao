import './App.css';
import {RouterProvider} from 'react-router-dom';
import {router} from './routes/routeConfig.jsx';

function App({children}) {

  return (
      <RouterProvider router={router}>
      </RouterProvider>
  );
}

export default App;
