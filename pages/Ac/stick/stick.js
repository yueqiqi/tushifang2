// pages/demo/calert/calert.js
Page({
  // /////////////////////////////////////////////////////////////////////
  /* 隐藏弹窗 */
  nsuhide(flag = true) {
    this.setData({
      "nsup": flag
    });
  },
  /* 显示弹窗 */
  nsushow() {
    this.nsuhide(false);
  },
  // /////////////////////////////////////////////////////////////////////
  // 时间分类
  // 结束
  ebindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      edates: e.detail.value
    })
  },
  // 开始
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 第二个单选
  seonChange(e) {
    this.setData({
     seradio: e.detail
    });
    console.log(e.detail)
  },
  // 单选框
  sonChange(e) {
    this.setData({
      sradio: e.detail
    });
    console.log(e.detail)
  },
  /* 隐藏弹窗 */
  sssuhide() {
    this.setData({
      "sssup": true
    });
    console.log("隐藏弹框")
    var zzz=this.data
    // console.log(zzz.sradio,zzz.seradio,zzz.dates,zzz.edates)
    if (zzz.sradio == 0, zzz.dates=="请选择开始时间",zzz.edates=="请选择结束时间"){
      this.nsushow()
    }
  },
  /* 显示弹窗 */
  ssushow() {
   console.log("显示弹框")
    this.setData({
      "sssup":false
    })
    
  },

  /**
   * 页面的初始数据
   */
  data: {
    // 错误提示
    nsup: true,
    // 消耗积分
    int:100,
    // 时间分类
    index: 0,
    dates: '请选择开始时间',
    edates: '请选择结束时间',
    sssup: true,
    // 单选框
    sradio: '0',
    seradio: '1'
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