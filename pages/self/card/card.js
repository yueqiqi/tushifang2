// pages/self/card/card.js
Page({
  // 查看名片夹
  mycard:function(e){
    console.log(e)
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/self/mycard/mycard?id='+id,
    })
  },
  // 完善我的名片
btn:function(){
  wx.navigateTo({
    url: '/pages/self/card/perfect',
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    // 名片夹
    mycard:[
      {
       id:0,
        // 头像
        head: "/pages/images/carousel/03.jpg",
       // 姓名
        cardname:"用户姓名",
      // 职位
      post:"职位",
      // 公司名称
      com:"公司名称",
      // 时间
      time:"2019.08.25"
      }
    ],
    // 时间
    time:"2019.08.26",
    // 公司名称
    com:"公司名称",
    // 职位
    post:"职位",
    // 头像
    head:"../../images/carousel/03.jpg",
    // 用户昵称
    name:"用户昵称",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)
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