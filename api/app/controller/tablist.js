'use strict'

const Controller = require('egg').Controller

class TablistController extends Controller {
  async index() {
    const { ctx } = this
    const result = await ctx.service.table.getDate(ctx.request.body)
  }
}

module.exports = TablistController
