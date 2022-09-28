<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 17:06:10
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 14:14:00
 * @Description: 计算组件-vuex
-->
<template>
    <div>
        <p @click="add">同步修改：{{ count }}</p>
        <p @click="asyncAdd">异步修改：{{ count }}</p>
        <p>计算属性getters：{{double}}</p>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
// 原版vuex
import { useStore } from 'vuex'; 
//手写vuex
// import { useStore } from '../../store/gvuex.js' 

let store = useStore();
// 从计算属性中获取vuex
// 使用state获取vuex中的值
let count = computed(() => {
    return store.state.count;
});
// 使用getters获取vuex中的值
let double = computed(() => {
    return store.getters.double;
});
let color = ref('pink'); //css中使用
// 同步
function add() {
    store.commit('add');
    color.value = Math.random() > 0.5 ? 'green' : 'pink';
}
// 异步
function asyncAdd() {
    store.dispatch('asyncAdd');
}
</script>
<style scoped>
p {
    color: v-bind(color);
}
</style>
