<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-12 16:03:07
 * @Description: vue-3d-model
-->

<template>
    <div class="model-wrap">
        <div class="left-wrap">
            <hr />
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
            <hr />
            <h3>旋转模型</h3>
            <el-row>
                <el-button type="success" plain @click="startRotate"> 开始旋转({{ rafId }}) </el-button>
                <el-button type="success" plain @click="stopRotate"> 停止旋转({{ rafId }}) </el-button>
                <el-button type="primary" plain @click="rotateOfAxis('x')"> 围绕x轴旋转</el-button>
                <el-button type="primary" plain @click="rotateOfAxis('y')"> 围绕y轴旋转</el-button>
                <el-button type="primary" plain @click="rotateOfAxis('z')"> 围绕z轴旋转</el-button>
                <el-button type="warning" plain @click="reset"> 重置</el-button>
            </el-row>
            <hr />
            <h3>快照图片</h3>
            <el-row>
                <el-button type="primary" plain @click="getPicture">获取快照</el-button>
                <div v-if="imgSrc">
                    <el-image style="width: 200px; height: 200px; background-color: #bfc !important" :src="imgSrc" fit="contain"></el-image>
                </div>
            </el-row>
            <hr />
            <h3>事件</h3>
            <el-row> mousemove: 鼠标与模型交接变紫色 </el-row>
        </div>
        <!-- 一个模型要包一个容器标签 -->
        <div class="right-wrap">
            <model-obj
                ref="modelRef"
                class="model-box"
                src="../../static/model/obj/tree.obj"
                :width="600"
                :height="600"
                :backgroundAlpha="bgAlpha"
                :backgroundColor="bgColor"
                :controlsOptions="controlsOpt"
                :rotation="rotation"
                @load="onLoad"
                :gl-options="{ preserveDrawingBuffer: true }"
                @mousemove="onMouseMove"
            ></model-obj>
        </div>
        <!-- 一个模型要包一个容器标签 -->
        <div>
            <model-collada
                class="model-box"
                src="../../static/model/collada/elf/elf.dae"
                :width="600"
                :height="600"
                :rotation="{
                    x: -Math.PI / 2,
                    y: 0,
                    z: 0
                }"
                :backgroundAlpha="bgAlpha"
                :backgroundColor="bgColor"
                :controlsOptions="controlsOpt"
            ></model-collada>
        </div>
    </div>
</template>
<script setup>
import { ModelCollada, ModelObj } from './vue-3d-model';
import { reactive, ref } from 'vue';

const bgColor = ref('#bfc'); // 背景颜色
const bgAlpha = ref(0.3); // 背景颜色透明度

// ============【交互控制】============
const controlsOpt = reactive({
    enablePan: true, //能否移动（鼠标右键可以移动模型）
    enableZoom: true, //能否缩放
    enableRotate: true //能否旋转
});
// ============【旋转模型】============
const rotation = reactive({
    x: 0, //x轴的起始位置//-Math.PI / 2,
    y: 0, //y轴的起始位置
    z: 0 //z轴的起始位置
});
const rafId = ref('');
const axis = ref('y'); //坐标轴
// 旋转
function rotate() {
    rafId.value = requestAnimationFrame(rotate); //循环调用rotate()
    rotation[axis.value] -= 0.01; //控制旋转的速度,沿着（y轴）旋转
}
// 自动旋转
function onLoad() {
    rotate();
}
// 开始自动旋转
function startRotate() {
    cancelAnimationFrame(rafId.value); //先停止之前的动画，避免重复启动
    rotate();
}
// 停止旋转
function stopRotate() {
    cancelAnimationFrame(rafId.value);
}
// 围绕某个轴旋转
function rotateOfAxis(val) {
    axis.value = val;
    cancelAnimationFrame(rafId.value); //先停止之前的动画，避免重复启动
    rotate();
}

// 重置
function reset() {
    // cancelAnimationFrame(rafId.value); //先停止之前的动画，避免重复启动
    rotation.x = 0;
    rotation.y = 0;
    rotation.z = 0;
}
// ============【快照图片】============
const imgSrc = ref('');
const modelRef = ref(null);

function getPicture() {
    imgSrc.value = modelRef.value.renderer.domElement.toDataURL('image/png', 1);
    // console.log('【 imgSrc.value 】-94', imgSrc.value);
}

// ============【事件】============
let object = null;
function onMouseMove(event, intersected) {
    console.log('【 intersected 】-130', intersected);
    // 鼠标在容器上移动，intersected为null
    // 鼠标在模型上移动，intersected为模型对象
    if (intersected) {
        console.log('鼠标在模型上移动，intersected为模型对象');
        object = intersected.object;
        object.material.color.setStyle('#bcf');
        // return;
    } else {
        if (object) {
            console.log('【 鼠标在容器上移动，intersected为null 】-141');
            object.material.color.setStyle('#bfc');
        }
    }
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
