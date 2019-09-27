// pages/demo/like2/like2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 点赞
  dianzan: function (event) {
    // var zzz = echo input('server.REQUEST_SCHEME'). '://'.input('server.SERVER_NAME');
    var that = this;
    // console.log(id);
    // console.log(app.globalData.userInfo);
    // 已经授权---执行点赞
    console.log('点赞中获取number' + that.data.number);
    var liked_num = that.data.liked_num;

    // console.log("点击了同意授权");
    var that = this
    wx.request({
      url: 'https://xxxxx/video/like',
      data: {
        id: that.data.id,
        number: that.data.number
      },

      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          msg: res.data.msg
        })
        // that.changeData();
        console.log(res.data.msg)
        if (res.data.msg == '点赞成功') {
          that.setData({
            liked: 1,
            favor_img: "../../images/like.png",
            liked_num: liked_num + 1
          })

        } else {
          that.setData({
            liked: 0,
            favor_img2: "../../images/unlike.png",
            liked_num: liked_num - 1
          })
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1500
        })
      }
    })

  }
 

  
})