import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import pocketMockPlugin from './vite-plugin-pocket-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    pocketMockPlugin(),
  ],
})
