/*
 * @Author: Hongzf
 * @Date: 2022-09-29 11:11:16
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 14:47:54
 * @Description: 
 */
import { MockMethod } from 'vite-plugin-mock'
import { sign, verify } from 'jsonwebtoken'
const secret = 'secret'
export default [
{
  url: '/geek-admin/user/login',
 type: 'post',
 response: config => { 
  const { username } = config.body
   const token = tokens[username] // mock error
    if (user!=='dasheng') { 
      return { 
        code: 60204, 
        message: 'Account and password are incorrect.' 
      } }
      return { code: 20000, data: token } } }
] 
