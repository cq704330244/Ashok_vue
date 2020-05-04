import https from '../utils/ajax.js'

export function getList(data) {
  return https.post('/home/tablistQuery', data)
}
