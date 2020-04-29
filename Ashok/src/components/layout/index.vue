<template>
  <div v-loading="loading">
    <Header />
    <div class="as-container">
      <div class="as-left">
        <Side :isCollapse="isCollapse" />
      </div>
      <div class="as-right">
        <div class="as-row">
          <div
            class="as-menulogo "
            :class="{ openMenu: isCollapse, closeMenu: !isCollapse }"
            @click="changeMenu"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from '../side'
import Header from '../header'
export default {
  data() {
    return {
      loading: false,
      isCollapse: false
    }
  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse
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
