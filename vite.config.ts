import react from "@vitejs/plugin-react-swc";
import path from "path";
import ufonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svgr(),
    react(),
    ufonts({
      custom: {
        display: 'swap',
        preload: true,
        injectTo: 'head-prepend',
        prefetch: false,
        families: [
          {
            name: 'Poppins',
            local: 'Poppins-Regular',
            src: [
              './src/assets/fonts/Poppins/Poppins-Regular.ttf',
              './src/assets/fonts/Poppins/Poppins-Regular.woff',
              './src/assets/fonts/Poppins/Poppins-Regular.woff2'
            ],
            transform(font) {
              if (font.basename === 'Poppins-Regular') {
                font.weight = 400
              }

              return font
            }
          },
          {
            name: 'Poppins',
            local: 'Poppins-Medium',
            src: [
              './src/assets/fonts/Poppins/Poppins-Medium.ttf',
              './src/assets/fonts/Poppins/Poppins-Medium.woff',
              './src/assets/fonts/Poppins/Poppins-Medium.woff2'
            ],
            transform(font) {
              if (font.basename === 'Poppins-Medium') {
                font.weight = 500
              }
              return font
            }
          },
        ],
      },
    }),
  ],
  assetsInclude: /\.(svg|png|jpg|jpeg|gif|mp4)$/,
  server: {
    host: true,
    strictPort: true,
  },
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      // Temporary Fix to Warn on Build (Remove in Future)
      onwarn(warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_ERROR') {
          return
        }
        defaultHandler(warning)
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});



