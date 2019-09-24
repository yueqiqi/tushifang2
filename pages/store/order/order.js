// pages/store/order/order.js
// 调用时间
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品总价
    orderPrice:498,
    freight:0,
    money:"",
    // 商品价钱
    price:"100.00",
    // 商品数量
    num:1,
    // 位置
    location:"重庆市 渝北区 某某大道999号华宇北城中央B区1栋9 - 5.6.7",
    // 时间
    currenTime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var currenTime = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      currenTime: currenTime
    });
    // var money=this.data.money;
    var orderPrice=this.data.orderPrice;
    var freight = this.data.freight;
    this.setData({
      money: orderPrice + freight
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