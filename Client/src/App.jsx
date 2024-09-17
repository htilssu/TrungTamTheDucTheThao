import {RouterProvider} from 'react-router-dom';
import {router} from './routes/routeConfig.jsx';
import {MantineProvider} from '@mantine/core';

function App() {
  return <MantineProvider>
    <RouterProvider router={router}/>
  </MantineProvider>;
}

export default App;
