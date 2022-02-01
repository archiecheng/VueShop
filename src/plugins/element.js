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
import { Container } from 'element-ui'
import { Header } from 'element-ui'
import { Aside } from 'element-ui'
import { Main } from 'element-ui'
import { Menu } from 'element-ui'
import { Submenu } from 'element-ui'
import { MenuItem } from 'element-ui'
import { Breadcrumb } from 'element-ui'
import { BreadcrumbItem } from 'element-ui'
import { Card } from 'element-ui'
import { Row } from 'element-ui'
import { Col } from 'element-ui'
import { Table } from 'element-ui'
import { TableColumn } from 'element-ui'
import { Switch } from 'element-ui'
import { Tooltip } from 'element-ui'
import { Pagination } from 'element-ui'
import { Dialog } from 'element-ui'
import { MessageBox } from 'element-ui'
import { Tag } from 'element-ui'
import { Tree } from 'element-ui'
import { Select } from 'element-ui'
import { Option } from 'element-ui'



/* 注册为全局可用的组件 */
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
    // 挂载到Vue的原型对象上，每个组件可以通过this直接访问 $message
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)