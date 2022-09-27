<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 14:59:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 13:32:37
 * @Description: 
-->
<template>
    <h1>这是⾸⻚</h1>
    <hr />
    <p>计数器</p>
    <Count />

    <hr />
    <p>任务清单</p>
    <TodoList />

    <hr />
    <p>评分</p>
    <Rate :value="score1" theme="green" />
    <Rate2 :value="score2" @update-rate="updateRate" />
    <Rate3 v-model="score3" theme="pink" >插槽</Rate3>
</template>
<script setup>
// 组件
import TodoList from '../components/TodoList-computed.vue';
import Count from '../components/Count-ref.vue';
import Rate from '../components/Rate/Rate1-defineProps.vue';
import Rate2 from '../components/Rate/Rate2-event.vue';
import Rate3 from '../components/Rate/Rate3-v-model.vue';

// 方法
import { ref } from 'vue';
import { useMouse } from '../utils/mouse';
//
let { x, y } = useMouse();
// console.log('【 x,y 】-16', x.value, y.value);
// 评分
let score1 = ref(3);
let score2 = ref(3);
function updateRate(num) {
    score2.value = num;
}
let score3 = ref(2);
</script>
