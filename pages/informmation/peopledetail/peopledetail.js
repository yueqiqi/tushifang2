// pages/informmation/peopledetail/peopledetail.js
Page({
  // 分享
  share:function(){
    console.log("分享")
  },
  // 点赞
  like:function(){
    var that = this
    this.setData({ like: that.data.like + 1 });
    console.log("点赞"); return
  },
  // 举报
  report:function(){
    console.log("举报")
  },
  // 名片
card:function(){
  console.log("名片")
},
  /**
   * 页面的初始数据
   */
  data: {
    // 点赞
    like:20,
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