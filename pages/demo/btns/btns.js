// pages/demo/btns/btns.js
Page({
look:function(){
  console.log("查看物流")
},
remind:function(){
  console.log("提醒发货")
},
sure:function(){
  console.log("确认收货")
},
  /**
   * 页面的初始数据
   */
  data: {
    btns:[
      {
        btn:"查看物流",
        bind:"look",
      },
      {
        btn: "提醒发货",
        bind: "remind",
      },
      {
        btn: "确认收货",
        bind: "sure",
      },
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