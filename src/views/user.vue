<!--
 * @Author: hypocrisy
 * @Date: 2021-05-27 21:22:19
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-28 15:44:00
 * @FilePath: /orange-admin/src/views/user.vue
-->
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/news' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="7">
          <!-- 搜索 -->
          <div class="grid-content bg-purple">
            <el-input
              v-model="searchData"
              placeholder="请输入用户姓名进行搜索"
              clearable
              style="width: 380px"
              @clear="search"
              @change="search"
              @click="search"
              @input="search"
            >
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 主体列表 -->
      <el-table
        :data="filterList"
        border
        stripe
        size="mini"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" align="center" width="150">
          <template v-slot="scope">
            <span>{{ (page - 1) * limit + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="关注数"
          prop="Idol"
          align="center"
        ></el-table-column>
        <el-table-column
          label="收藏新闻数"
          prop="collect"
          align="center"
        ></el-table-column>
        <el-table-column
          label="硬币"
          prop="coin"
          align="center"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          align="center"
        ></el-table-column>
        <el-table-column
          label="最近登录"
          prop="lastLoginTime"
          align="center"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        >></el-pagination
      >
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import { getUser } from '@/api/user'
import { getTime } from '@/utils'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      loading: false,
      filterList: [],
      filterLists: [],
      data: [],
      limit: 15,
      total: null,
      page: 1,
      searchData: '',
      userList: '',
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getUserList() {
      this.loading = true
      getUser()
        .then((res) => {
          this.loading = false
          this.userList = [...res.list]
          this.getFilterList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFilterList() {
      //  es6过滤得到满足搜索条件的展示数据list
      let list = [...this.userList].filter((item, index) =>
        item.name.toLowerCase().includes(this.searchData.toLowerCase())
      )
      //过滤分页
      list.forEach((item) => {
        if (item.lastLoginTime.toString().length === 10) {
          item.lastLoginTime = getTime(item.lastLoginTime)
        }
      })
      this.filterList = list.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      )
      //分页的总数据
      this.total = list.length
    },
    handleSizeChange(val) {
      this.limit = val
      this.getFilterList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getFilterList()
    },
    search() {
      this.page = 1
      this.getFilterList()
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getUserList()
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='stylus' scoped>
/* @import url(); 引入公共css类 */
.el-breadcrumb
  margin-bottom 20px
.el-table
  margin-top 20px
.el-pagination
  margin-top 20px
</style>