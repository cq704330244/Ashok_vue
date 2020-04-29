'use strict'
/*
验证账号格式
*/
export function usernameReg(str) {
  var reg = /^([0-9A-Za-z.]+)@([0-9a-z]+\.[a-z]{3}(\.[a-z]{2})?)$/g
  return !reg.test(str)
}
/*
验证密码格式
*/
export function passwordReg(str) {
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
  return !reg.test(str)
}
