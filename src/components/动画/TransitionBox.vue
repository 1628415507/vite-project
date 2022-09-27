<!--
 * @Author: Hongzf
 * @Date: 2022-09-27 13:57:41
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 14:16:11
 * @Description: 
-->
<template>
    <div class="box" :style="{ width: width + 'px' }"></div>
    <button @click="change">click</button>
</template>
<script setup>
import { ref } from 'vue';
let width = ref(100);
function change() {
    width.value += 100;
}
</script>
<style scoped>
.box {
    background: red;
    height: 100px;
    transition: width 1s linear;
}
</style>
