// pages/demo/new/jifen.js
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
    wx.switchTab({
      url: '/pages/body/body',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    activeIdx: 4,
    self: [
      {
        img: "../../images/ico/i1.png",
        link: "/pages/self/data/data",
        til: "我的资料"
      },
      {
        img: "../../images/ico/i2.png",
        link: "/pages/index/index",
        til: "我的发布"
      },
      {
        img: "../../images/ico/i3.png",
        link: "/pages/self/total/total",
        til: "我的积分"
      },
      {
        img: "../../images/ico/i4.png",
        link: "/pages/self/score/score",
        til: "我的信誉分"
      },
      {
        img: "../../images/ico/i5.png",
        link: "/pages/self/site/site",
        til: "我的地址"
      },
      {
        img: "../../images/ico/i6.png",
        link: "/pages/store/classify/classify",
        til: "我的订单"
      },
      {
        img: "../../images/ico/i7.png",
        link: "/pages/index/index",
        til: "分享好友"
      },
      {
        img: "../../images/ico/i8.png",
        link: "/pages/self/contact/contact",
        til: "联系我们"
      },
      {
        img: "../../images/ico/i9.png",
        link: "/pages/self/ewm/ewm",
        til: "我的二维码"
      },
      {
        img: "../../images/ico/i10.png",
        link: "/pages/self/card/card",
        til: "我的名片"
      },
      {
        img: "../../images/ico/i11.png",
        link: "/pages/interest/interest",
        til: "我的兴趣"
      },
    ]
  },

})