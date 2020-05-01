<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="register-ruleForm"
  >
    <el-form-item label="用户名：" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password="true"></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        autocomplete="off"
        show-password="true"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submitForm('ruleForm')">注册</el-button>
      <el-button type="success" plain @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { usernameReg, passwordReg } from '../.././utils/utils.js'
export default {
  data() {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [{ trigger: 'blur', validator: validatename }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'post',
            url: 'http://127.0.0.1:7001/sign',
            data: this.ruleForm
          }).then(res => {
            console.log(res)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.register-ruleForm {
  .el-form-item__label {
    color: #fff;
  }
  .el-input {
    width: 80%;
  }
}
</style>
