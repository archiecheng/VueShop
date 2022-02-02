<!--
 * @Author: Archie
 * @Date: 2022-02-03 00:09:24
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-03 00:30:00
 * @FilePath: /vue_shop/src/components/report/Report.vue
-->
<template>
  <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区 -->
      <el-card>
          <!-- 2. 为Echarts准备一个具备大小(宽高)的Dom -->
          <div id="main" style="width:750px;height:400px;"></div>
      </el-card>
  </div>
</template>

<script>
// 1. 导入 echarts
import * as echarts from 'echarts'
import _ from 'lodash'
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
        // 需要合并的数据
        options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
    //   只要执行到了mounted这个函数，此时页面上的元素已经被渲染完毕了
  async mounted () {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    const { data:res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
        return this.$message.error('获取折线图数据失败!')
    }

    // 4. 准备数据和配置项
    const result = _.merge(res.data,this.options)

    // 5. 展示数据
     myChart.setOption(result)
  },
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
