<template>
  <div class="dep-item">
    <input
      type="checkbox"
      :value="item"
      v-model="checkeDepartmentData"
      @click="departmentChange"
    />
    <div class="contents">
      <div class="item-space" @click="departmentChange">
        {{ item.name }} <span>({{ getMemberNum(item.children) }}人)</span>
      </div>
      <div class="divide" />
      <div
        v-if="
          checkeDepartmentData.every(e => {
            return e !== item
          })
        "
        class="right"
        @click="goNextLevel"
      >
        <van-icon name="cluster-o" size="16" color="#1890ff" />
        <span>下级</span>
      </div>
      <div
        v-if="
          checkeDepartmentData.some(e => {
            return e === item
          })
        "
        class="right"
        :style="{ opacity: 0.5 }"
      >
        <van-icon name="cluster-o" size="16" color="#1890ff" />
        <span>下级</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonNum, getPerson } from './utils'

export default {
  name: 'department',
  props: ['item', 'checkedNamesData'],
  computed: {
    checkeDepartmentData() {
      return this.checkedNamesData
    }
  },
  // watch: {
  //   checkedNamesData: function(val, old) {
  //     console.log(this.item)
  //     console.log(getPerson(this.item.children))
  //     console.log(val)
  //   }
  // },
  methods: {
    goNextLevel() {
      this.$emit('goNextLevel')
    },
    departmentChange() {
      this.$emit('departmentChange')
    },
    getMemberNum(data) {
      return getPersonNum(data)
    },
    clickDepartment() {
      this.$emit('clickDepartment')
    }
  }
}
</script>

<style lang="less">
@import '../../style/global.less';
.dep-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  .item-space {
    flex: 1 1 auto;
    margin-left: 10px;
    padding: 10px 0;
    span {
      color: #aaa;
    }
  }
  .contents {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .divide {
    width: 1px;
    height: 18px;
    margin: 0 5px;
    background: #eee;
  }
  .right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #1890ff;
    > span {
      margin-left: 5px;
    }
  }
}
</style>
