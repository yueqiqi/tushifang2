// pages/k/k.js
Page({
x:function(){
  var pages = getCurrentPages();
  var curPages = pages[pages.length - 1].route
  var prevPage = pages[pages.length - 2]
  console.log(pages, curPages, prevPage)
  wx.navigateBack({
    success: function () {
      beforePage.onLoad(); // 执行前一个页面的onLoad方法
    }
  })
  this.setData({
    hidden:true
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    activeIdx:2,
    // 求职招聘
    arr1: [
      {
        name: "我要找工作",
        link: "/pages/Ac/jobs/jobs"
      },
      {
        name: "我要招人",
        link: "/pages/Ac/hiring/hiring"
      },
    ],
    // 工地信息
    arr2: [
      {
        name: "劳务分包",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "劳务输出",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "工地找车",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "我要出渣",
        link: "/pages/Ac/issue/issue"
      },
    ],
    // 渣场信息
    arr3: [
      {
        name: "政府收渣",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "园林收渣",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "房建收渣",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "工地收渣",
        link: "/pages/Ac/issue/issue"
      },
    ],
    // 买卖信息
    arr4: [
      {
        name: "二手租货",
        link: "/pages/Ac/issue/issue"
      },
      {
        name: "渣车出售",
        link: "/pages/Ac/issue/issue"
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})