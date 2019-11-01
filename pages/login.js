export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
    url: options.url,
    data: options.data,
    method: 'POST',
    header: {
    'content-type': 'application/x-www-form-urlencoded'
    },
    success:resolve,
    fail: reject,
    })
  })
}