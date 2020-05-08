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
        :title="true"
        @select="showModel(arguments)"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >查询</el-button
      >
      <el-button icon="el-icon-edit" type="primary" @click="handleAdd">
        新增
      </el-button>
    </div>
    <div class="as-tableheader">
      <div>
        <el-button type="success" plain @click="checkboxA">批量取消</el-button>
        <el-button type="danger" plain @click="checkboxD">批量删除</el-button>
      </div>
    </div>
    <el-table
      :data="
        list.filter(
          data =>
            !listquery.title ||
            data.uname.toLowerCase().includes(listquery.title.toLowerCase())
        )
      "
      :key="tableKey"
      v-loading="showLoading"
      border
      fit
      :span-method="arraySpanMethod"
      @selection-change="handleSelectionChange"
      highlight-current-row
      class="as-table"
      ref="multipleTable"
    >
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
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
          <el-tag :type="row.dayA.toUpperCase() | statusFilter">{{
            row.dayA.toUpperCase()
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="推图" width="90px" align="center">
        <template slot-scope="{ row }">
          <el-tag
            effect="plain"
            :type="row.dayB.toUpperCase() | statusFilter"
            >{{ row.dayB.toUpperCase() }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="BOSS" width="90px" align="center">
        <template slot-scope="{ row }">
          <el-tag effect="dark" :type="row.dayC.toUpperCase() | statusFilter">{{
            row.dayC.toUpperCase()
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleUpdate(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(row, $index)"
          ></el-button>
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
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <el-form
        :rules="rules"
        ref="dialogForm"
        :model="dialogForm"
        label-width="80px"
      >
        <el-form-item label="ID：">
          <el-input
            clearable
            style="width:120px"
            v-model="dialogForm.id"
            :disabled="modify"
          ></el-input>
        </el-form-item>
        <el-form-item for="uname" prop="uname" label="英雄：">
          <el-input
            clearable
            style="width:300px"
            id="uname"
            v-model="dialogForm.uname"
          ></el-input>
        </el-form-item>
        <el-form-item for="dayA" prop="dayA" label="角色：">
          <el-input
            clearable
            style="width:120px"
            id="dayA"
            v-model="dialogForm.dayA"
          ></el-input>
        </el-form-item>
        <el-form-item for="dayB" prop="dayB" label="推图：">
          <el-input
            clearable
            style="width:120px"
            id="dayB"
            v-model="dialogForm.dayB"
          ></el-input>
        </el-form-item>
        <el-form-item for="dayC" prop="dayC" label="BOSS：">
          <el-input
            clearable
            id="dayC"
            style="width:120px"
            v-model="dialogForm.dayC"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in selects"
          :key="index"
          :label="item.name"
        >
          <Select
            :selectvalue="item.value"
            :item="item.arr"
            :id="item.id"
            :title="false"
            :models="models[index]"
            @selects="showModels(arguments)"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? updateData() : createData()"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      dialogStatus: '',
      modify: false,
      methodSpan: true,
      list: [],
      showLoading: true,
      tableKey: 0,
      total: 1,
      model: [undefined, undefined, undefined],
      models: [undefined, undefined, undefined],
      listquery: {
        title: '',
        selectProp: '',
        prosition: '',
        arms: '',
        page: 1,
        limit: 20
      },
      dialogForm: {
        id: '',
        propsData: '',
        prosition: '',
        arms: '',
        uname: '',
        dayA: '',
        dayB: '',
        dayC: ''
      },
      rules: {
        uname: [
          { required: true, message: '属性: 不能为空', trigger: 'change' }
        ],
        dayA: [
          { required: true, message: '角色: 不能为空', trigger: 'change' }
        ],
        dayB: [
          { required: true, message: '推图: 不能为空', trigger: 'change' }
        ],
        dayC: [{ required: true, message: 'BOSS: 不能为空', trigger: 'change' }]
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
    showModels(res) {
      this.models[res[1]] = res[0]
      let _that = this.dialogForm
      _that.propsData = this.models[0]
      _that.prosition = this.models[1]
      _that.arms = this.models[2]
    },
    // table list
    getList() {
      const that = this
      this.showLoading = true
      getList(this.listquery)
        .then(res => {
          that.list = res.date
          let message = res.message
          this.methodSpan = !this.listquery.search
          if (message === '查询成功!' || !message) {
            this.$notify({
              title: '成功',
              message: message || '初始化成功！',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '失败',
              message: message,
              type: 'error',
              duration: 2000
            })
          }

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
    },
    // row table  修改
    handleUpdate(row) {
      this.dialogForm = Object.assign({}, row) // copy
      this.models = [
        this.dialogForm.propsData,
        this.dialogForm.prosition,
        this.dialogForm.arms
      ]
      console.log(this.models)
      this.modify = true
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
      })
    },
    // 修改
    createData() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          const index = this.list.findIndex(v => v.id === this.dialogForm.id)
          this.list.splice(index, 1, this.dialogForm)
          this.dialogVisible = false
          this.$notify({
            title: '修改table列表！',
            message: this.list[index] + '改为' + this.dialogForm,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '修改table列表失败！',
            message: '必选项不能为空',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 文本框 判断id
    addDialogForm() {
      let length = this.list.length
      let id = this.list.length > 0 ? this.list[length - 1].id + 1 : 1
      this.dialogForm = {
        id: id,
        propsData: '',
        prosition: '',
        arms: '',
        uname: '',
        dayA: '',
        dayB: '',
        dayC: ''
      }
    },
    // add 添加
    handleAdd() {
      this.models = []
      this.addDialogForm()
      this.dialogStatus = 'create'
      this.modify = true
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
      })
    },
    // 添加
    updateData() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          this.list.unshift(this.dialogForm)
          this.dialogVisible = false
          this.$notify({
            title: '新增table列表！',
            message: this.dialogForm,
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '新增table列表失败！',
            message: '必选项不能为空',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // buttton delete
    handleDelete(row, status) {
      this.$notify({
        title: '成功',
        message: '删除成功！',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    // delete handle any
    checkboxD() {
      let status = this.handleChange
      let deleteArr = []
      if (status !== undefined && status.length !== 0) {
        status.map(item => {
          let id = item.id
          let inx = this.list.findIndex(v => v.id === id)
          this.list.splice(inx, 1)
          deleteArr.push(id)
        })
        this.$notify({
          title: '批量删除成功！',
          message: 'id-' + deleteArr,
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '失败',
          message: '当前没有可删除项',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 批量取消
    checkboxA() {
      this.$refs.multipleTable.clearSelection()
      this.$notify({
        title: '成功',
        message: '批量取消成功！',
        type: 'success',
        duration: 2000
      })
    },
    handleSelectionChange(val) {
      this.handleChange = val
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>
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
.as-table,
.as-tableheader,
.contianer {
  width: 1200px;
  margin: 40px auto;
}
.pagination {
  text-align: center;
}
.as-tableheader {
  display: flex;
  flex: 1;
}
</style>
