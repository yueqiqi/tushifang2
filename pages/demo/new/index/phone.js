// pages/demo/new/index/phone.js
Page({
  close: function () {
    wx.switchTab({
      url: '/pages/body/body',
    })
    console.log("關閉弹窗")
  },
  // 上一步
  up: function () {
    wx.navigateBack({

    })
  },
  // 下一步
  next: function () {
    wx.navigateTo({
      url: '/pages/demo/new/index/fabu',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 第一发布者信息
    userImg: [
      {
        url: "/pages/images/carousel/05.JPg",
      },
      {
        url: "/pages/images/carousel/06.JPg",
      },
      {
        url: "/pages/images/carousel/07.JPg"
      }
    ]
  },

 
})