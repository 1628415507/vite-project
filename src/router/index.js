/*
 * @Author: Hongzf
 * @Date: 2022-09-26 14:56:12
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 16:58:12
 * @Description: 路由
 */
// createRouter⽤来新建 路由事例， 
// createWebHashHistory⽤来配置我们内部使⽤hash模式的路由，也就是url上会通过 # 来区分。
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/home.vue';
import Transition from '../pages/transition.vue';
import Store from '../pages/count.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/transition', name: 'Transition', component: Transition },
    { path: '/store', name: 'Store', component: Store }

];
const router = createRouter({ history: createWebHashHistory(), routes });
export default router;
