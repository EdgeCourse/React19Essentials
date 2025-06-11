// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,         // <-- THIS is what you need!
    setupFiles: '../../setupTests.js' // optional
  },
});
