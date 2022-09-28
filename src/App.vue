<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 15:32:19
 * @Description: 
-->
<template>
    <div class="page-wrap">
        <div class="left-wrap">
            <!-- router-link负责跳转不同的⻚⾯，相 当于Vue世界中的超链接a标签 -->
            <router-link to="/">评分</router-link>
            <hr />
            <router-link to="/transition">任务清单</router-link>
            <hr />
            <router-link to="/store">Store/Vuex</router-link>
            <hr />
            <router-link to="/about">关于</router-link>
        </div>
        <!-- router-view负责渲染路由匹配的组件，
    我们可以通过把router-view放在不 同的地⽅，实现复杂项⽬的⻚⾯布局 -->
        <div class="content-wrap">
            <router-view></router-view>
            <!-- <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view> -->
        </div>
    </div>
</template>
<style scoped>
.page-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.left-wrap {
    width: 20%;
    min-height: 500px;
    min-width: 200px;
}
.content-wrap {
    width: 80%;
    min-width: 1000px;
    min-height: 500px;
    max-height: 500px;
}
</style>
