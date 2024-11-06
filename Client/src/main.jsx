import {DevSupport} from '@react-buddy/ide-toolbox';
import {ComponentPreviews, useInitial} from './dev/index.js';
import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';

export const root = createRoot(document.getElementById('root'));
export const backEnd = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

root.render(
    <StrictMode>
      <Suspense fallback={'Loading'}>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}>
          <App/>
        </DevSupport>
      </Suspense>
    </StrictMode>,
);


