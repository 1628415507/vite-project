/*
 * @Author: Hongzf
 * @Date: 2022-09-28 18:21:58
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-29 14:59:49
 * @Description:
 */
import { useStorage } from './storage'

export function getToken() {
    return useStorage('token').value // TODO
}
