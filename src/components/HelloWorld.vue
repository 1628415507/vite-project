<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-11 15:31:52
 * @Description: 
-->
<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  
<template>
  <div>
    456465456
    <!-- <model-obj
      class="model-box"
      :backgroundAlpha="bgAlpha"
      :backgroundColor="bgColor"
      src="public/static/model/obj/tree.obj"
    ></model-obj> -->
  </div>
</template>
<script setup>

import { ModelObj  } from 'vue-3d-model';
// console.log('【 ModelObj 】-13', ModelObj)

// const bgAlpha = ref(0.5);
// const bgColor = ref('#ff0');
// console.log('【 ModelCollada 】-14', ModelCollada)
</script>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
