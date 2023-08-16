import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { findPage, findLowCodeComponent } from './scripts/find';
import lowCodeServer from "./plugins/low-code";

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
    plugins: [vue(), lowCodeServer()],
    define: isDev
        ? {
              ...(await findPage()),
              ...(await findLowCodeComponent())
          }
        : {},
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@board': path.resolve(__dirname, './src/modules/board'),
            '@pixso': path.resolve(__dirname, './src/modules/pixso'),
        },
    },
});
