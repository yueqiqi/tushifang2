import request from '../login.js'
Page({
x:function(){
  var pages = getCurrentPages();
  var curPages = pages[pages.length - 1].route
  var prevPage = pages[pages.length - 2]
  //console.log(pages, curPages, prevPage)
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
    info2:[],
    info:[],
    hidden:false,
    activeIdx:2,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_one_two",
      data:{
        code:"",
        msg:"",
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("获取菜单列表",res)
        // for(var q in that.data.info){}
        that.setData({
          info:res.data.data
        })
},fail:function(){
        //console.log("调用失败")
      }
    })
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