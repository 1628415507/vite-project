<!--
 * @Author: Hongzf
 * @Date: 2022-09-27 13:57:41
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 14:31:46
 * @Description: 
-->
<template>
    <button @click="toggle">click</button>
    <transition name="fade">
        <h1 v-if="showTitle">你好 Vue 3</h1>
    </transition>
</template>
<script setup>
import { ref } from 'vue';
let showTitle = ref(true);
function toggle() {
    showTitle.value = !showTitle.value;
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    /* 设置opacity有0.5秒的过渡时间*/
    transition: opacity 0.5s linear;
}
/* 在元素进⼊前和离开后设置 opacity为0 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
