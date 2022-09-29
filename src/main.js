/*
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 15:05:53
 * @Description:
 */
import { createApp } from 'vue';
import './style.css';
import Element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
createApp(App).use(store).use(router).use(Element3).mount('#app');

// window.onerror = function (e) {
//     console.log(['https://stackoverflow.com/search?q=[js]+' + e]);
// };
