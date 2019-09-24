// pages/store/affirm/affirm.js
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
Page({
close:function(){
  console.log("结算")
},
  /**
   * 页面的初始数据
   */
  data: {
    // 总额
    all:"",
    // 运费
    money:10,
    // /数量
    num:1,
    // 价格
    price:100,
    // 日期
    date:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      date: DATE,
    });
    var price=this.data.price
    var money=this.data.money
    this.setData({
      all:price+money
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