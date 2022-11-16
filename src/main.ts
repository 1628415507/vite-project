/*
 * @Author: Hongzf
 * @Date: 2022-11-15 13:35:38
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-16 09:10:32
 * @Description:
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
