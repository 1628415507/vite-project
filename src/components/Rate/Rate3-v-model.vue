<!--
 * @Author: Hongzf
 * @Date: 2022-09-27 09:41:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-27 13:43:43
 * @Description: 评分组件
-->
<template>
    <div :style="fontstyle">
        <!-- 插槽 -->
        <slot></slot>
        <div class="rate-wrap" @mouseout="mouseOut">
            <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)">☆</span>
            <span class="hollow" :style="fontWidth">
                <span v-for="num in 5" :key="num" @mouseover="mouseOver(num)" @click="onRate(num)">★</span>
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
// 【defineProps】：定义传入的值和类型
let props = defineProps({
    modelValue: Number,
    theme: {
        type: String,
        default: 'orange'
    }
});

// 设置主题颜色
const fontstyle = computed(() => {
    const themeObj = {
        black: '#000',
        pink: 'pink',
        red: '#f5222d',
        orange: '#fa541c',
        yellow: '#fadb14',
        green: '#73d13d',
        blue: '#40a9ff'
    };
    return `color:${themeObj[props.theme]};`;
});

// 评分
const width = ref(props.modelValue);
// 鼠标移入
function mouseOver(i) {
    width.value = i;
}
let emits = defineEmits(['update:modelValue']);
function onRate(num) {
    emits('update:modelValue', num);
}
// 鼠标移出
function mouseOut() {
    width.value = props.modelValue;
}
const fontWidth = computed(() => `width:${width.value}em;`);
// 点击评分
</script>
<style scoped>
.rate-wrap {
    position: relative;
    display: inline-block;
}
.rate-wrap > span.hollow {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
}
</style>
