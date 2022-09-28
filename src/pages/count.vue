<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 14:59:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 10:02:11
 * @Description: 
-->
<template>
    <hr />
    <h2>计数器(ref)</h2>
    <CountRef />
    <hr />
    <h2>计数器(store)</h2>
    <CountStore />
</template>
<script setup>
// 组件
import CountRef from '../components/Count/Count-ref.vue';
import CountStore from '../components/Count/Count-store.vue';
</script>
