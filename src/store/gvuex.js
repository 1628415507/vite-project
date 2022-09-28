/*
 * @Author: Hongzf
 * @Date: 2022-09-27 17:29:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 09:37:55
 * @Description: ⼿写迷你Vuex
 */
import { inject, reactive, computed } from 'vue';
const STORE_KEY = '__store__';
function useStore() {
    return inject(STORE_KEY);
}
// 暴露createStore去创建Store的实例
function createStore(options) {
    return new Store(options);
}
class Store {
    constructor(options) {
        this.$options = options;
        // Store类内部变量_state存储响应式数据
        this._state = reactive({ data: options.state() }); //获取传入的state,变成响应式
        this._mutations = options.mutations; //获取传入的mutations
        this._actions = options.actions;
        // getters
        this.getters = {};
        Object.keys(options.getters).forEach(name => {
            const fn = options.getters[name]; //获取⽤⼾配置好的getters
            //用computed包裹，将getters的内容变成计算属性
            this.getters[name] = computed(() => fn(this.state));
        });
    }
    // 【state方法实现】：读取state的时候直接获取响应式数据 _state.data
    get state() {
        return this._state.data;
    }
    // 【commit方法实现】：提供commit函数去执⾏⽤⼾配置好的mutations。
    commit = (type, payload) => {
        console.log('【 type, payload 】-30', type, payload);
        // type：commit传入的方法名
        const entry = this._mutations[type]; //获取⽤⼾配置好的mutations
        entry && entry(this.state, payload);
    };
    // 【dispatch方法实现】：提供commit函数去执⾏⽤⼾配置好的mutations。
    dispatch(type, payload) {
        const entry = this._actions[type]; //获取⽤⼾配置好的actions
        return entry && entry(this, payload);
    }
    // 为了让useStore能正常 ⼯作，我们需要给store新增⼀个install⽅法，
    // 这个⽅法会在app.use函数内部执⾏。我们通过app.provide函数注册store给全局的组件使⽤。
    install(app) {
        // provide注册了数据后，所有的⼦组件都可以通过inject获取数据，
        app.provide(STORE_KEY, this);
    }
}
export { createStore, useStore };
