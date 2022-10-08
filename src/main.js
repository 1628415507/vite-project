/*
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 18:18:27
 * @Description:
 */
import { createApp } from 'vue'
import './style.css'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
const app = createApp(App)
app.use(store).use(router).use(Element3).mount('#app')
// 注册⼀个全局⾃定义指令 `v-focus`
app.directive('focus', {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
        // console.log('【 el 】-21', el)
        // 聚焦元素
        el.focus()
    }
})
// window.onerror = function (e) {
//     console.log(['https://stackoverflow.com/search?q=[js]+' + e]);
// };
