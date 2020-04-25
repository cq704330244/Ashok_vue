"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.service.user.find(ctx.request.body);
  }
}

module.exports = LoginController;
