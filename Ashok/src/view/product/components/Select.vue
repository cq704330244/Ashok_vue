<template>
  <div>
    <label :for="this.selectvalue">{{this.name}}</label>
    <el-select
      :id="this.selectvalue"
      v-model="sel"
      placeholder="选择"
      clearable
      filterable
      style="width:120px"
      @change="handleSelect()"
    >
      <el-option v-for="item in item" :key="item.lable" :label="item.lable" :value="item.lable"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    item: {
      type: Array
    },
    name: {
      type: String
    },
    selectvalue: {
      type: String
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      sel: ''
    }
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.sel, this.id)
    }
  }
}
</script>
