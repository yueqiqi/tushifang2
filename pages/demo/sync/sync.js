// pages/demo/sync/sync.js
Page({
  next:function(){
    wx.navigateTo({
      url: '/pages/demo/sync/getstorage',
    })
  },
  // // 刷新页面
  res:function(){
      wx.startPullDownRefresh({
        
      })
  },
  // 清除缓存
  rem:function(){
    wx.removeStorage({
      key:"name",
      success(res){
        console.log(res)
        console.log("删除成功")
      }

    })
  },
  // 
suc:function(e){
  // console.log(e)
  var obj=e.detail.value
  console.log(obj)
var that=this
var updata=that.data.namezxc
that.data.namezxc.push(obj);
console.log(updata)

 wx.setStorage({
   key: 'name',
   data: updata ,
 })
 this.onLoad()
},
  /**
   * 页面的初始数据
   */
  data: {
    namezxc:[
      // {
      //  name:"陈孝林",
      //  age:21,
      //  post:"前端", 
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log("登陆缓存" + res.data)
        that.setData({
          namezxc: res.data
        })
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
console.log("储存的数据"+this.data.namezxc)
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