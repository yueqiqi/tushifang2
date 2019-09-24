// pages/Ac/jobs/jobs.js
Page({
  formSubmit:function(e){
    console.log(e.detail.value)
    var m = e.detail.value
    console.log(e.detail.value);
    if (m.i1 == "" || m.i2 == "" || m.i3 == "" || m.i4 == "" || m.i5 == "" || m.i6==""||m.textarea.length==0) {
      this.hidePopup(false);
    } else {
      this.suhide(false);
    }
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
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