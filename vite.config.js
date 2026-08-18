import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: entry('./index.html'),
        project1: entry('./projects/project_1/index.html'),
        project2: entry('./projects/project_2/index.html'),
        project3: entry('./projects/project_3/index.html'),
        project4: entry('./projects/project_4/index.html'),
        project5: entry('./projects/project_5/index.html'),
        project6: entry('./projects/project_6/index.html'),
        project7: entry('./projects/project_7/index.html'),
      },
    },
  },
});
