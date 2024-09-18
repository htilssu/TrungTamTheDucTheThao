import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google'; //Google Account - Api 

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="725021220737-fg2uf1k9608c4adh85kbik9v9cits0vu.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>,
  </GoogleOAuthProvider>
);
