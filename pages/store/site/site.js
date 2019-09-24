// pages/store/site/site.js
Page({
  add:function(){
    console.log("添加收货地址")
    

  },
  mm: function (e) {
    var zz = e.currentTarget.dataset.index
    var d = this.data.defa
    console.log(d[zz])
    d[zz].nom = "aa"
  },
  /**
   * 页面的初始数据
   */
  data: {
    defa:[
      {
        name:"用户名",
        phone:13333333333,
        def:"默认",
        sit:"重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
        nom:"aa"
      },
      {
        name: "用户名",
        phone: 13333333333,
        def: "默认",
        sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
        nom:""
      },
      {
        name: "用户名",
        phone: 13333333333,
        def: "默认",
        sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
        nom:""
      },
    ],
    // def:"默认",
    // nom:"",
    // sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几 a"
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