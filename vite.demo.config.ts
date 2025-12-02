import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // ⚠️ 注意：这里必须换成你的仓库名，例如 '/pocket-mock/'
  // 如果你的仓库名就是 pocket-mock，这里不用改
  base: './', 
  plugins: [
    svelte()
  ],
  resolve: {
    alias: {
      'pocket-mocker': resolve(__dirname, './src/index.ts') // 让 Demo 引用本地源码
    }
  },
  build: {
    outDir: 'demo-dist', // 输出到专门的演示目录
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});
