import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'assets'
        }
      ]
    }),
  ],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  build: {
    rollupOptions: {
      external: ['react-toastify'],
    },
  },
});