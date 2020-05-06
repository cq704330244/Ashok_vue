const Service = require('egg').Service

class TableService extends Service {
  async getDate(table) {
    const { tableData } = require('../public/tableDate.js')
    const { ctx } = this
    console.log(table)
    if (table.search) {
      console.log(111)
      const result = {}
      const { title, selectProp, arms, prosition } = table
      const filterdata = tableData.filter((items) => {
        return (
          items.uname == title &&
          items.propsData == selectProp &&
          items.arms == arms &&
          items.prosition == prosition
        )
      })
      console.log(filterdata)
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
