<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 15:32:10
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 11:00:57
 * @Description: 清单组件
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
    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
let title = ref('')
// let todos = ref([{ title: '学习Vue', done: false }]);
let todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))
// 【watchEffect】： 监听
watchEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
})
// 添加任务清单
function addTodo() {
    // debugger
    todos.value.push({
        title: title.value,
        done: false
    })
    title.value = ''
}
// 清空
function clear() {
    todos.value = todos.value.filter(v => {
        return v.done === false
    })
}
// 【computed】：计算属性
let active = computed(() => {
    return todos.value.filter(v => !v.done).length
})
// 所有的任务清单
let all = computed(() => todos.value.length)
let allDone = computed({
    get: function () {
        return active.value === 0
    },
    set: function (value) {
        todos.value.forEach(todo => {
            todo.done = value
        })
    }
})
</script>
<style lang="scss" scoped>
$padding: 10px;
$white: #BCF;
ul {
    width: 500px;
    margin: 0 auto;
    padding: 0;
    li {
        &:hover {
            cursor: pointer;
        }
        list-style-type: none;
        margin-bottom: $padding;
        padding: $padding;
        background: $white;
        box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
    }
}
</style>
