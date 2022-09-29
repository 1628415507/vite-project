<!--
 * @Author: Hongzf
 * @Date: 2022-09-26 09:24:43
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 13:39:13
 * @Description: 
-->
<template>
    <el-container>
        <el-header>
            <el-menu
                :default-active="1"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="1">处理中⼼</el-menu-item>
                <el-submenu index="2">
                    <template v-slot:title>我的⼯作台</template> <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item> <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template v-slot:title>选项4</template> <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item> <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中⼼</el-menu-item>
                <el-menu-item index="4"><a href="https://element3-ui.com" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- router-link负责跳转不同的⻚⾯，相 当于Vue世界中的超链接a标签 -->
                <div><router-link to="/">评分</router-link></div>
                <div><router-link to="/login">登录</router-link></div>
                <div><router-link to="/transition">任务清单</router-link></div>
                <div><router-link to="/store">Store/Vuex</router-link></div>
                <div><router-link to="/about">关于</router-link></div>
            </el-aside>
            <el-container>
                <el-main>
                    <!-- router-view负责渲染路由匹配的组件，我们可以通过把router-view放在不 同的地⽅，实现复杂项⽬的⻚⾯布局 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<style scoped>
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
}
.el-aside {
    background-color: #d3dce6;
    color: #333;
}
.el-main {
    width: 100%;
    min-height: 500px;
    min-width: 1000px;
    background-color: #e9eef3;
    color: #333;
}
body > .el-container {
    margin-bottom: 40px;
}
</style>
