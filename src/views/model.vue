<!--
 * @Author: hypocrisy
 * @Date: 2021-05-27 22:06:37
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-06-10 14:16:05
 * @FilePath: /orange-admin/src/views/model.vue
-->

<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/news' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块管理</el-breadcrumb-item>
      <el-breadcrumb-item>模块列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="7">
          <!-- 搜索 -->
          <div class="grid-content bg-purple">
            <el-input
              v-model="searchData"
              placeholder="请输入模块名进行搜索"
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
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="addDialogVisible = true"
              >添加模块</el-button
            >
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
          label="模块名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="模块id"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="600" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id, scope.row.name)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeModelById(scope.row.id)"
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
    <el-dialog
      title="添加模块"
      :visible.sync="addDialogVisible"
      width="35%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="模块名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addModel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑模块"
      :visible.sync="editDialogVisible"
      width="35%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="模块名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editModel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getNewsPlate, addPlate, removePlate, updatePlate } from '@/api/news'
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
    getModelList() {
      this.loading = true
      getNewsPlate()
        .then((res) => {
          this.loading = false
          this.modelList = res.list
          this.getFilterList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFilterList() {
      //  es6过滤得到满足搜索条件的展示数据list
      let list = [...this.modelList].filter((item, index) =>
        item.name?.toLowerCase().includes(this.searchData.toLowerCase())
      )
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
    addModel() {
      if (/^\s*$/.test(this.addForm.name)) {
        this.$message.error('模块名不允许')
        return
      }
      addPlate(this.addForm)
        .then(() => {
          this.$message.success('添加模块成功')
          this.addDialogVisible = false
          this.getModelList()
        })
        .catch(() => {
          this.$message.error('添加模块失败')
        })
    },
    editModel() {
      updatePlate(this.editForm)
        .then(() => {
          this.$message.success('修改模块成功')
          this.editDialogVisible = false
          this.getModelList()
        })
        .catch(() => {
          this.$message.error('修改模块失败')
        })
    },
    showEditDialog(id, name) {
      this.editDialogVisible = true
      // this.editForm.id = id
      // this.editForm.name = name
      this.editForm = { name, id }
    },
    removeModelById(id) {
      this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removePlate(id)
            .then(() => {
              this.$message.success('删除模块成功')
              this.getModelList()
            })
            .catch(() => {
              this.$message.error('删除模块失败')
            })
        })
        .catch((error) => {
          return error
        })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getModelList()
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
    this.getModelList()
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