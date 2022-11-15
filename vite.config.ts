/*
 * @Author: Hongzf
 * @Date: 2022-11-15 13:35:38
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-15 14:09:02
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src')// 1.@ 指向 src 目录
    }
  },
  base: './', // 2.打包路径
  server: {
    port: 8888, // 3.服务端口号
    open: true, // 4.服务启动时是否自动打开浏览器
    cors: true // 5.允许跨域 TODO
  }
})
