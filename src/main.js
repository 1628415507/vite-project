/*
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 16:31:08
 * @Description:
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
createApp(App).use(store).use(router).mount('#app');
