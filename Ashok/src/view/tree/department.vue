<template>
  <div class="dep-item">
    <input
      v-if="!see"
      type="checkbox"
      :value="item"
      v-model="checkeDepartmentData"
      @click="departmentChange"
    />
    <div class="contents">
      <div class="item-space" @click="departmentChange">
        <template v-if="getSelectMemberNum() <= 0">
          {{ item.name }} <span>({{ getMemberNum(item.children) }}人)</span>
        </template>
        <template v-if="getSelectMemberNum() > 0">
          {{ item.name }}
          <span class="hasSelect"
            >( {{ getSelectMemberNum() }}/{{
              getMemberNum(item.children)
            }}人)</span
          >
        </template>
      </div>
      <template v-if="!see">
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
      </template>
      <van-icon
        v-if="see"
        name="close"
        @click="$emit('deletedepartment')"
        color="#1890ff"
        size="16"
      />
    </div>
  </div>
</template>

<script>
import { getPersonNum, getPerson } from './utils'

export default {
  name: 'department',
  props: ['item', 'checkedNamesData', 'see'],
  computed: {
    checkeDepartmentData() {
      return this.checkedNamesData
    }
  },
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
    val(arr1, arr2) {
      return [...new Set(arr1)].filter(item => arr2.includes(item))
    },
    getSelectMemberNum(data) {
      const Arr = this.val(
        this.checkedNamesData,
        this.getMembers(this.item.children)
      )
      return Arr.length
    },
    getMembers(data) {
      return getPerson(data)
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
    .hasSelect {
      color: #1890ff;
    }
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    .van-icon-close {
      margin-right: 16px;
    }
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
