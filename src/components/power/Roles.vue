<!--
 * @Author: Archie
 * @Date: 2022-02-01 18:37:06
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-02 10:58:53
 * @FilePath: /vue_shop/src/components/power/Roles.vue
-->
<template>
  <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
          <!-- 添加角色按钮区域 -->
          <el-row>
              <el-col>
                  <el-button type="primary">添加角色</el-button>
              </el-col>
          </el-row>

          <!-- 角色列表区域 -->
          <el-table :data="rolelist" border stripe>
              <!-- 展开列 -->
              <el-table-column type="expand">
                  <template slot-scope="scope">
                      <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1 === 0 ? 'bdtop':'','vcenter']">
                          <!-- 渲染一级权限 -->
                          <el-col :span="5">
                              <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                              <i class="el-icon-caret-right"></i>
                          </el-col>
                          <!-- 渲染二级和三级权限 -->
                          <el-col :span="19">
                              <!-- 通过 for 循环 嵌套渲染二级权限 -->
                              <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2 === 0 ? '':'bdtop','vcenter']">
                                  <el-col :span="6">
                                      <el-tag type="success" closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                      <i class="el-icon-caret-right"></i>
                                  </el-col>
                                  <el-col :span="18">
                                       <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                                  </el-col>
                              </el-row>
                          </el-col>
                      </el-row>
                      <!-- <pre>{{scope.row}}</pre> -->
                  </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index"></el-table-column>
              <el-table-column label="角色名称" prop="roleName"></el-table-column>
              <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
              <el-table-column label="操作" width="300px">
                  <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                      <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>

      <!-- 分配权限的对话框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
        @close="setRightDialogClosed"
        >
        <!-- 树形控件 -->
        <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Roles',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点的id值数组
      defKeys: [],
      // 当前即将分配权限的角色ID
      roleId: ''
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
    this.getRolesList()
  },
  // 组件方法
  methods: {
    //   获取所有角色的列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败!')
      } else {
        this.rolelist = res.data
      }
    },
    //   根据 id 删除对应的权限
    async removeRightById (role, rightId) {
      //   弹框提示用户是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      } else {
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除权限失败!')
        } else {
          role.children = res.data
          // this.getRolesList()
        }
      }
    },
    //   展示分配权限的对话框
    async showSetRightDialog (role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败')
      }

      //  把获取到的权限数据保存到 data 中
      this.rightslist = res.data

      //  递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)

      this.setRightDialogVisible = true
    },
    // 通过递归的形式获取角色下所有三级权限的id，并保存到数组中
    getLeafKeys (node, arr) {
      if (!node.children) {
        // 如果当前 node 节点不包含 children 属性，则是三级节点
        return arr.push(node.id)
      }
      node.children.forEach(item =>
        this.getLeafKeys(item, arr)
      )
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed () {
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights () {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.getRolesList()
      this.setRightDialogVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang='less'>
.el-tag {
    margin: 7px;
}
.bdtop {
    border-top: 1px solid #eee;
}
.bdbottom {
    border-bottom: 1px solid #eee;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>
