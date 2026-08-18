import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: entry('./index.html'),
        project1: entry('./projects/project-1/index.html'),
        project2: entry('./projects/project-2/index.html'),
        project3: entry('./projects/project-3/index.html'),
        project4: entry('./projects/project-4/index.html'),
        project5: entry('./projects/project-5/index.html'),
      },
    },
  },
});
