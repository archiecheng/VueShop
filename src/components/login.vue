<!--
 * @Author: Archie
 * @Date: 2022-01-31 20:46:00
 * @LastEditors: Archie
 * @LastEditTime: 2022-01-31 23:24:14
 * @FilePath: /vue_shop/src/components/login.vue
-->
<template>
  <div class="login-container">
      <div class="login-box">
        <!-- 头像区 -->
        <div class="avatart-box">
          <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登录表单区 -->
        <!-- ref: 一个引用的方式 loginFormRef就是实例对象-->
        <el-form label-width="0" class="login-form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
          <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username" ></el-input>
        </el-form-item >
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Login',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
          username: '',
          password: ''
        },
        // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username:[
          { required: true, message: '请输入登录名称', trigger: 'blur'},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password:[
          { required: true, message: '请输入登录密码', trigger: 'blur'},
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
    }
  }

},
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },
    // 获取表单的引用对象，通过validate
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          /* 这个冒号语法没看懂 */
          const { data:res } = await this.$http.post('login',this.loginForm);
          if (res.meta.status !== 200) {
            return this.$message.error('登录失败!')
          } else {
            this.$message.success('登录成功!')
            // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage中
                // 1.1 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
                // 1.2 token 只应在当前网站打开期间生效，所以将token保存在 sessionStorage 中
            // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
            window.sessionStorage.setItem('token',res.data.token)
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="less">
.login-container {
    background-color: #2b4b6b;
    height: 100%;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avatart-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
