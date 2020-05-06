<template>
  <div class="aacontainer">
    <ul class="ull">
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
      <div class="upwrapper">
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

<style>
.aacontainer {
  width: 650px;
  height: 580px;
  padding: 10px;
}
.ull {
  margin-bottom: 10px;
}
.ull::after {
  content: '';
  display: block;
  clear: both;
}
.ull li {
  width: 150px;
  height: 150px;
  float: left;
  list-style-type: none;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
}
.ull li img {
  width: 149px;
  height: 149px;
  display: block;
  border: 0;
  border-radius: 6px;
}
.upwrapper {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 6px;
  float: left;
}
.mark {
  width: 147.5px;
  height: 147.5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #edf7ec;
  border: 1px dashed #c5dac0;
  border-radius: 6px;
}
.mark:hover {
  border-color: #5ecc42;
}
.clumn {
  width: 2px;
  height: 20px;
  background: #ddd;
  position: absolute;
  top: 65px;
  left: 50%;
  margin-left: -1px;
  transform: rotate(90deg);
}
.row {
  width: 2px;
  height: 20px;
  background: #ddd;
  position: absolute;
  top: 65px;
  left: 50%;
  margin-left: -1px;
}
.imgmark {
  width: 100%;
  height: 100%;
  background: #08080870;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
.del {
  color: #fff;
  cursor: pointer;
}
</style>
