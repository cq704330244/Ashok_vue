<template>
  <div v-loading="loading" class="layout-wrap">
    <!-- 标题栏 -->
    <Header />
    <!-- 下方容器 -->
    <div class="as-container">
      <!-- 左侧导航 -->
      <div id="as-left" class="as-left">
        <Side :isCollapse="isCollapse" />
      </div>
      <!-- 右侧内容区 -->
      <div class="as-right" id="as-right">
        <template v-for="(item, index) in skinpic">
          <div
            v-if="item.show"
            class="layout-background"
            :style="{ backgroundImage: 'url(' + item.url + ')' }"
            :key="index"
          />
        </template>

        <!-- 第一行辅助信息 -->
        <div class="as-row">
          <div
            class="as-menulogo"
            :class="{ openMenu: isCollapse, closeMenu: !isCollapse }"
            @click="changeMenu"
          />
          <!-- 右侧菜单组 -->
          <div class="as-right-group">
            <el-button
              id="as-package"
              icon="el-icon-umbrella"
              circle
              @click="openSkinmenu"
            ></el-button>
            <div class="as-skin-box" v-if="skinMenu">
              <div class="as-right-group-btn">
                <template v-for="(item, index) in skinbtn">
                  <el-button
                    type="primary"
                    :class="{ bggreen: item.isactive }"
                    plain
                    :key="index"
                    @click="changeSkin(item.key)"
                    >{{ item.label }}</el-button
                  >
                </template>
              </div>
              预览：
              <template v-for="(item, index) in skinpic">
                <img
                  :src="item.url"
                  alt
                  :key="index"
                  v-show="item.show"
                  class="as-right-group-pic"
                />
              </template>
              <div class="as-right-group-submit">
                <el-button type="primary" plain @click="changeskin(skinNum)"
                  >修改</el-button
                >
                <el-button type="primary" plain @click="closeSkinmenu"
                  >取消</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from '../side'
import Header from '../header'
import skinPiclist from './pic64base.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      isCollapse: false,
      skinMenu: false,
      skinbtn: [
        { label: '默认', isactive: true, key: 0 },
        { label: '汪汪 ~', isactive: false, key: 1 },
        { label: '喵喵~', isactive: false, key: 2 }
      ],
      skinpic: skinPiclist
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  mounted() {
    if (!sessionStorage.getItem('admin')) {
      this.$message({
        showClose: true,
        message: '登陆过期！请前往登陆界面重新登陆！',
        type: 'warning'
      })
      this.loading = true
    } else {
      this.$router.push({
        path: '/home/desktop'
      })
      this.$message({
        showClose: true,
        message:
          '登陆成功！欢迎' + (this.userInfo.name || '小主') + '的来到！！',
        type: 'success'
      })
    }
  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse
    },
    changeSkin(value) {
      this.skinNum = value
      this.skinbtn.map(res => {
        if (res.key === value) {
          res.isactive = true
        } else {
          res.isactive = false
        }
      })
      this.skinpic.map((res, index) => {
        if (index === value) {
          res.show = true
        } else {
          res.show = false
        }
      })
    },
    openSkinmenu() {
      this.skinMenu = true
    },
    closeSkinmenu() {
      this.skinpic.map((res, index) => {
        if (index === 0) {
          res.show = true
        } else {
          res.show = false
        }
      })
      this.$message({
        showClose: true,
        message: '取消修改！ 已恢复默认背景！！！',
        type: 'error'
      })
      this.skinMenu = false
    },
    changeskin(key) {
      this.skinpic.map((res, index) => {
        if (index === key) {
          res.show = true
        } else {
          res.show = false
        }
      })
      this.$message({
        showClose: true,
        message: '修改背景成功！',
        type: 'success'
      })
      this.skinMenu = false
    }
  },
  components: {
    Side,
    Header
  }
}
</script>

<style lang="less">
@import './layout.less';
</style>
