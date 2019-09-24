// pages/demo/calert/calert.js
Page({
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
  eonChange(e) {
    this.setData({
      eradio: e.detail
    });
    console.log(e.detail)
  },
  // 单选框
  onChange(e) {
    this.setData({
      radio: e.detail
    });
    console.log(e.detail)
  },
  /* 隐藏弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  /* 显示弹窗 */
  sushow() {
    this.suhide(false);
  },

  /**
   * 页面的初始数据
   */
  data: {
    // 消耗积分
    int:100,
    // 时间分类
    index: 0,
    dates: '请选择开始时间',
    edates: '请选择结束时间',
    sup: true,
    // 单选框
    radio: '1',
    eradio: '1'
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