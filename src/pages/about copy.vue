<!--
 * @Author: Hongzf
 * @Date: 2022-09-28 15:05:02
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-16 16:29:46
 * @Description:
-->
<template>
    <div class="page-wrap">
        <div ref="imageWrapper" class="page-content">
            <Heading :level="3">hello geekbang</Heading>
            <el-button class="screenshotBtn button" type="text" @click="clickGeneratePicture('66666')">一键截图</el-button>
            <div id="capture" style="padding: 10px; background: #f5da55">
                <h4 style="color: #000">Hello world!</h4>
            </div>
            <div id="capture2" style="padding: 10px; background: #bfc">
                <h4 style="color: #000">Hello world!</h4>
            </div>
        </div>
    </div>
    <!-- <div></div> -->
    <img :src="downImg" width="100%" class="img" />
    <canvas id="canvasId" width="300" height="300" style="border: 1px solid #000"></canvas>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Heading from '../components/JSX/Heading.jsx';
import html2canvas from 'html2canvas';
console.log('【 document.querySelector("#capture") 】-18', document.querySelector('#capture'));
const downImg = ref('');
// const canvasId = ref('');
const canvasId = document.getElementById('canvasId');
const ctx = canvasId.getContext('2d');

// html2canvas(document.querySelector('#capture'), {
//     backgroundColor: null
// }).then(canvas => {
//     console.log('【 canvas 】-32', canvas);
//     document.body.appendChild(canvas);
// });
//  :any
const imageWrapper = ref(null);
onMounted(() => {
    clickGeneratePicture('888');
    //   const board = boardDom?.value?.boardDom;
    //   const { offsetTop, offsetLeft } = board;
    //   cardOffset.value.x = offsetLeft;
    //   cardOffset.value.y = offsetTop;
    //   board.addEventListener("mousedown", handleMouseDown, false);
    //   board.addEventListener("mouseup", handleMouseUp, false);
});
function clickGeneratePicture(id) {
    html2canvas(imageWrapper.value, {
        onrendered: function (canvas) {
            imageWrapper.body.appendChild(canvas);
        },
        logging: true, //在console.log()中输出信息
        allowTaint: true,
        // width: 300,
        // height: 300,
        // scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
        scale: window.devicePixelRatio,
        scrollY: 0,
        scrollX: 0,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(res => {
        console.log(res);
        const canvas = res;
        // canvas.width = 300;
        console.log('【 canvas 】-61', canvas);
        let imgUrl = canvas.toDataURL('image/png');
        downImg.value = imgUrl;
        console.log('【 imgUrl 】-48', imgUrl);
        // imageWrapper.appendChild(canvas);

        canvas.width = h2c.width / 5;
        canvas.height = h2c.height;
        ctx.drawImage(h2c, 0, 0, h2c.width, h2c.height);
        // var tempLink = document.createElement('a'); // 创建一个a标签
        // tempLink.style.display = 'none';
        // tempLink.href = imgUrl;
        // tempLink.setAttribute('download', id); // 给a标签添加下载属性
        // if (typeof tempLink.download === 'undefined') {
        //     tempLink.setAttribute('target', '_blank');
        // }
        document.body.appendChild(canvas); // 将a标签添加到body当中
        // tempLink.click(); // 启动下载
        // document.body.removeChild(tempLink); // 下载完毕删除a标签
        // window.URL.revokeObjectURL(imgUrl);
    });
}
console.log('【 路由懒加载 】-14');
</script>
<style lang="scss" scoped>
.page-wrap {
    position: relative;
}
.page-content {
    height: 800px;
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
</style>
