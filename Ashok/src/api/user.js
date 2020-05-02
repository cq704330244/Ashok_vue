import https from '../utils/ajax.js'

export function userLogin(data) {
  return https.post('/login', data)
}
