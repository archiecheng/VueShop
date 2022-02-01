<!--
 * @Author: Archie
 * @Date: 2022-02-01 16:17:24
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-01 17:12:40
 * @FilePath: /vue_shop/src/components/power/Rights.vue
-->
<template>
  <div>
     <!-- 面包屑导航区 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
          <el-table :data="rightsList" border stripe>
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="权限名称" prop="authName"></el-table-column>
              <el-table-column label="路径" prop="path"></el-table-column>
              <el-table-column label="权限名称" prop="level">
                  <template slot-scope="scope">
                      <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                      <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                      <el-tag type="warning" v-else>三级</el-tag>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Rights',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
        // 所有的权限列表
        rightsList:[]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
    //   获取所有权限
      this.getRightsList()
  },
  // 组件方法
  methods: {
      async getRightsList () {
          const { data:res } = await this.$http.get(`rights/list`)
          if (res.meta.status !== 200) {
              return this.$message.error('获取用户权限失败!')
          } else {
              this.rightsList = res.data
              console.log(this.rightsList)
          }
      }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang='less'>

</style>
