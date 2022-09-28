/*
 * @Author: Hongzf
 * @Date: 2022-09-27 16:19:48
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 14:13:47
 * @Description:
 */
// 引用原版vuex
import { createStore } from 'vuex';
// 引用自定义 vuex
// import { createStore } from './gvuex'
const store = createStore({
    state() {
        return { count: 666 };
    },
    // vuex的计算属性
    getters: {
        double(state) {
            return state.count * 2;
        }
    },
    // mutations：同步修改数据， mutation内部的函数会把state作为参数，
    mutations: {
        add(state) {
            // 我们直接操作state.count就可以完成数据的修改。
            state.count++;
        }
    },
    // mutations：异步修改数据
    actions: {
        // 这个配置中所有的函数，可以通过解构获得 commit函数。
        // 内部的异步任务完成后，就随时可以调⽤commit来执⾏mutations去更新数据。
        asyncAdd({ commit }) {
            setTimeout(() => {
                commit('add'); //可以调⽤commit来执⾏mutations去更新数据。
            }, 1000);
        }
    }
});
export default store;
