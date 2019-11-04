export default function like(options){
  return new Promise((resolve,reject) => {
    wx.request({
    url: 'http://tsf.suipk.cn/home/index/do_point',
    data:options.data,
    method: 'POST',
    header: {
    'content-type': 'application/x-www-form-urlencoded'
    },
    success:resolve,
    fail: reject,
    })
  })
}