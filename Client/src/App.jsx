import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routeConfig.jsx';
import { MantineProvider } from '@mantine/core';
import { UserProvider } from './context/UserContext.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from './modules/cache.js';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

function App() {
    const mode = import.meta.env.MODE;
  return (
      <UserProvider>
        <MantineProvider>
          <QueryClientProvider client={queryClient}>
              {mode === 'development' && <ReactQueryDevtools initialIsOpen={false}/>}
            <RouterProvider router={router} />
          </QueryClientProvider>
        </MantineProvider>
      </UserProvider>
  );
}

export default App;
