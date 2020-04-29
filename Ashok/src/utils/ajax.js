import axios from 'axios'

const getFile = axios.create({
  headers: {
    'Content-Type': 'application/json; application/octet-stream'
  },
  responseType: 'blob'
})
// import qs from 'qs'

// axios.defaults.withCredentials = true

const baseUrl = 'http://127.0.0.1:7001'

// if (process && process.env && process.env.NODE_ENV === 'production') {
// baseUrl = 'http://repository-viewer.dockerlab.alipay.net' // 线上环境
// } else {
// baseUrl = 'http://repository-viewer.dockerlab.alipay.net' // 开发环境
// }

const https = {
  post: (url, body, options) =>
    axios
      .post(baseUrl + url, body)
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleError(err)
      }),
  get: (url, params) =>
    axios
      .get(baseUrl + url, {
        ...params,
        params
      })
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleError(err)
      }),
  getFile: (url, params) =>
    getFile
      .get(url)
      .then(res => {
        try {
          let blob = new Blob([res.data])
          let link = document.createElement('a')
          let evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', false, false)
          link.href = URL.createObjectURL(blob)
          link.download = `${params.name}.${params.type}`
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(link.href)
          return true
        } catch (error) {
          return Promise.reject(res.data)
        }
      })
      .catch(err => {
        return handleError(err)
      })
}

const handleSuccess = ({ data, config }) => {
  if (!data.success) {
    return Promise.reject(data)
  }
  return data
}

const handleError = err => {
  return Promise.reject(err)
}

export default https
