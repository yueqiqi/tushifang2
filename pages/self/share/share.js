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
      url:'/home/personal/do_user_integral',
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
    var uid=wx.getStorageSync('uid');
    var that=this
    var page = that.data.page
    page++
    that.setData({
      page,
    })
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
      })
      var uid=wx.getStorageSync('uid');
      request({
        url:'/home/personal/do_user_integral',
        data:{
          uid,
          page:that.data.page,
          limit:10
        }
        }).then(res=>{
        console.log('调用刷新最新发布成功',res)
        var count=res.data.count
        var all=that.data.users.length
        if (all==count) {
          wx.showToast({
            title: '暂无更多',
            icon: 'none',
          })
        }
        var goods = that.data.users.concat(res.data.list)     //message  为一进入页面请求完数据定义的集合
        that.setData({
          users:goods,
        })
        wx.hideLoading();
        }).catch(err=>{
        console.log('调用失败')
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})