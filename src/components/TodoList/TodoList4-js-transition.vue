<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 15:32:10
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 11:01:05
 * @Description: 动画-JavaScript动画
-->
<template>
    <div>
        <input type="text" v-model="title" @keydown.enter="addTodo" />
        <button v-if="active < all" @click="clear">清理</button>
        <ul v-if="todos.length">
            <!-- 列表过渡 -->
            <transition-group name="flip-list" tag="ul">
                <li v-for="(todo, index) in todos" :key="index">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }"> {{ todo.title }}</span>
                    <!-- 删除按钮 -->
                    <span class="remove-btn" @click="removeTodo($event, i)"> ❌ </span>
                </li>
            </transition-group>
        </ul>
        <div v-else>暂无数据</div>
        <div>
            全选<input type="checkbox" v-model="allDone" />
            <span> {{ active }} / {{ all }} </span>
        </div>
        <!-- 单个组件过渡：弹框提示 -->
        <transition name="tip">
            <div class="info-wrapper" v-if="showModal">
                <div class="info">哥，你啥也没输⼊！</div>
            </div>
        </transition>
        <span class="dustbin"> ☆ </span>
        <div class="animate-wrap">
            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="animate" v-show="animate.show">☆</div>
            </transition>
            <!---->
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue'
let title = ref('')
// let todos = ref([{ title: '学习Vue', done: false }]);
let todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))
// 【watchEffect】： 监听
watchEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
})
// 添加任务清单
let showModal = ref(false)

function addTodo() {
    // 错误提示
    if (!title.value) {
        showModal.value = true
        setTimeout(() => {
            showModal.value = false
        }, 1500)
        return false
    }
    todos.value.push({
        title: title.value,
        done: false
    })
    title.value = ''
}
// 清空
function clear() {
    todos.value = []
    // todos.value.filter(v => {
    //     return v.done === false;
    // });
}
// 【computed】：计算属性
let active = computed(() => {
    return todos.value.filter(v => v.done).length
})
// 所有的任务清单
let all = computed(() => todos.value.length)
let allDone = computed({
    get: function () {
        return active.value === todos.value.length
    },
    set: function (value) {
        todos.value.forEach(todo => {
            todo.done = value
        })
    }
})
// ==== ⾸先定义animate响应式对象来控制动画元素的显⽰和隐藏
let animate = reactive({
    show: false,
    el: null
})
//
function beforeEnter(el) {
    let dom = animate.el
    let rect = dom.getBoundingClientRect() //getBoundingClientRect函数获取⿏标的点击位置，
    console.log('【 rect 】-102', rect)
    let x = window.innerWidth - rect.left - 60
    let y = rect.top - 10
    el.style.transform = `translate(-${x}px, ${y}px)`
}
// 把动画元素移动到初始位置
function enter(el, done) {
    document.body.offsetHeight//作用：⼿动触发⼀次重绘，开始动画
    el.style.transform = `translate(0,0)`
    el.addEventListener('transitionend', done)
}
// 把动画元素再隐藏起来
function afterEnter(el) {
    animate.show = false
    el.style.display = 'none'
}
// 删除列表数据
function removeTodo(e, i) {
    animate.el = e.target
    animate.show = true
    todos.value.splice(i, 1)
}
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
/* 列表过渡 */
.flip-list-move {
    transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
    transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
/* 提示弹框动画 */
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
/* 垃圾桶的效果 */
.animate-wrap .animate {
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 100;
    transition: all 0.5s linear;
}
</style>
