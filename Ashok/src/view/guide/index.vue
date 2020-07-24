<template>
  <div>
    Ashok后台管理：<el-button
      type="primary"
      plain
      id="guide"
      @click.prevent.stop="driverGuide"
      >介绍指导</el-button
    >
  </div>
</template>

<script>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver({
      doneBtnText: '完成', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步' // Previous button text for this step
    })
  },
  methods: {
    driverGuide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
