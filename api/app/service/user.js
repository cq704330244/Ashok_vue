const Service = require("egg").Service;

class UserService extends Service {
  async find(userInf) {
    const { userInfo } = require("../public/userDate.js");
    const { ctx } = this;
    const result = {};
    var istrue = [false, 0];
    userInfo.map((x, index) => {
      if (x.name === userInf.name && x.password === userInf.pass) {
        istrue[0] = true;
        istrue[1] = index;
      }
    });
    if (istrue[0]) {
      ctx.status = 200;
      result.success = true;
      result.status = 200;
      result.error = 0;
      result.date = userInfo[istrue[1]];
      ctx.body = result;
    } else {
      ctx.status = 403;
      result.status = 403;
      result.error = 1;
      result.message = "用户名或密码错误";
      ctx.body = result;
    }
  }
  async sign(loginInfo) {
    return loginInfo;
  }
}

module.exports = UserService;
