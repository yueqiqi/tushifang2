// pages/self/score/score.js
import request from '../../login.js';
Page({
  // 去充值
gup:function(){
  console.log("去充值")
  wx.navigateTo({
    url: '/pages/self/goup/goup2',
  })
},
// 邀请
ginv:function(){
  console.log("去邀请")
},
  /**
   * 页面的初始数据
   */
  data: {
    score:50,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var uid=wx.getStorageSync("uid");
    request({
      url:'/home/personal/do_mypoints',
      data:{
        type:2,
        uid
      }
      }).then(res=>{
      console.log('调用我的信誉分成功',res)
      this.setData({
        credit:res.data.data.credit
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
  onShareAppMessage: function (res) {
    var parent_id=wx.getStorageSync('uid');
    console.log('邀请',parent_id)
    return {
      title: '包程项',
      path: '/pages/body/body?parent_id='+parent_id,
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})