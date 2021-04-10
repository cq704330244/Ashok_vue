<template>
  <div>
    <person-item
      v-show="!itemData.children"
      :item="itemData"
      :checkedNamesData="checkedData"
      @personChange="personChange"
    />
    <department
      v-show="itemData.children"
      :item="itemData"
      :checkedNamesData="checkedData"
      @goNextLevel="goNextLevel"
      @departmentChange="departmentChange"
      @clickItem="clickDepartment"
    />
  </div>
</template>

<script>
import personItem from './personItem'
import department from './department'

export default {
  name: 'listItem',
  props: ['item', 'checkedNameArr'],
  computed: {
    itemData() {
      return this.item
    },
    checkedData() {
      return this.checkedNameArr
    }
  },
  components: {
    'person-item': personItem,
    department
  },
  methods: {
    goNextLevel() {
      this.$emit('goNextLevel')
    },
    departmentChange() {
      this.$emit('departmentChange')
    },
    personChange() {
      this.$emit('departmentChange')
    },
    clickDepartment() {
      console.log('item')
      this.$emit('clickListItem')
    }
  }
}
</script>

<style lang="less"></style>
