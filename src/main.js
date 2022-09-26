/*
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-26 15:03:12
 * @Description:
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
createApp(App).use(router).mount('#app');
