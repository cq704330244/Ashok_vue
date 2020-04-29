<template>
  <div class="as-header">
    <div class="as-logo">
      <img src="../../assets/aslogo.png" alt="" />
    </div>
    Ashok
    <div class="as-user">
      <img :src="userInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  mounted() {}
}
</script>

<style lang="less">
@import './index.less';
</style>
