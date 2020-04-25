<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="sign-ruleForm"
  >
    <el-form-item label="用户名：" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
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
export default {
  data() {
    var loginSign = false
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      loginSign,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'post',
            url: 'http://127.0.0.1:7001/login',
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
.sign-ruleForm {
  .el-form-item__label {
    color: #fff;
  }
  .el-input {
    width: 80%;
  }
}
</style>
