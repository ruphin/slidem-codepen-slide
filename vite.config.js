import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = import.meta.dirname;

export default defineConfig(({ command, mode }) => {
  // `vite` (dev) and `--mode demo` (demo build + preview) work on the demo page in demo/
  if (command === 'serve' || mode === 'demo') {
    return {
      root: resolve(root, 'demo'),
      server: { fs: { allow: [root] } },
      build: { outDir: resolve(root, 'dist-demo'), emptyOutDir: true }
    };
  }

  // `vite build`: library build of the element
  return {
    build: {
      outDir: resolve(root, 'dist'),
      emptyOutDir: true,
      sourcemap: true,
      lib: {
        entry: resolve(root, 'src/slidem-codepen-slide.js'),
        formats: ['es'],
        fileName: () => 'slidem-codepen-slide.js'
      },
      rollupOptions: {
        // Keep dependencies external so consumers share one copy of Gluon and Slidem
        external: [/^@gluon\//, /^slidem(\/|$)/]
      }
    },
    test: { root }
  };
});
