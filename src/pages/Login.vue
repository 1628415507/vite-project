<!--
 * @Author: Hongzf
 * @Date: 2022-09-29 11:01:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 17:49:59
 * @Description: 
-->
<template>
    <el-form ref="formRef" :model="formData" label-width="auto" :rules="formRules">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" size="small"  />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password"  v-focus type="password" size="small" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleLogin" :loading="loading"> 登录 </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'
// import {login} from '../api/apis'
import { Message } from 'element3'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const formRules = reactive({
    name: [{ required: true, trigger: 'blur', message: '请输入登录名' }],
    password: [{ required: true, trigger: 'blur', message: '请输入用户密码' }]
})

// console.log('【 formRules 】-29', formRules)

// export default {

const formData = reactive({
    name: '',
    password: ''
})
const loading = ref(false)
function handleLogin() {
    console.log('【 formData 】-40', formData)
    const formRef = ref()
    console.log('【 formRef 】-46', formRef)
    // formRef.value.validate(async valid => {//TODO:无法调用验证方法
    // console.log('【 valid 】-44', valid)
    // if (valid) {
    //     loading.value = true
    //     const { code, message } = await useStore.login(loginForm)
    //     loading.value = false
    //     if (code === 0) {
    const router = useRouter() //TODO?
    console.log('【 router 】-54', router)
    router.replace('/') //toPath
    //         // router.replace(toPath || '/')
    //     } else {
    //       Message({ message: '登录失败', type: 'error' })
    //     }
    // } else {
    //   Message({ message: '登录失败', type: 'error' })
    // }
    // })
    // try{
    //   // const res = await login(data.form)
    //   // console.log(res)
    //   // router.replace('/')
    // }catch(error){
    //   // Message({
    //   //   type: 'warning',
    //   //   message: error
    //   // })
    // }finally{
    //   loading.value = false
    // }
}

// return {
//   ...toRefs(data),
//   loading,
//   formRef,
//   onSubmit
// }
// }
// }
</script>
