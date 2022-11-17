<!--
 * @Author: Hongzf
 * @Date: 2022-09-28 15:05:02
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-17 15:23:13
 * @Description:
-->
<template>
    <div id="pageWrap" class="page-wrap">
        <div id="imageWrapper" ref="imageWrapper" class="page-content">
            <Heading :level="3">hello geekbang</Heading>
            <el-button class="screenshotBtn button" type="text" @click="clickGeneratePicture('66666')">一键截图</el-button>
            <div id="capture" style="padding: 10px; background: #f5da55">
                <h4 style="color: #000">Hello world!</h4>
            </div>
            <div id="capture2" style="padding: 10px; background: #bfc">
                <h4 style="color: #000">Hello world!</h4>
            </div>
            <div id="capture2" style="padding: 10px; background: #bfc">
                <h4 style="color: #000">Hello world!</h4>
            </div>
        </div>
    </div>
    <button @click="handleScroll">666</button>
    <!-- <img :src="downImg" width="100%" class="img" /> -->
    <div id="canvasWrap" class="canvas-wrap">
        <div class="canvas-box">
            <canvas id="canvasId" class="canvas" width="10" height="100"></canvas>
            <div id="viewPortId" class="canvas-mask"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Heading from '../components/JSX/Heading.jsx'
import html2canvas from 'html2canvas'
import { pageMap } from './pagemap.js'
console.log('【 document.querySelector("#capture") 】-18', document.querySelector('#capture'))
const downImg = ref('')
// const canvasId = ref(null);

const imageWrapper = ref(null)
onMounted(() => {
    clickGeneratePicture('888')
})
let x = 0
function handleScroll() {
    x = x + 100
    document.getElementById('pageWrap').scrollLeft = x
}
let cW = ref('')
let cH = ref('')
function clickGeneratePicture() {
    html2canvas(imageWrapper.value, {
        // onrendered: function (canvas) {
        //     imageWrapper.body.appendChild(canvas);
        // },
        logging: true, //在console.log()中输出信息
        allowTaint: true,
        // width: 300,
        // height: 300,
        scale: window.devicePixelRatio, // window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        scrollY: 0,
        scrollX: 0,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(res => {
        // 1.获取当前页面的canvas截图
        const h2Canvas = res
        // console.log('【 h2Canvas 】-61', h2Canvas);
        // let imgUrl = h2Canvas.toDataURL('image/png');
        // 2.生成 当前页面的canvas截图的缩略图
        const canvasDom = document.getElementById('canvasId')
        cW.value = h2Canvas.width * 0.2
        cH.value = h2Canvas.height * 0.2
        canvasDom.width = cW.value
        canvasDom.height = cH.value
        const canvasView = canvasDom.getContext('2d')
        canvasView.drawImage(h2Canvas, 0, 0, cW.value, cH.value)
        // 3.设置canvasWrap 的dom元素大小
        let canvasWrap = document.getElementById('canvasWrap')
        canvasWrap.style.width = cW.value + 'px'
        canvasWrap.style.height = cH.value + 'px'
        console.log('【 canvasWrap 】-84',  canvasWrap.offsetWidth)
        // 4.绑定页面滚动事件
        pageMap(canvasDom, {
            // viewport必须有overflow: auto属性才有效果
            viewport: document.getElementById('pageWrap'),//
            canvasViewPortId: 'viewPortId'
        })
    })
}
console.log('【 路由懒加载 】-14')
</script>
<style lang="scss" scoped>
.page-wrap {
    // position: relative;
    // text-align: right;
    // width: 1280px;
    height: 600px;
    overflow: auto;
}
.page-content {
    height: 800px;
    min-width: 2000px;
    background: #bcf;
}
.img {
    background: #fff;

    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    z-index: 100;
}
.canvas-wrap {
    position: fixed;
    bottom: 50px;
    right: 10px;
    background: rgba(0, 0, 0, 0.05);
    z-index: 100000;

    .canvas-box {
        position: relative;
        .canvas-mask {
            position: absolute;
            top: 0;
            background: rgba(0, 0, 0, 0.1);
            // z-index: 100000;
            // background-color: yellow;
            // opacity: 0.5;
        }
    }

    .canvas {
        // position: fixed;
        // bottom: 50px;
        // right: 0;
        // z-index: 100;

        // width: 200px;
        // height: 200px;
        border: 1px solid #000;
        background: #fff;
        // canvas.style.cursor = "crosshair";
        // cursor: crosshair;
    }
}
</style>
