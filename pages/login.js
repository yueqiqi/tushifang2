const baseUrl='https://tsf.suipk.cn'
export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
    url:baseUrl+options.url,
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