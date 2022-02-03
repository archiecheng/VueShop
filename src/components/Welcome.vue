<!--
 * @Author: Archie
 * @Date: 2022-02-01 00:12:26
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-01 00:12:26
 * @FilePath: /vue_shop/src/components/Welcome.vue
-->
<template>
  <div>
      <h3>Welcome</h3>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'demo',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang='less'>

</style>
