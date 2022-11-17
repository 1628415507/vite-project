<!--
 * @Author: Hongzf
 * @Date: 2022-11-15 13:35:38
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-16 11:17:21
 * @Description:
-->

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <!-- <canvas id="map"></canvas> -->
  <!-- <img :src="downImg" width="100%" /> -->
  <div id="capture" style="padding: 10px; background: #f5da55">
    <h4 style="color: #000; ">Hello world!</h4>
</div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
// import {pagemap} from '@/utils/pagemap.js'
import { ref, onMounted, onUnmounted, watch } from "vue";
import html2canvas from "html2canvas";

html2canvas(document.querySelector("#capture"), {
          backgroundColor: null
        }).then(canvas => {
  console.log('【 canvas 】-32', canvas)
    document.body.appendChild(canvas)
});
var downImg = ref('')
// pagemap(document.querySelector('#map'), {
//     viewport: null,
//     styles: {
//         'header,footer,section,article': rgba(0,0,0,0.08),
//         'h1,a': rgba(0,0,0,0.10),
//         'h2,h3,h4': rgba(0,0,0,0.08)
//     },
//     back: rgba(0,0,0,0.02),
//     view: rgba(0,0,0,0.05),
//     drag: rgba(0,0,0,0.10),
//     interval: null
// });

</script>

<style lang="scss" scoped>
#map {
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    z-index: 100;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
