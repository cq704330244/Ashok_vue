"use strict";

const Controller = require("egg").Controller;

class SignController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.user.sign(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = SignController;
