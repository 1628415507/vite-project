<!--
 * @Author: Hongzf
 * @Date: 2022-10-10 11:09:00
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-10 13:38:23
 * @Description: 
-->
<template>
  <div @click="setName('vue3真棒')" :pos="[10,10,300,300]" fill="#eee">
      <h1 :pos="[20,20,200,100]" fill="red" color="#000">累加器{{count}}</h1>
      <span :pos="pos" fill="black" >哈喽{{name}}</span>
  </div>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  const name = ref('vue3入门')
  const pos = ref([20,120,200,100])
  const count = ref(1)
  const setName = (n)=>{
    name.value = n
    pos.value[1]+=20
    count.value+=2
  }
  </script>