// 优质推荐
Page({
  tabgoto:function(e){
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    // var id=that.data.tabuser.id
    wx.navigateTo({
      url: '/pages/details/details?id='+id
    })
  },
  // 拨打电话
  callPhone:function(e){

  },
  // 分享
  tabShare: function (e) {
    // wx.showShareMenu({
      
    // })
    //console.log("分享")
  },
  // 评论
  tabComment: function (e) {
    //console.log("评论")
  },
  // 点赞
  tabLike: function (e) {
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    //console.log("这是第" + id + "个")
    // for(var i in this.data.user){
    var like = that.data.tabuser[id].index
    var index = "tabuser[" + id + "].index";
    that.setData({
      [index]: like +1
    })
   
    // }
    //console.log("这是点赞后的点赞数" + like)
  },
  /**
   * 页面的初始数据
   */
  data: {
    mm:"a",
      // 点赞个数
      index:0,
      // 第四个发布者信息 
      tabuser:[
      ],
      // 推荐是否隐藏
      hidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  推荐是否隐藏
    wx.hideShareMenu()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '转发',//弹出分享时显示的分享标题
      path: '/pages/index/index',//'/page/user?id=123' // 路径，传递参数到指定页面。
      desc: '分享页面的内容',
      success: function (res) { }

  }}
})