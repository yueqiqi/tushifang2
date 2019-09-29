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
    wx.navigateTo({
      url: '/pages/demo/new/index/cehngxin',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

    icon: [
      {
        link: "/pages/site/site",
        url: "/pages/images/icon/icon1.png",
        name: "工地找车"
      },
      {
        link: "/pages/site/site",
        url: "/pages/images/icon/icon2.png",
        name: "车找工地"
      },
      {
        link: "/pages/site/site",
        url: "/pages/images/icon/icon3.png",
        name: "工地除渣"
      },
      {
        link: "/pages/site/site",
        url: "/pages/images/icon/icon4.png",
        name: "求职招聘"
      },
      {
        link: "/pages/site/site",
        url: "/pages/images/icon/icon5.png",
        name: "二手设备"
      },
    ],
    icon02: [
      {
        link: "/pages/Ac/index/inex",
        url: "/pages/images/icon/icon6.png",
        name: "免费认证"
      },
      {
        link: "/pages/Ac/post/post",
        url: "/pages/images/icon/icon7.png",
        name: "发布信息"
      },
      {
        link: "../index/index",
        url: "/pages/images/icon/icon8.png",
        name: "渣场信息"
      },
      {
        link: "../index/index",
        url: "/pages/images/icon/icon9.png",
        name: "我的名片"
      },
      {
        link: "/pages/integrity/integrity",
        url: "/pages/images/icon/icon10.png",
        name: "诚信榜"
      }
    ],
  },

})