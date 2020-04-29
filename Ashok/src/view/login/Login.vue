<template>
  <div class="mark">
    <div class="container">
      <div class="login-header">
        <div class="login-logo">
          <img src="../../assets/login-logo.png" alt="" />
        </div>
        Ashok
        <div class="btngroup">
          <div
            v-for="(test, index) in msg"
            :key="index"
            class="title"
            :class="{ handle: test.click }"
            @click="handleClick(test)"
          >
            {{ test.value }}
          </div>
        </div>
      </div>
      <div class="login">
        <template v-if="isAload === 'login'">
          <Sign />
        </template>
        <template v-else>
          <Register />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Register from './register.vue'
import Sign from './sign'
export default {
  name: 'Home',
  components: { Register, Sign },
  data() {
    return {
      msg: [
        { test: 'login', value: '登录', index: 0, click: true },
        { test: 'sign', value: '注册', index: 1, click: false }
      ],
      isAload: 'login',
      isClick: ''
    }
  },
  methods: {
    handleClick(item) {
      this.msg.map(it => {
        it.click = false
      })
      this.msg[item.index].click = true
      this.isAload = item.test
    }
  }
}
</script>

<style lang="less">
@import '../../style/global';

.mark {
  background: linear-gradient(#191c20, #24292e 15%);
}
.container {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/bg-login.svg');
  background-repeat: repeat-x no-repeat;
  background-position: center 0, 0 0, 0 0;
  .login-header {
    font-size: 28px;
    line-height: 60px;
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    height: 60px;
    .login-logo {
      width: 32px;
      height: 32px;
      float: left;
      margin: 5px 20px 0px;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .btngroup {
      width: 224px;
      display: flex;
      justify-content: center;
      margin: 10px 20px;
      float: right;
      .title {
        width: 100px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        border-radius: 5px;
        color: #67c23a;
        background: #f0f9eb;
        margin: 0 5px;
        cursor: pointer;
      }
      .handle {
        color: #f0f9eb;
        background: #67c23a;
      }
    }
  }
  .login {
    padding: @margin-large;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 460px;
    margin: -190px 0 0 -230px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  .el-form {
    margin-top: 22px;
  }
  .el-input__inner {
    background-color: rgba(255, 255, 255, 0.144);
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #c2e7b0;
    outline: 0;
  }
}
</style>
