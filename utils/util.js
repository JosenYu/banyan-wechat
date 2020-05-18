const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 请求数据
 * @param {String} url 地址
 * @param {String} method 请求方法
 * @param {Object} data 请求数据
 * @param {Function} cb 成功回调
 */
const request = (url = '', method = 'get', data, cb) => {
  let BASE_URL = 'http://10.0.0.32:3000'
  wx.getSystemInfo({
    success: function (res) {
      //开发环境
      res.platform === 'devtools' ? BASE_URL = 'http://10.0.0.32:3000' : BASE_URL = 'http://funjosen.fun:3000'
    }
  })
  wx.request({
    url: BASE_URL + url,
    method: method,
    data: data,
    success(res) {
      cb(res)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  request: request
}
