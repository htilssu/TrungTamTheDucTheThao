import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  experimental: {},
  build: {
    cssCodeSplit: true,
  },
<<<<<<< HEAD
=======
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
>>>>>>> a152b99ff4de6320a64651e66125921cfdaf9a93
});
