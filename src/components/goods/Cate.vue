<!--
 * @Author: Archie
 * @Date: 2022-02-02 10:56:06
 * @LastEditors: Archie
 * @LastEditTime: 2022-02-02 14:00:17
 * @FilePath: /vue_shop/src/components/goods/Cate.vue
-->
<template>
  <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区 -->
      <el-card>
          <!-- 添加分类按钮 -->
          <el-row>
              <el-col>
                  <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
              </el-col>
          </el-row>
          <!-- 表格 -->
          <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" :show-index="true" index-text="#" border :show-row-hover="false" class="treeTable">
              <!-- 是否有效 -->
              <template slot="isOk" slot-scope="scope">
                  <i class="el-icon-success" v-if="scope.row.cat_delete === false" style="color:lightgreen"></i>
                  <i class="el-icon-error" v-else style="color:red"></i>
              </template>
              <!-- 排序 -->
              <template slot="order" slot-scope="scope">
                  <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                  <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                  <el-tag type="warning" size="mini" v-else>三级</el-tag>
              </template>
              <!-- 操作 -->
              <template slot="opt">
                  <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
          </tree-table>

          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
      </el-card>
      <!-- 添加分类的对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addCatDialogVisible"
        width="50%"
        @close="addCateDialogClosed"
        >
        <!-- 添加分类的表单 -->
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
            <el-form-item label="分类名称:" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类:" prop="cat_name">
                <!-- options用来指定数据源 -->
                <!-- props用来指定配置对象 -->
                <el-cascader
                    v-model="selectedKeys"
                    :options="parentCateList"
                    :props="cascaderProps"
                    @change="parentCateChanged"
                    :clearable="true"
                    >
                </el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCatDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Cate',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
        // 查询条件
        queryInfo:{
            type:3,
            pagenum:1,
            pagesize:5
        },
        // 商品分类的数据列表，默认为空
        catelist:[],
        // 总数据条数
        total:0,
        // 为 table 指定列的定义
        columns:[{
            label:'分类名称',
            prop:'cat_name'
        },{
            label:'是否有效',
            // 将当前列定义为模板列
            type:'template',
            // 表示当前这一列使用的模板名称
            template:'isOk'
        },{
            label:'排序',
            // 将当前列定义为模板列
            type:'template',
            // 表示当前这一列使用的模板名称
            template:'order'
        },{
            label:'操作',
            // 将当前列定义为模板列
            type:'template',
            // 表示当前这一列使用的模板名称
            template:'opt'
        }],
        // 控制添加分类对话框的显示与隐藏
        addCatDialogVisible:false,
        // 添加分类的表单数据对象
        addCateForm:{
            // 将要添加的分类的名称
            cat_name:'',
            // 父级分类的id
            cat_pid:0,
            // 默认添加分类的等级是一级分类
            cat_level:0
        },
        // 添加分类表单的验证规则对象
        addCateFormRules:{
            cat_name:[
                {required:true,message:'请输入分类的名称',trigger:'blur'}
            ],
        },
        // 父级分类的列表
        parentCateList:[],
        // 指定级联选择器的配置对象
        // 在标签中直接配置
        cascaderProps:{
            expandTrigger: 'hover',
            checkStrictly: true,
            value:'cat_id',
            label:'cat_name',
            children:'children'
        },
        // 选中的父级分类的id数组
        selectedKeys:[]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
      this.getCateList()
  },
  // 组件方法
  methods: {
    //   获取商品分类数据
    async getCateList () {
        const { data:res } = await this.$http.get('categories',{ params:this.queryInfo })
        if (res.meta.status !== 200) {
            return this.$message.error('获取商品分类失败!')
        }
        // console.log(res.data)
        // 把数据列表，赋值给list
        this.catelist = res.data.result
        // 为总数据条数赋值
        this.total = res.data.total
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
        this.queryInfo.pagesize = newSize
        this.getCateList()
    },
    // 监听pagenum的改变
    handleCurrentChange (newPage) {
        this.queryInfo.pagenum = newPage
        this.getCateList()
    },
    // 点击按钮展示分类的对话框
    showAddCateDialog () {
        // 先获取父级分类的数据列表
        this.getParentCateList()
        // 展示出对话框
        this.addCatDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentCateList () {
        const { data:res } = await this.$http.get('categories',{ params:{ type: 2 } })
        if (res.meta.status !== 200) {
            return this.$message.error('获取父级分类数据失败!')
        }
        // console.log(res.data)
        this.parentCateList = res.data
    },
    // 选择项发生变化触发这个函数
    parentCateChanged () {
        // 如果 selectedKeys 数组中的 length大于0，证明选中了父级分类
        // 反之就说明没选择任何父级分类
        if (this.selectedKeys.length > 0) {
            // 父级分类的id
            this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
            // 为当前分类的等级赋值
            this.addCateForm.cat_level = this.selectedKeys.length
            return
        } else {
            // 父级分类的id
            this.addCateForm.cat_pid = 0
            // 为当前分类的等级赋值
            this.addCateForm.cat_level = 0
        }
    },
    // 点击按钮添加新的分类
    addCate () {
        // console.log(this.addCateForm)
        this.$refs.addCateFormRef.validate(async valid => {
            if (!valid) {
                return
            } else {
                const { data:res } = await this.$http.post('categories',this.addCateForm)
                if (res.meta.status !== 201) {
                    return this.$message.error('添加分类失败!')
                } else {
                    this.$message.success('添加分类成功!')
                    this.getCateList()
                    this.addCatDialogVisible = false
                }
            }
        })
    },
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogClosed () {
        this.$refs.addCateFormRef.resetFields()
        this.selectedKeys = []
        this.addCateForm.cat_level = 0
        this.addCateForm.cat_pid = 0
    }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang='less'>
.treeTable {
    margin-top: 15px;
}
.el-cascader {
    width: 100%;
}
</style>
