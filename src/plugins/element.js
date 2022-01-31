/*
 * @Author: Archie
 * @Date: 2022-01-31 15:10:16
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-31 21:22:48
 * @FilePath: /vue_shop/src/plugins/element.js
 */
import Vue from 'vue'
import { Button } from 'element-ui'
/* 按需导入需要的组件 */
import { Form, FormItem } from 'element-ui'
import { Input } from 'element-ui'
// 导入弹框提示组件
import { Message } from 'element-ui'

/* 注册为全局可用的组件 */
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
    // 挂载到Vue的原型对象上，每个组件可以通过this直接访问 $message
Vue.prototype.$message = Message