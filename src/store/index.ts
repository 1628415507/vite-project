/*
 * @Author: Hongzf
 * @Date: 2022-11-15 14:22:07
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-15 14:22:23
 * @Description:
 */
import { createStore } from 'vuex'

const defaultState = {
  count: 0
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count += 1
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})
