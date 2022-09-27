<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 15:32:10
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 15:35:18
 * @Description:  动画-组件动画
-->
<template>
    <div>
        <input type="text" v-model="title" @keydown.enter="addTodo" />
        <button v-if="active < all" @click="clear">清理</button>
        <ul v-if="todos.length">
            <li v-for="(todo, index) in todos" :key="index">
                <input type="checkbox" v-model="todo.done" />
                <span :class="{ done: todo.done }"> {{ todo.title }}</span>
            </li>
        </ul>
        <div v-else>暂无数据</div>
        <div>
            全选<input type="checkbox" v-model="allDone" />
            <span> {{ active }} / {{ all }} </span>
        </div>
        <!-- 弹框提示动画 -->
        <transition name="tip">
            <div class="info-wrapper" v-if="showModal">
                <div class="info">哥，你啥也没输⼊！</div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
let title = ref('');
// let todos = ref([{ title: '学习Vue', done: false }]);
let todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'));
// 【watchEffect】： 监听
watchEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
});
// 添加任务清单
let showModal = ref(false);

function addTodo() {
    // 错误提示
    if (!title.value) {
        showModal.value = true;
        setTimeout(() => {
            showModal.value = false;
        }, 1500);
        return false;
    }
    todos.value.push({
        title: title.value,
        done: false
    });
    title.value = '';
}
// 清空
function clear() {
    todos.value = todos.value.filter(v => {
        return v.done === false;
    });
}
// 【computed】：计算属性
let active = computed(() => {
    return todos.value.filter(v => !v.done).length;
});
// 所有的任务清单
let all = computed(() => todos.value.length);
let allDone = computed({
    get: function () {
        return active.value === 0;
    },
    set: function (value) {
        todos.value.forEach(todo => {
            todo.done = value;
        });
    }
});
</script>

<style>
.info-wrapper {
    position: fixed;
    top: 20px;
    width: 200px;
}
.info {
    padding: 20px;
    color: white;
    background: #d88986;
}
/* 动画 */
.tip-enter-from {
    opacity: 0;
    transform: translateY(-50px);
}
.tip-enter-active {
    transition: all 0.3s ease;
}
.tip-leave-to {
    opacity: 0;
    transform: translateY(-60px);
}
.tip-leave-active {
    transition: all 0.3s ease;
}
</style>
