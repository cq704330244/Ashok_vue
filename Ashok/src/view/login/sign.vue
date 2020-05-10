<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="sign-ruleForm"
  >
    <el-form-item label="用户名：" prop="name">
      <el-input
        type="test"
        autocomplete="off"
        v-model="ruleForm.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
        @keyup.native.enter="keyUp('ruleForm')"
        :show-password="bool"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="success"
        @click="submitForm('ruleForm')"
        :disabled="loginSign"
        >登录</el-button
      >
      <el-button type="success" plain @click="resetForm('ruleForm')"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex'
import { userLogin } from '../../api/user.js'
import { usernameReg, passwordReg } from '../.././utils/utils.js'

export default {
  data() {
    var loginSign = false
    var validatename = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (usernameReg(value)) {
        callback(new Error('请输入正确的邮箱名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (passwordReg(value)) {
        callback(new Error('密码：8-16位，包含大/小写字母及数字'))
      } else {
        callback()
      }
    }
    return {
      bool: true,
      loginSign,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          {
            trigger: 'blur',
            validator: validatename
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations({
      storeUser: 'storeUserInfo'
    }),
    submitForm(formName) {
      const that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          userLogin(this.ruleForm)
            .then(res => {
              that.storeUser(res.date)
              sessionStorage.setItem('admin', true)
              sessionStorage.setItem('userInfo', JSON.stringify(res.date))
              this.$router.push({ path: '/home' })
            })
            .catch(err => {
              this.$message.error(err.toString())
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    keyUp(value) {
      this.submitForm(value)
    }
  }
}
</script>

<style lang="less">
.sign-ruleForm {
  .el-form-item__label {
    color: #fff;
  }
  .el-input {
    width: 80%;
  }
}
</style>
