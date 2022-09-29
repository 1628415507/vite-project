/*
 * @Author: Hongzf
 * @Date: 2022-09-26 14:56:12
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 15:35:09
 * @Description: 路由
 */
// createRouter⽤来新建 路由事例， 
// createWebHashHistory⽤来配置我们内部使⽤hash模式的路由，也就是url上会通过 # 来区分。
import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHashHistory, } from './grouter/index' //手写router
//引入页面组件
import Login from '../pages/Login.vue'
import Home from '../pages/home.vue'
import Transition from '../pages/transition.vue'
import Store from '../pages/count.vue'
import About from '../pages/about.vue'
import { getToken } from '../utils/auth'

const routes = [
    { path: '/login', component: Login, hidden: true, },
    { path: '/', name: 'Home', component: Home },
    { path: '/transition', name: 'Transition', component: Transition },
    { path: '/store', name: 'Store', component: Store },
    { path: '/about', name: 'About', component: About }
]
const router = createRouter({ history: createWebHashHistory(), routes })
// 导航守卫拦截
router.beforeEach((to, from, next) => {
    // let token = getToken()
    // const { fullPath } = to
    // if (fullPath === '/login') {
    //   next()
    // }
    // if (!token) { next('/login') }
    next()
  })
export default router
