/*
 * @Author: Archie
 * @Date: 2022-01-31 15:08:25
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-31 21:07:11
 * @FilePath: /vue_shop/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
/* 导入字体图标 */
import './assets/fonts/iconfont.css'
/* 导入 axios */
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 最后必须return config
    return config
})
Vue.prototype.$http = axios



Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')