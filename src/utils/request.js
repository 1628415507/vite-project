/*
 * @Author: Hongzf
 * @Date: 2022-09-28 18:19:52
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 09:26:42
 * @Description: 
 */
import axios from 'axios'
// import { useMsgbox, Message } from 'element3'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '',//process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
})
// 对所有的http请求进⾏统⼀拦截，确保在请求发出之前，从本地存储中获取token，
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)
// 后端数据如果出错的话，接⼝还要进⾏统⼀拦截，
// ⽐如接⼝返回的错误是登录状态过期，那么就需要提⽰⽤⼾跳转到登录⻚⾯重新登录。
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      console.log('接口信息报错',res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('接口信息报错' + error) 
    return Promise.reject(error)
  },
)

export default service
