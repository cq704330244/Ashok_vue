<template>
  <el-menu
    default-active="/home/deskTop"
    class="as-el-menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
  >
    <el-submenu :index="'' + index" v-for="(item, index) in path" :key="index">
      <!-- 一级导航 -->
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>

      <template v-if="item.children">
        <div v-for="itemr in item.children" :key="itemr.path">
          <el-menu-item :index="itemr.path">{{ itemr.name }}</el-menu-item>
        </div>
      </template>

      <template v-if="item.children">
        <div v-for="items in item.children" :key="items.name">
          <template v-if="items.children">
            <div v-for="itemss in items.children" :key="itemss.path">
              <el-submenu :index="itemss.path">
                <template slot="title">
                  <span slot="title">{{ itemss.name }}</span>
                </template>
                <el-menu-item :index="itemss.path">{{
                  itemss.name
                }}</el-menu-item>
              </el-submenu>
            </div>
          </template>
        </div>
      </template>
    </el-submenu>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
import routerPath from '../../router/routerPath.js'
export default {
  data() {
    return {
      path: routerPath
    }
  },
  props: ['isCollapse'],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {}
  }
}
</script>

<style lang="less"></style>
