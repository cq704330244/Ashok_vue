<template>
  <div>
    <div v-if="this.title">
      <label :for="this.selectvalue">{{ this.name }}</label>
      <el-select
        :id="this.selectvalue"
        v-model="sel"
        placeholder="选择"
        clearable
        filterable
        style="width:120px"
        @change="handleSelect()"
      >
        <el-option
          v-for="item in item"
          :key="item.lable"
          :label="item.lable"
          :value="item.lable"
        ></el-option>
      </el-select>
    </div>
    <div v-else>
      <el-select
        v-model="mod"
        placeholder="选择"
        clearable
        filterable
        style="width:120px"
        @change="handleSelects()"
      >
        <el-option
          v-for="item in item"
          :key="item.lable"
          :label="item.lable"
          :value="item.lable"
        ></el-option>
      </el-select>
    </div>
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
    },
    title: {
      type: Boolean
    },
    models: {
      type: String
    }
  },
  data() {
    return {
      sel: '',
      mod: this.models
    }
  },
  watch: {
    models: 'changemod'
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.sel, this.id)
    },
    handleSelects() {
      this.$emit('selects', this.mod, this.id)
    },
    // 监听 同步 时时绑定
    changemod: function() {
      this.mod = this.models
    }
  }
}
</script>
