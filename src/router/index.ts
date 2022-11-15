/*
 * @Author: Hongzf
 * @Date: 2022-11-15 14:11:27
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-15 14:13:21
 * @Description: 
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home.vue')
  },
  { path: '/', redirect: { name: 'Home' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router