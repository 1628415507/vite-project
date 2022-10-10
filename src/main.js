/*
 * @Author: Hongzf
 * @Date: 2022-10-10 11:09:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-10 14:22:44
 * @Description:
 */
// 这时候就不能直接从vue中引入createApp了，
// 而是需要从runtime-core中导入createRenderer。

import { createApp } from './renderer-threejs.js'
// import { createApp } from './renderer-cavans.js'

import App from './App.vue'
createApp(App).mount('#app');
