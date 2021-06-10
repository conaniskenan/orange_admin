<!--
 * @Author: hypocrisy
 * @Date: 2021-05-27 22:06:44
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-06-10 13:15:07
 * @FilePath: /orange-admin/src/views/comment.vue
-->

<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/news' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>举报评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="7">
          <!-- 搜索 -->
          <div class="grid-content bg-purple">
            <el-input
              v-model="searchData"
              placeholder="请输入评论内容进行搜索"
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
          label="评论用户"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="评论id"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="评论内容"
          prop="Content"
          align="center"
        ></el-table-column>
        <el-table-column
          label="评论时间"
          prop="createTime"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="cancel(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeCommentById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
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
import {
  getReportComment,
  deleteReportComment,
  cancelReportComment,
} from '@/api/news'
import { getTime } from '@/utils'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      loading: false,
      filterList: [],
      list: [],
      limit: 15,
      total: null,
      page: 1,
      searchData: '',
      modelList: '',
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: { name: '' },
      editForm: {},
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getReportList() {
      this.loading = true
      getReportComment()
        .then((res) => {
          this.loading = false
          this.modelList = [...res.list]
          this.getFilterList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFilterList() {
      //  es6过滤得到满足搜索条件的展示数据list
      this.list = this.modelList.filter((item, index) =>
        item.name?.toLowerCase().includes(this.searchData.toLowerCase())
      )

      this.list.forEach((item) => {
        if (item.createTime.toString().length === 10) {
          item.createTime = getTime(item.createTime)
        }
      })
      this.filterList = this.list.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      )
      //分页的总数据
      this.total = this.list.length
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
    removeCommentById(id) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteReportComment(id)
            .then(() => {
              this.$message.success('删除评论成功')
              this.getReportList()
            })
            .catch(() => {
              this.$message.error('删除评论失败')
            })
        })
        .catch((error) => {
          return error
        })
    },
    cancel(id) {
      this.$confirm('此操作将取消该评论举报, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          cancelReportComment(id)
            .then(() => {
              this.$message.success('取消举报评论成功')
              this.getReportList()
            })
            .catch(() => {
              this.$message.error('取消举报评论失败')
            })
        })
        .catch((error) => {
          return error
        })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getReportList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.getReportList()
  }, //如果页面有keep-alive缓存功能，这个函数会触发
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