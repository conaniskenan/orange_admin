<!--
 * @Author: hypocrisy
 * @Date: 2021-05-28 21:50:59
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-28 23:52:24
 * @FilePath: /orange-admin/src/views/addnews.vue
-->
<!--  -->
<template>
  <div class="main">
    <el-form ref="form" :model="addForm" label-width="100px">
      <el-form-item label="新闻标题">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻类别">
        <el-select v-model="addForm.modelId" placeholder="请选择新闻分类">
          <el-option
            v-for="item in modelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻摘要">
        <el-input type="textarea" v-model="addForm.digest"></el-input>
      </el-form-item>
      <el-form-item label="新闻封面">
        <input type="file" class="photo" @change="uploadPhoto($event)" />
      </el-form-item>
      <el-form-item label="新闻内容">
        <input type="file" class="photo" @change="uploadHtml($event)" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="btn"
          >立即添加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
/* eslint-disable*/
import { getNewsPlate, uploadPhoto, uploadHtml, uploadNews } from '@/api/news'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      addForm: { title: '', digest: '', modelId: '', photo: '', body: '' },
      modelList: [],
      photo: '',
      content: '',
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
        this.modelList = [...res.list]
      })
    },
    uploadPhoto(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      uploadPhoto(formData)
        .then((res) => {
          this.addForm.photo = res.msg
          this.$message.success('上传图片成功')
        })
        .catch(() => {
          this.$message.error('上传图片失败')
        })
    }, //
    uploadHtml(e) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      uploadHtml(formData)
        .then((res) => {
          this.addForm.body = res.msg
          this.$message.success('上传html成功')
        })
        .catch(() => {
          this.$message.error('上传html失败')
        })
    },
    onSubmit() {
      uploadNews(this.addForm)
        .then(() => {
          this.$message.success('添加新闻成功')
        })
        .catch(() => {
          this.$message.error('添加新闻失败')
        })
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
.main
  width 50%
  height 700px
  border 2px solid #eee
  border-radius 5px
  background-color #fff
  position absolute
  left 50%
  transform translate(-50%)
  margin-top 100px
  .el-form
    margin-top 80px
  .photo
    color #606266
  .btn
    position absolute
    left 40%
    margin-top 200px
</style>
