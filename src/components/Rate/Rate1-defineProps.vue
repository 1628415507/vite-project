<!--
 * @Author: Hongzf
 * @Date: 2022-09-27 09:41:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 10:28:58
 * @Description: 评分组件
-->
<template>
    <div :style="fontstyle">{{ rate }}</div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
// 【defineProps】：定义传入的值和类型
let props = defineProps({
    value: Number,
    theme: {
        type: String,
        default: 'orange'
    }
});
// 设置评分
let rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value));
// 设置主题颜色
const fontstyle = computed(() => {
    const themeObj = {
        black: '#000',
        white: '#fff',
        red: '#f5222d',
        orange: '#fa541c',
        yellow: '#fadb14',
        green: '#73d13d',
        blue: '#40a9ff'
    };
    return `color:${themeObj[props.theme]};`;
});
</script>
