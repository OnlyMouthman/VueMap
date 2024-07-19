import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//const ASSET_URL = process.env.ASSET_URL || '';
const ASSET_URL = (process.env.ASSET_URL || '') + '/MapWeb';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: `${ASSET_URL}/`,
})

