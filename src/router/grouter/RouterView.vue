<!--
 * @Author: Hongzf
 * @Date: 2022-09-28 11:08:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 13:37:09
 * @Description: 
-->
<template>
    <!-- 动态组件 -->
    <component :is="component"></component>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from '../grouter/index';

let router = useRouter();
// console.log('【 router 】-17', router);
// 从router.routes中查找与当前路径匹配的页面组件进行渲染
// 使用computed来获取页面组件，当路由变化时，computed也会匹配到不同的页面组件
const component = computed(() => {
    const route = router.routes.find(
        route => route.path === router.current.value // 查找与当前路径匹配的页面组件进行渲染

    );
    return route ? route.component : null;
});
</script>
