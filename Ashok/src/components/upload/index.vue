<template>
  <div class="as-upload-container">
    <ul class="as-ul">
      <li
        v-for="(item, index) in imgList"
        :key="index"
        @mouseenter="markenter(index)"
        @mouseleave="markleave(index)"
      >
        <img :src="item.src" alt />
        <div class="imgmark" :ref="'img' + index">
          <div class="del" @click="del(index)">删除</div>
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
        <div class="mark" @click="onchange">
          <div class="row" />
          <div class="clumn" />
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data() {
    return {
      imgList: []
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
