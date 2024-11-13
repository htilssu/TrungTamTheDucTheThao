import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  experimental: {},
  build: {
    cssCodeSplit: true,
  },
});
