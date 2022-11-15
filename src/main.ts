/*
 * @Author: Hongzf
 * @Date: 2022-11-15 13:35:38
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-15 14:25:09
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'

createApp(App).use(router).use(store).mount('#app')
