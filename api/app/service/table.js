const Service = require('egg').Service

class TableService extends Service {
  async getDate(table) {
    const { tableData } = require('../public/tableDate.js')
    const { ctx } = this
    if (table.search) {
      const result = {}
      const { title, selectProp, arms, prosition } = table
      const filterdata = tableData.filter((x) => {
        return (
          x.arms === arms &&
          x.prosition === prosition &&
          x.uname === title &&
          x.propsData === selectProp
        )
      })
      ctx.status = 200
      result.success = true
      result.status = 200
      result.error = 0
      result.date = filterdata
      ctx.body = result
    } else {
      const result = {}
      ctx.status = 200
      result.success = true
      result.status = 200
      result.error = 0
      result.date = tableData
      ctx.body = result
    }
  }
}

module.exports = TableService
