import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['slick-carousel/slick/slick.css', 'slick-carousel/slick/slick-theme.css'],
  },
  server: {
    hmr: {
      overlay: false, // Optional: Disables the overlay for errors
    },
   
  },
  plugins: [react()],
});
