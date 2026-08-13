import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        membership: resolve(__dirname, 'membership.html'),
        success: resolve(__dirname, 'success.html'),
        news: resolve(__dirname, 'news.html'),
        about: resolve(__dirname, 'about.html'),
        minutes: resolve(__dirname, 'minutes.html'),
        contests: resolve(__dirname, 'contests.html'),
        repeaters: resolve(__dirname, 'repeaters.html'),
        equipment: resolve(__dirname, 'equipment.html'),
        technical: resolve(__dirname, 'technical.html'),
        training: resolve(__dirname, 'training.html'),
        equipmentTesting: resolve(__dirname, 'equipment-testing.html'),
        links: resolve(__dirname, 'links.html'),
        404: resolve(__dirname, '404.html')
      }
    }
  }
});
