<template>
  <div class="person-item" @click="personChange">
    <input type="checkbox" :value="item" v-model="checkedPersonData" />
    <img :src="item.avart" alt="" />
    <div class="item-space">
      <div class="first">
        <div>{{ item.name }}</div>
        <div class="tag">{{ item.department }}</div>
      </div>
      <div class="last">{{ item.department }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'person',
  props: ['item', 'checkedNamesData'],
  computed: {
    checkedPersonData() {
      return this.checkedNamesData
    }
  },
  methods: {
    personChange() {
      this.$emit('personChange')
    }
  }
}
</script>

<style lang="less">
@import '../../style/global.less';
.person-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  img {
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 9px;
    margin: 0 10px;
  }
  .item-space {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    .first {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > div {
        margin-right: 10px;
      }
    }
    .last {
      color: #aaa;
    }
    .tag {
      color: #08979c;
      background: #e6fffb;
      border: solid 1px #87e8de;
      font-variant: tabular-nums;
      list-style: none;
      height: auto;
      margin: 0 8px 0 0;
      padding: 0 7px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
}
</style>
