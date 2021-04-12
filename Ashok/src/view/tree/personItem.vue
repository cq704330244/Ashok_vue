<template>
  <div
    v-bind:class="{
      'person-item': !see,
      'person-item-see': see
    }"
    @click="personChange"
  >
    <input
      v-if="!see"
      type="checkbox"
      :value="item"
      v-model="checkedPersonData"
    />
    <div class="contens">
      <img :src="item.avart" alt="" />
      <div class="item-space">
        <div class="first">
          <div>{{ item.name }}</div>
          <div class="tag">{{ item.department }}</div>
        </div>
        <div class="last">{{ item.department }}</div>
      </div>
      <van-icon
        v-if="see"
        name="close"
        @click="$emit('deletePerson')"
        color="#1890ff"
        size="16"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'person',
  props: ['item', 'checkedNamesData', 'see'],
  computed: {
    checkedPersonData() {
      return this.checkedNamesData
    }
  },
  methods: {
    personChange() {
      !this.see && this.$emit('personChange')
    }
  }
}
</script>

<style lang="less">
@import '../../style/global.less';
.person-item,
.person-item-see {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  .contens {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
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
      color: #71d358f5;
      background-color: #f0ffec;
      border: solid 1px #71d358f5;
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
.person-item-see {
  justify-content: space-between;
  padding-right: 36px;
  .item-space {
    flex: 1 1 auto;
  }
}
</style>
