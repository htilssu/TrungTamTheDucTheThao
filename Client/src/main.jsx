import {DevSupport} from '@react-buddy/ide-toolbox';
import {ComponentPreviews, useInitial} from './dev/index.js';
import {StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="725021220737-fg2uf1k9608c4adh85kbik9v9cits0vu.apps.googleusercontent.com">
    <StrictMode>
      <Suspense fallback={'Loading'}>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}>
          <App/>
        </DevSupport>
      </Suspense>
    </StrictMode>,
  </GoogleOAuthProvider>
);
