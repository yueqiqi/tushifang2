// pages/demo/like/like.js
Page({
  update_zan: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    var mid = data.mid;
    var cookie_mid = wx.getStorageSync('zan') || [];//获取全部点赞的mid  
    var isadd = 1;
    var newmessage = [];
    if (cookie_mid.includes(mid)) {//说明已经点过赞,取消赞  
      isadd = 0;
      var m = 0;
      for (var j in cookie_mid) {
        if (cookie_mid[j] != mid) {
          newmessage[m] = cookie_mid[j];
          m++
        }
      }
      wx.setStorageSync('zan', newmessage);//删除取消赞的mid  
    } else {
      cookie_mid.unshift(mid);
      wx.setStorageSync('zan', cookie_mid);//新增赞的mid  
    } 
    // 1
    wx.request({
      url: app.globalData.api.api_system,
      data: {
        action: 'zannum',
        mid: mid,
        isadd: isadd,
        wxid: app.globalData.wxid
      },
      method: 'GET',
      // header: {},   
      // /success
      success: function (res) {
        var message = that.data.message;
        // for
        for (var i in message) {
          if (isadd) {
            message[i].zan = parseInt(message[i].zan) + 1
          } else {
            message[i].zan = parseInt(message[i].zan) - 1
          }
          // for
        }
        // suc
        }
       
      // 1
    })
    that.setData({
      message: message
    }) 
// //////////////////
  },
data:{
  
}
 
})