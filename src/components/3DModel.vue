<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-11 18:34:28
 * @Description: 
-->

<template>
    <div>
        <model-obj
            class="model-box"
            src="../../static/model/obj/tree.obj"
            :width="600"
            :height="600"
            :backgroundAlpha="bgAlpha"
            :backgroundColor="bgColor"
        ></model-obj>
    </div>
</template>
<script setup>
import { ModelObj } from './vue-3d-model';
import { ref } from 'vue';

const bgColor = ref('#bfc'); // 背景颜色
const bgAlpha = ref(0.3); // 背景颜色透明度
</script>
