/*
 * @Author: Hongzf
 * @Date: 2022-11-15 17:24:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-11-15 17:55:29
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    // 'standard-with-typescript'
    'airbnb-base',
    '@vue/typescript-eslint/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // parserOptions.parser配置使用typescript语法插件的parser就可以正确识别项目中.vue文件的ts代码
    // 解决interface关键字等识别报错的问题
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // semi: ['warn', 'never']
  }
}
