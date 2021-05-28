<!--
 * @Author: hypocrisy
 * @Date: 2021-05-27 18:49:40
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-28 23:11:24
 * @FilePath: /orange-admin/src/views/news.vue
-->
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/news' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="7">
          <!-- 搜索 -->
          <div class="grid-content bg-purple">
            <el-select
              v-model="modelId"
              placeholder="请选择新闻分类"
              @change="getNewsList"
            >
              <el-option
                v-for="item in modelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <!-- <div class="grid-content bg-purple">
            <el-button type="primary" @click="addDialogVisible = true"
              >添加新闻</el-button
            >
          </div> -->
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
        <el-table-column type="index" label="序号" align="center">
          <template v-slot="scope">
            <span>{{ (page - 1) * limit + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="新闻标题"
          prop="title"
          width="450"
          align="center"
        ></el-table-column>
        <el-table-column label="作者" align="center"
          >橘子新闻网</el-table-column
        >
        <el-table-column
          label="分类"
          prop="modelName"
          align="center"
        ></el-table-column>
        <el-table-column label="发布时间" prop="createTime" align="center">
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeNewsById(scope.row.id)"
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
    <!-- 弹出表单-编辑 -->
    <el-dialog
      title="编辑新闻"
      :visible.sync="editDialogVisible"
      width="35%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="digest">
          <el-input v-model="editForm.digest"></el-input>
        </el-form-item>
        <el-form-item label="分类" required prop="modelName">
          <el-select v-model="editForm.modelId" placeholder="请选择新闻分类">
            <el-option
              v-for="item in modelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="新闻内容" prop="content">
          <el-input
            type="textarea"
            v-model="editForm.content"
            :rows="6"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNews">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getNewsById,
  getModelNews,
  updateNews,
  deleteNews,
  getNewsPlate,
} from '@/api/news'
import { getTime } from '@/utils'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      modelList: [],
      modelId: '',
      loading: false,
      filterList: [],
      limit: 15,
      total: null,
      page: 1,
      searchData: '',
      newsList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        body: '',
        photo: '',
        digest: '',
        title: '',
        modelId: '',
        id: '',
      },
      editForm: {},
      addFormRules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 30,
            message: '标题的长度在4~30个字符之间',
            trigger: 'blur',
          },
        ],
        author: [
          {
            required: true,
            message: '请选择新闻来源',
            trigger: 'blur',
          },
        ],
        category: [
          {
            required: true,
            message: '请选择新闻分类',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 30,
            message: '标题的长度在4~30个字符之间',
            trigger: 'blur',
          },
        ],
        content: [
          {
            required: true,
            message: '请输入新闻内容',
            trigger: 'blur',
          },
          {
            min: 10,
            max: 5000,
            message: '新闻内容的长度在10~5000个字符之间',
            trigger: 'blur',
          },
        ],
      },
      editFormRules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 50,
            message: '标题的长度在4~50个字符之间',
            trigger: 'blur',
          },
        ],
        content: [
          {
            required: true,
            message: '请输入新闻内容',
            trigger: 'blur',
          },
          {
            min: 10,
            max: 5000,
            message: '新闻内容的长度在10~5000个字符之间',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getPlate() {
      getNewsPlate().then((res) => {
        this.modelList = res.list
      })
    },
    getNewsList() {
      // this.loading = true
      getModelNews(this.modelId)
        .then((res) => {
          if (res.list == null) {
            this.newsList = []
          } else {
            this.newsList = res.list
          }
          this.getFilterList()
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showEditDialog(id) {
      getNewsById(id)
        .then((res) => {
          this.editForm = res.info
          this.editDialogVisible = true
        })
        .catch((error) => {
          return error
        })
    },
    editNews() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return
        let form = {}
        form.title = this.editForm.title
        form.digest = this.editForm.digest
        form.photo = this.editForm.photo
        form.body = this.editForm.body
        form.modelId = parseInt(this.editForm.modelId)
        form.id = this.editForm.id
        updateNews(form)
          .then(() => {
            this.$message.success('更新新闻成功')
            this.editDialogVisible = false
            this.getNewsList()
          })
          .catch(() => {
            this.$message.error('更新新闻失败')
          })
      })
    },
    removeNewsById(id) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteNews(id)
            .then(() => {
              this.$message.success('删除新闻成功')
              this.getNewsList()
            })
            .catch(() => {
              this.$message.error('删除新闻失败')
            })
        })
        .catch((error) => {
          return error
        })
    },
    getFilterList() {
      //  es6过滤得到满足搜索条件的展示数据list
      //过滤分页
      let list = [...this.newsList].filter((item, index) => {
        return item.title.toLowerCase().includes(this.searchData.toLowerCase())
      })
      list.forEach((item) => {
        if (item.createTime.toString().length === 10) {
          item.createTime = getTime(item.createTime)
        }
      })
      this.filterList = list.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      )
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
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getNewsList()
    this.getPlate()
  },
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
<style lang='stylus' scoped>
/* @import url(); 引入公共css类 */
.el-breadcrumb
  margin-bottom 20px
.el-table
  margin-top 20px
.el-pagination
  margin-top 20px
.el-form .el-input
  width 80%
.el-select
  width 80%
.el-textarea
  width 80%
</style>