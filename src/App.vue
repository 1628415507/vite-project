<!--
 * @Author: Hongzf
 * @Date: 2022-10-10 15:15:41
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-11 18:33:31
 * @Description: 
-->
<template>
    <!-- <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div> -->
    <!-- <HelloWorld msg="Vite + Vue" /> -->
    <Vue3DModel />
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue';
import Vue3DModel from './components/3DModel.vue'
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
