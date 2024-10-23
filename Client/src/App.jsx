
import {RouterProvider} from 'react-router-dom';
import {router} from './routes/routeConfig.jsx';
import {MantineProvider} from '@mantine/core';
import { UserProvider } from './context/UserContext.jsx';
function App() {
  return (
    <UserProvider>
    <MantineProvider>
      <RouterProvider router={router}/>
    </MantineProvider>
    </UserProvider>
  );
}

export default App;
