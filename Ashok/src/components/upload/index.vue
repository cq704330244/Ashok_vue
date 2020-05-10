<template>
  <div class="as-upload-container">
    <h1 class="tip">暂时只支持图片文件的上传</h1>
    <ul class="as-ul">
      <li
        v-for="(item, index) in imgList"
        :key="index"
        @mouseenter="markenter(index)"
        @mouseleave="markleave(index)"
      >
        <img :src="item.src" alt />
        <div class="imgmark" :ref="'img' + index">
          <div class="markbtn">
            <div class="del" @click="Picturepreview(item)" />
            <div class="preview" @click="del(index)" />
          </div>
        </div>
      </li>
      <div class="as-upwrapper">
        <input
          ref="fileInput"
          multiple
          type="file"
          @change="fileChange($event)"
          style="display:none"
        />
        <div class="as-mark" @click="onchange">
          <div class="row" />
          <div class="clumn" />
        </div>
      </div>
    </ul>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data() {
    return {
      imgList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    markenter(value) {
      let ree = 'img' + value
      this.$refs[ree][0].style.display = 'block'
    },
    markleave(value) {
      let ree = 'img' + value
      this.$refs[ree][0].style.display = 'none'
    },
    del(value) {
      this.imgList.splice(value, 1)
    },
    Picturepreview(file) {
      this.dialogImageUrl = file.src
      this.dialogVisible = true
    },
    fileChange(el) {
      this.fileList(el.target.files[0])
      el.target.value = ''
    },
    onchange() {
      this.$refs.fileInput.click()
    },
    fileList(res) {
      let that = this
      let reader = new FileReader()
      reader.readAsDataURL(res)
      reader.onload = function() {
        res.src = this.result
        let image = new Image()
        image.src = this.result
        image.onload = function() {
          let width = image.width
          let height = image.height
          res.width = width
          res.height = height
          that.imgList.push(res)
        }
      }
      this.$emit('onchange', this.imgList)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
