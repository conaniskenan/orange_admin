<!--
 * @Author: hypocrisy
 * @Date: 2021-05-27 18:12:30
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-28 23:20:27
 * @FilePath: /orange-admin/src/views/home.vue
-->
<template>
  <el-container class="header_container">
    <!-- 头部 -->
    <el-header>
      <div class="header">
        <img src="../assets/logo.png" alt />
        <span>橘子新闻后台管理</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle" @click="handleToggle"></div>
        <el-menu
          background-color="rgb(88, 76, 76)"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="this.$router.history.current.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>新闻管理</span>
            </template>
            <el-menu-item index="/news">
              <template>
                <i class="el-icon-s-grid"></i>
                <span>新闻列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/write">
              <template>
                <i class="el-icon-s-grid"></i>
                <span>写新闻</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/addnews">
              <template>
                <i class="el-icon-s-grid"></i>
                <span>添加新闻</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <template>
                <i class="el-icon-user-solid"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="/comments">
              <template>
                <i class="el-icon-notebook-2"></i>
                <span>举报评论列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-notebook-1"></i>
              <span>模块管理</span>
            </template>
            <el-menu-item index="/models">
              <template>
                <i class="el-icon-notebook-2"></i>
                <span>模块列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable */
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      meunlist: [],
      iconslist: {
        125: 'el-icon-s-check',
        103: 'el-icon-connection',
        101: 'el-icon-present',
        102: 'el-icon-bank-card',
        145: 'el-icon-reading',
      },
      isCollapse: false,
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.replace('/')
    },
    handleToggle() {
      this.isCollapse = !this.isCollapse
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.header {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #eee;
  letter-spacing: 1px;
  text-shadow: 0 0 2px rgb(129, 99, 99);
}
.header img {
  width: 50px;
  height: 50px;
  border: 2px solid #eee;
  border-radius: 50%;
  background-color: rgba(223, 201, 201, 0.934);
  margin-right: 10px;
}
.header_container {
  height: 100%;
}
.el-header {
  background-color: rgb(156, 113, 113);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
}
.el-menu {
  border: none;
}
.el-main {
  background-color: rgb(179, 169, 169);
}
.el-aside {
  background-color: rgb(88, 76, 76);
}
.toggle {
  text-align: center;
  color: rgb(133, 103, 103);
  font-weight: 700;
  letter-spacing: 0.2em;
  cursor: pointer;
  height: 20px;
}
</style>