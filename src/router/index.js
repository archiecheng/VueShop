/*
 * @Author: Archie
 * @Date: 2022-01-31 15:08:25
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-31 22:30:09
 * @FilePath: /vue_shop/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 代表将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //      next() 放行     next('/login')  强制跳转
    if (to.path == '/login') {
        return next();
    } else {
        // 获取 token
        const tokenStr = window.sessionStorage.getItem('token')
        if (!tokenStr) {
            return next('/login')
        } else {
            return next()
        }
    }

})

export default router