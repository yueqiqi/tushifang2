// pages/self/data/data.js
import request from "../../login.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像
    img:"../../images/carousel/03.jpg",
    // 昵称
    nickname:"微信用户名",
    // 电话
    phone:"13500000000",
    // 认证
    pos:"我是司机"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    request({
    url:'http://tsf.suipk.cn/home/Personal/do_my_information',
    data:{
      uid,
    }
    }).then(res=>{
    console.log('调用我的资料成功',res)
    if(res.data.data.role==1){
      res.data.data.role="企业"
    }else if(res.data.data.role==2){
      res.data.data.role="司机"
    }else if(res.data.data.role==3){
      res.data.data.role="个人"
    }else {
      res.data.data.role="未认证"
    }
    this.setData({
      img:res.data.data.head,
      nickname:res.data.data.nickname,
      phone:res.data.data.phone,
      pos:res.data.data.role
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