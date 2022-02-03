/*
 * @Author: Archie
 * @Date: 2022-01-31 15:08:25
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-31 20:41:22
 * @FilePath: /vue_shop/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
