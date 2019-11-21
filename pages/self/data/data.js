// pages/self/data/data.js
import request from "../../login.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像
    img:"",
    // 昵称
    nickname:"",
    // 电话
    phone:"",
    // 认证
    pos:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    request({
    url:'/home/Personal/do_my_information',
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

})