<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 14:59:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 11:00:32
 * @Description: 
-->
<template>
    <h2>这是评分</h2>
    <hr />
    <h3>评分(父传子)</h3>
    <Rate :value="score1" theme="green" />
    <!-- emit方法 -->
    <hr />
    <h3>评分(子传父)</h3>
    <Rate2 :value="score2" @update-rate="updateRate" />
    <!-- 插槽 -->
    <hr />
    <h3>评分(插槽)</h3>
    <Rate3 v-model="score3" theme="pink">插槽</Rate3>
</template>
<script setup>

// 组件化
import Rate from '../components/Rate/Rate1-defineProps.vue'
import Rate2 from '../components/Rate/Rate2-event.vue'
import Rate3 from '../components/Rate/Rate3-v-model.vue'

// 方法
import { ref } from 'vue'
import { useMouse } from '../utils/mouse'
//
let { x, y } = useMouse()
// console.log('【 x,y 】-16', x.value, y.value);
// 评分
let score1 = ref(3)
let score2 = ref(3)
function updateRate(num) {
    score2.value = num
}
let score3 = ref(2)
</script>
