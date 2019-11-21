// pages/postMessage/postMessage.js
// var app = getApp()
Page({
  // 跳转
  goto:function(){
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
  
  // 分享
  share: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("这是第"+id+"分享")
  },
  // 评论
  comment:function(e){
    var id = e.currentTarget.dataset.id
    console.log("这是第" + id +"评论")
  },
  // 点赞
  like: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log("这是第"+id+"个")
    // for(var i in this.data.user){
    var like=that.data.user[id].index
    var index="user[" + id + "].index";
    that.setData({
      [index]:like+1
    })
    // }
    console.log("这是点赞后的点赞数"+like)
    console.log("点赞"); 
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
    // =============================
    user:[
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.login({
  success:res=>{
  console.log(res)

  }
})
  wx.getUserInfo({
    success:res=>{
      console.log(res)
    }
  })
  },


//  =============================================================================================================
})