import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Sépare React et React-DOM dans un chunk dédié
          'react-vendor': ['react', 'react-dom'],
          // Sépare les grosses librairies
          'heavy-libs': ['html2canvas', 'dompurify']
        }
      }
    },
    // Augmente la limite pour éviter les warnings
    chunkSizeWarningLimit: 1000
  }
});
