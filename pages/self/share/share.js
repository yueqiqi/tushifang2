import request from '../../login'
Page({
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    radio:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 积分分享列表
     */
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/personal/do_user_integral',
      data:{
        uid,
        page:1,
        limit:10
      }
      }).then(res=>{
      console.log('调用好友列表成功',res)
      this.setData({
        users:res.data.list
      })
      }).catch(err=>{
      console.log('调用失败')
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