<template>
  <div class="app-contianer">
    <div class="contianer">
      <div class="as-input">
        <label for="input">请搜索英雄：</label>
        <el-input
          id="input"
          v-model="listquery.title"
          clearable
          placeholder="请输入英雄名字"
          style="width:200px"
          @keyup.native.enter="handleFilter"
        ></el-input>
      </div>
      <Select
        class="as-select"
        v-for="(item, index) in selects"
        :key="index"
        :name="item.name"
        :selectvalue="item.value"
        :item="item.arr"
        :id="item.id"
        @select="showModel(arguments)"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
    </div>
    <el-table
      :data="list"
      :key="tableKey"
      v-loading="showLoading"
      border
      fit
      :span-method="arraySpanMethod"
      highlight-current-row
      class="as-table"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="ID" prop="id" sortable align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.propsData }}</span>
        </template>
      </el-table-column>
      <el-table-column label="定位" width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.prosition }}</span>
        </template>
      </el-table-column>
      <el-table-column label="武器" width="140px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.arms }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名字" width="244px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.uname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="90px" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.dayA | statusFilter">{{ row.dayA }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="推图" width="90px" align="center">
        <template slot-scope="{ row }">
          <el-tag effect="plain" :type="row.dayB | statusFilter">{{
            row.dayB
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="BOSS" width="90px" align="center">
        <template slot-scope="{ row }">
          <el-tag effect="dark" :type="row.dayC | statusFilter">{{
            row.dayC
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listquery.page"
      :limit.sync="listquery.limit"
      @pagination="getList"
      class="pagination"
    />
  </div>
</template>

<script>
import { getList } from '../../api/tableData.js'
import Select from './components/Select.vue'
import Pagination from '../../components/Pagination'
export default {
  name: 'product',
  components: {
    Select,
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        S: 'warning',
        A: 'danger',
        B: '',
        C: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      methodSpan: true,
      list: [],
      showLoading: true,
      tableKey: 0,
      total: 1,
      model: [undefined, undefined, undefined],
      listquery: {
        title: '',
        selectProp: '',
        prosition: '',
        arms: '',
        page: 1,
        limit: 20
      },
      selects: [
        {
          id: 0,
          name: '属性：',
          value: 'selectProp',
          arr: [
            { value: '选项一', lable: '机械' },
            { value: '选项二', lable: '生物' },
            { value: '选项三', lable: '幽能' },
            { value: '选项四', lable: '防疫' },
            { value: '选项五', lable: '侵蚀' }
          ]
        },
        {
          id: 1,
          name: '定位：',
          value: 'prosition',
          arr: [
            { value: '选项一', lable: '火力' },
            { value: '选项一', lable: '强袭' },
            { value: '选项一', lable: '辅助' },
            { value: '选项一', lable: '医疗' },
            { value: '选项一', lable: '防御' }
          ]
        },
        {
          id: 2,
          name: '武器：',
          value: 'arms',
          arr: [
            { value: '选项一', lable: '自动步枪' },
            { value: '选项一', lable: '手枪' },
            { value: '选项一', lable: '霰弹枪' },
            { value: '选项一', lable: '榴弹枪' },
            { value: '选项一', lable: '狙击枪' }
          ]
        }
      ]
    }
  },
  methods: {
    // 子传父 封装select
    showModel(res) {
      this.model[res[1]] = res[0]
      let _that = this.listquery
      _that.selectProp = this.model[0]
      _that.prosition = this.model[1]
      _that.arms = this.model[2]
    },
    // table list
    getList() {
      const that = this
      this.showLoading = true
      getList(this.listquery)
        .then(res => {
          that.list = res.date
          let message = res.message
          this.methodSpan = false
          this.$notify({
            title: '成功',
            message: message,
            type: 'success',
            duration: 2000
          })
          setTimeout(res => {
            this.showLoading = false
          }, 500)
        })
        .catch(error => {
          this.showLoading = true
          let message = error.message
          this.$notify({
            title: '失败',
            message: message,
            type: 'error',
            duration: 2000
          })
        })
    },
    // filter事件流
    handleFilter() {
      this.listquery.page = 1
      this.listquery.search = true
      this.getList()
      console.log(this.listquery)
    },
    // table 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.methodSpan) {
        if (columnIndex === 2) {
          if (rowIndex % 5 === 0) {
            return [5, 1]
          } else if (rowIndex % 5 !== 0) {
            return [0, 0]
          }
        }
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>
.contianer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-left: -20px;
}
.as-input {
  float: left;
}
.as-select {
  float: left;
  width: 160px;
  padding: 0 0px 0 20px;
}
.filter-item {
  margin: 0 0 0 20px;
}
.as-table {
  width: 1000px;
  margin: 60px auto;
}
.pagination {
  text-align: center;
}
</style>
