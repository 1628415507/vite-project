/*
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-08 10:45:52
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
// 使⽤可视化的插件来查看包⼤⼩的分布
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
    plugins: [vue(), vueJsx(), visualizer()]
})
