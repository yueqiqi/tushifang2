// pages/integrityMes/integrityMes.js
Page({
  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  //隐藏输入框
  onHideInput: function () {
    this.setData({
      showInput: false
    })
    console.log('hide+++++++++++')
  },
  // 分享
  share: function () {
    console.log("分享")
  },
  // 评论
  comment: function () {
    console.log("评论")
  },
  // 点赞
  like: function () {
    console.log("点赞")
  },
  /**
   * 页面的初始数据
   */
  data: {
    like:20,
    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
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