/*
 * @Author: Hongzf
 * @Date: 2022-10-10 15:15:41
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-11 16:42:19
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
console.log('【 vue 】-3', vue);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VueSetupExtend()]
});
