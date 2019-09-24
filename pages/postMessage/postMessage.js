// pages/postMessage/postMessage.js
// var app = getApp()
Page({
  // 分享
  share:function(){
    console.log("分享")
  },
  // 评论
  comment:function(){
    console.log("评论")
  },
  // 点赞
  like: function () {
    var that = this
    this.setData({ index: that.data.index + 1 });
    console.log("点赞"); return
  },
  // 视频播放错误
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
      index:0,
      // 第二个发布者信息
      userImg2:[
        { url:"../images/carousel/05.JPg",},
        { url:"../images/carousel/06.JPg",}
      ],
      // 第一发布者信息
      userImg:[
        {
          url:"../images/carousel/05.JPg",
        },
        {
          url:"../images/carousel/06.JPg",          
        },
        {
          url:"../images/carousel/07.JPg"
        }
      ]
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