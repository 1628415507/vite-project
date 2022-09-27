<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 14:59:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 15:33:51
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
    <!-- 无动画效果 -->
    <!-- <TransitionBox></TransitionBox> -->
    <!-- 有动画效果 -->
    <!-- <TodoListTransition></TodoListTransition> -->
    <!-- 列表过渡动画 -->
    <!-- <TodoListTransitionGroup></TodoListTransitionGroup> -->
    <!-- JavaScript动画 -->
    <TodoListJSTransition></TodoListJSTransition>

    <hr />
    <p>评分</p>
    <Rate :value="score1" theme="green" />
    <!-- emit方法 -->
    <Rate2 :value="score2" @update-rate="updateRate" />
    <!-- 插槽 -->
    <Rate3 v-model="score3" theme="pink">插槽</Rate3>
</template>
<script setup>
// 组件
import Count from '../components/Count-ref.vue';
// import TodoList from '../components/TodoList/TodoList-computed.vue';
// import TodoListTransition from '../components/TodoList/TodoList2-transition.vue';
import TodoListTransitionGroup from '../components/TodoList/TodoList3-transition-group.vue';
import TodoListJSTransition from '../components/TodoList/TodoList4-js-transition.vue';

import TransitionBox from '../components/动画/TransitionBox.vue';

// 组件化
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
