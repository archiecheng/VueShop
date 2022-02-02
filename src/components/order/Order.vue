<!--
 * @Author: Archie
 * @Date: 2022-02-02 22:41:11
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-03 00:03:46
 * @FilePath: /vue_shop/src/components/order/order.vue
-->
<template>
  <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区 -->
      <el-card>
          <el-row>
              <el-col :span="8">
                  <el-input placeholder="请输入内容">
                      <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
              </el-col>
          </el-row>
          <!-- 订单列表数据 -->
          <el-table :data="orderlist" border stripe>
              <el-table-column type="index"></el-table-column>
              <el-table-column label="订单编号" prop="order_number"></el-table-column>
              <el-table-column label="订单价格" prop="order_price"></el-table-column>
              <el-table-column label="是否付款" prop="pay_status">
                  <template slot-scope="scope">
                      <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
                      <el-tag type="danger" v-else>未付款</el-tag>
                  </template>
              </el-table-column>
              <el-table-column label="是否发货" prop="is_send"></el-table-column>
              <el-table-column label="下单时间" prop="create_time">
                  <template slot-scope="scope">
                      {{scope.row.create_time | dateFormat}}
                  </template>
              </el-table-column>
              <el-table-column label="操作">
                  <template>
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
                      <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
                  </template>
              </el-table-column>

          </el-table>
          <!-- 分页区 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
      </el-card>

      <!-- 修改地址的对话框 -->
      <el-dialog
        title="修改地址"
        :visible.sync="addressVisible"
        width="50%"
        @close="addressDialogClosed"
        >
        <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
            <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addressVisible = false">取 消</el-button>
            <el-button type="primary" @click="addressVisible = false">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 展示物流进度的对话框 -->
        <el-dialog
        title="物流进度"
        :visible.sync="progressVisible"
        width="50%"
        >
        <!-- 时间线 -->
        <el-timeline>
            <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
            </el-timeline-item>
        </el-timeline>
        </el-dialog>
  </div>
</template>

<script>
import cityData from './citydata'
export default {
  // 组件名称
  name: 'demo',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize:10
        },
        total:0,
        orderlist:[],
        addressVisible:false,
        addressForm:{
            address1:[],
            address2:''
        },
        addressFormRules: {
            address1:[
                { required:true,message:'请选择省市区县',trigger:'blur' }
            ],
            address2:[
                { required:true,message:'请填写详细地址',trigger:'blur' }
            ]
        },
        cityData,
        progressVisible:false,
        progressInfo:[]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created (){
      this.getOrderList()
  },
  // 组件方法
  methods: {
      async getOrderList() {
          const { data:res } = await this.$http.get('orders',{ params: this.queryInfo })
          if (res.meta.status !== 200) {
              return this.$message.error('获取订单列表失败！!')
          }
          this.total = res.data.total
          this.orderlist = res.data.goods
      },
      handleSizeChange (newSize) {
          this.queryInfo.pagesize = newSize
          this.getOrderList()
      },
      handleCurrentChange (newPage) {
          this.queryInfo.pagenum = newPage
      },
    //   展示修改地址的对话框
      showBox () {
          this.addressVisible = true
      },
      addressDialogClosed () {
          this.$refs.addressFormRef.resetFields()
      },
      async showProgressBox () {
        //   const { data:res } = await this.$http.get('/kuaidi/804909574412544580')
        //   if (res.meta.status !== 200) {
        //       return this.$message.error('获取物流进度失败!')
        //   }
        //   this.progressInfo = res.data
        //   console.log(this.progressInfo)
          this.progressVisible = true
      }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang='less'>
.el-cascader {
    width: 100%;
}
</style>
