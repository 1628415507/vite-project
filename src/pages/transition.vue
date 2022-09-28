<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 14:59:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 17:08:12
 * @Description: 
-->
<template>
    <h2>这是动画</h2>
    <hr />
    <h3>任务清单</h3>
    <!-- 无动画效果 -->
    <TodoList />
    <!-- 普通动画 -->
    <hr />
    <h3>普通动画</h3>
    <TransitionBox></TransitionBox>
    <!-- 有动画效果 -->
    <hr />
    <h3>提示动画</h3>
    <p>不输入值，按下enter键</p>
    <TodoListTransition></TodoListTransition>
    <!-- 列表过渡动画 -->
    <hr />
    <h3>列表过渡动画</h3>
    <TodoListTransitionGroup></TodoListTransitionGroup>
    <!-- JavaScript动画 -->
    <hr />
    <h3>JavaScript动画</h3>
    <TodoListJSTransition></TodoListJSTransition>
</template>
<script setup>
// 组件
import TodoList from '../components/TodoList/TodoList-computed.vue';
import TransitionBox from '../components/动画/TransitionBox.vue';
import TodoListTransition from '../components/TodoList/TodoList2-transition.vue';
import TodoListTransitionGroup from '../components/TodoList/TodoList3-transition-group.vue';
import TodoListJSTransition from '../components/TodoList/TodoList4-js-transition.vue';
</script>
<style scoped></style>
