<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-12 11:25:36
 * @Description: 
-->

<template>
    <div class="model-wrap">
        <div class="left-wrap">
            <h3>交互控制</h3>
            <el-row>
                <!-- <el-button plain>朴素按钮</el-button> -->
                <el-button type="primary" plain @click="controlsOpt.enablePan = !controlsOpt.enablePan">
                    能否移动（鼠标右键可以移动模型）({{ controlsOpt.enablePan }})
                </el-button>
                <el-button type="success" plain @click="controlsOpt.enableZoom = !controlsOpt.enableZoom">
                    能否缩放({{ controlsOpt.enableZoom }})
                </el-button>
                <el-button type="warning" plain @click="controlsOpt.enableRotate = !controlsOpt.enableRotate">
                    能否旋转({{ controlsOpt.enableRotate }})
                </el-button>
                <!-- <el-button type="warning" plain>警告按钮</el-button>
                <el-button type="danger" plain>危险按钮</el-button> -->
            </el-row>
            <h3>旋转模型</h3>
            <el-row>
                <el-button type="primary" plain @click="stopRotate"> 停止旋转({{ rafId }}) </el-button>
                <el-button type="success" plain @click="startRotate"> 开始旋转({{ rafId }}) </el-button>
            </el-row>
        </div>
        <div class="right-wrap">
            <model-obj
                class="model-box"
                src="../../static/model/obj/tree.obj"
                :width="600"
                :height="600"
                :backgroundAlpha="bgAlpha"
                :backgroundColor="bgColor"
                :controlsOptions="controlsOpt"
                :rotation="rotation"
                @load="onLoad"
            ></model-obj>
        </div>
    </div>
</template>
<script setup>
import { ModelObj } from './vue-3d-model';
import { reactive, ref } from 'vue';

const bgColor = ref('#bfc'); // 背景颜色
const bgAlpha = ref(0.3); // 背景颜色透明度
// 【交互控制】
const controlsOpt = reactive({
    enablePan: true, //能否移动（鼠标右键可以移动模型）
    enableZoom: true, //能否缩放
    enableRotate: true //能否旋转
});
// 【旋转模型】
const rotation = reactive({
    x: 0, //x轴的起始位置//-Math.PI / 2,
    y: 0, //y轴的起始位置
    z: 0 //z轴的起始位置
});
const rafId = ref('');
// 旋转
function rotate() {
    rafId.value = requestAnimationFrame(rotate); //循环调用rotate()
    rotation.y -= 0.01; //控制旋转的速度,沿着（y轴）旋转
}
// 自动旋转
function onLoad() {
    rotate();
}
// 开始旋转
function startRotate() {
    cancelAnimationFrame(rafId.value); //先停止之前的动画，避免重复启动
    rotate();
}
// 停止旋转
function stopRotate() {
    cancelAnimationFrame(rafId.value);
}
</script>
<style lang="scss" scoped>
.model-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .left-wrap {
        width: 30%;
    }
    .right-wrap {
        width: 70%;
    }
}
</style>
