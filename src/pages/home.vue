<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 14:59:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-26 17:06:29
 * @Description: 
-->
<template>
    <h1>这是⾸⻚</h1>
    <Count></Count>
    <TodoList />
</template>
<script setup>
import TodoList from '../components/TodoList.vue';
import Count from '../components/Count.vue';

import {useMouse} from '../utils/mouse'
let {x,y} = useMouse()
console.log('【 x,y 】-16', x.value,y.value)
</script>
