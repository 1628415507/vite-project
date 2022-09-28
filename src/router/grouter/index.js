/*
 * @Author: Hongzf
 * @Date: 2022-09-28 10:34:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 13:36:26
 * @Description: 手写vue-router
 */
import { ref, inject } from 'vue';
import RouterLink from './RouterLink.vue';
import RouterView from './RouterView.vue';
const ROUTER_KEY = '__router__';
// 使⽤createWebHashHistory来返回hash模式相关的监听代码（当前URL和监听hashchange事件的⽅法）；
// 然后，我们通过Router类的install ⽅法注册了Router的实例，
// 并对外暴露createRouter⽅法去创建Router实例；
// 最后，我们还暴露了 useRouter⽅法，去获取路由实例。

// 暴露createRouter⽅法去创建Router实例；
function createRouter(options) {
    return new Router(options);
}
// 暴露useRouter⽅法，去获取路由实例。
function useRouter() {
    return inject(ROUTER_KEY);
}
// 使⽤createWebHashHistory来返回hash模式相关的监听代码（当前URL和监听hashchange事件的⽅法）
function createWebHashHistory() {
    // 监听hashchange事件的⽅法s
    function bindEvents(fn) {
        window.addEventListener('hashchange', fn);
    }
    // 返回当前URL和监听hashchange事件的⽅法；
    return {
        bindEvents,
        url: window.location.hash.slice(1) || '/' //当前URL
    };
}
class Router {
    constructor(options) {
        console.log('【 手写vue-router 】-39');
        this.history = options.history; // options.history:createWebHashHistory的实例
        // console.log('【  this.history 】-40',  this.history)
        this.routes = options.routes; //获取路由参数

        this.current = ref(this.history.url); //获取当前url，变成响应式
        // console.log('【  this.current  】-44',  this.current )
        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1); //获取当前url的hash值
        });
    }
    // 通过Router类的install ⽅法注册了Router的实例，
    install(app) {
        app.provide(ROUTER_KEY, this);
        app.component('router-link', RouterLink);
        app.component('router-view', RouterView);
    }
}

export { createRouter, createWebHashHistory, useRouter };
