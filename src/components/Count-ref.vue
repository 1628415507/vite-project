<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 17:06:10
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 10:21:12
 * @Description: 计算组件
-->
<template>
    <div>
        <h1 @click="add">{{ count }}</h1>
    </div>
</template>
<script setup>
import { ref } from 'vue';
let count = ref(1);
let color = ref('red');
function add() {
    count.value++;
    color.value = Math.random() > 0.5 ? 'blue' : 'red';
}
</script>
<style scoped>
h1 {
    color: v-bind(color);
}
</style>
>
