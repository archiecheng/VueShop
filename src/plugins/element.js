/*
 * @Author: Archie
 * @Date: 2022-01-31 15:10:16
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-31 21:22:48
 * @FilePath: /vue_shop/src/plugins/element.js
 */
import Vue from 'vue'
import { Button, Input, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag, Tree, Select, Option, Cascader, Alert, Tabs, TabPane, Steps, Step, Checkbox, CheckboxGroup, Upload, Form, FormItem, Message } from 'element-ui'

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
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
