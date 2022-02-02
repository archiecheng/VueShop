<!--
 * @Author: Archie
 * @Date: 2022-02-02 17:52:38
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-02 18:35:43
 * @FilePath: /vue_shop/src/components/goods/List.vue
-->
<template>
  <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图区 -->
      <el-card>
          <el-row :gutter="20">
              <el-col :span="8">
                  <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable="">
                    <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                  <el-button type="primary" @click="goAddpage">添加商品</el-button>
              </el-col>
          </el-row>
          <!-- table表格区 -->
          <el-table :data="goodslist" border stripe>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="商品名称" prop="goods_name"></el-table-column>
              <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
              <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
              <el-table-column label="创建时间" prop="add_time" width="140px">
                  <template slot-scope="scope">
                      {{scope.row.add_time | dateFormat}}
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="130px">
                  <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>
          <!-- 分页区 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total" background>
          </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'List',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
        // 查询参数对象
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize:10
        },
        // 商品列表
        goodslist:[],
        // 总数据条数
        total:0
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
      this.getGoodsList()
  },
  // 组件方法
  methods: {
    //   根据分页获取对应的商品列表
     async getGoodsList () {
          const { data:res } = await this.$http.get('goods',{ params: this.queryInfo})
          if (res.meta.status !== 200) {
              return this.$message.error('获取商品列表失败!')
          }
          this.$message.success('获取商品列表成功!')
        //   console.log(res.data)
          this.goodslist = res.data.goods
          this.total = res.data.total
      },
      handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getGoodsList()
      },
      handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getGoodsList()
      },
      async removeById(id){
           const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(error => error)
        if (confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
        }
        const { data:res } = await this.$http.delete(`goods/${id}`)
        if (res.meta.status !== 200) {
            this.$message.error('删除失败!')
        }
        this.$message.success('删除成功!')
        this.getGoodsList()
      },
      goAddpage () {
          this.$router.push('/goods/add')
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
