// pages/self/contact/contact.js
import request from '../../login.js'
Page({
  formSubmit:function(e){
    var e=e.detail.value
    console.log(e.textarea)
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/personal/do_contact_us',
      data:{
        uid,
      }
      }).then(res=>{
      console.log('调用联系我们成功',res)
      this.setData({
      
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  },
  call:function(){
    request({
      url:'/home/personal/do_service_tel',
      data:{
      
      }
      }).then(res=>{
      console.log('调用客服联系电话成功',res)
      wx.makePhoneCall({
        phoneNumber: res.data.data.value,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      }).catch(err=>{
      console.log('调用失败')
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

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