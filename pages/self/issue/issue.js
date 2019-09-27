// pages/self/issue/issue.js
Page({
  up:function(){
    
  },
  // 改为正在进行
  upfin:function(){
    this.setData({
      ing2:"已完成",
      btn:"已完成"
    })
    if(this.data.btn=="已完成"){
      this.setData({
        ch:"font-size:28rpx;font-family: PingFang SC;font-weight: 500;color: rgba(245, 121, 0, 1);"
      })
    }
  },
  // 我要发布跳转
  iss:function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  // 搜索跳转
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 改为正在进行
    btn:"改为已完成",
    // 正在进行
    ing:"正在进行",
    ing2:"正在进行",
    // 样式
    ch: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.ing=="已完成"){
      this.setData({
        ch:1
      })
    }
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