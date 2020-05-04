const Service = require('egg').Service

class TableService extends Service {
  async getDate(table) {
    const { tableData } = require('../public/tableDate.js')
    const { ctx } = this
    const result = {}
    ctx.status = 200
    result.success = true
    result.status = 200
    result.error = 0
    result.date = tableData
    ctx.body = result
    return tableData
  }
}

module.exports = TableService
