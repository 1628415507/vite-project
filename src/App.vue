<template>
    <div>
        <!-- router-link负责跳转不同的⻚⾯，相 当于Vue世界中的超链接a标签 -->
        <router-link to="/">⾸⻚</router-link> | <router-link to="/about">关于</router-link>
    </div>
    <!-- router-view负责渲染路由匹配的组件，
    我们可以通过把router-view放在不 同的地⽅，实现复杂项⽬的⻚⾯布局 -->
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view> -->
</template>
