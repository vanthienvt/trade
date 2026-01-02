import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Auto-detect base path for GitHub Pages
    // Use VITE_BASE_URL if set, otherwise auto-detect from GITHUB_REPOSITORY
    const base = env.VITE_BASE_URL || 
      (process.env.GITHUB_REPOSITORY 
        ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` 
        : '/');
    
    return {
      base: base.endsWith('/') ? base : base + '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'http://localhost:3001')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
