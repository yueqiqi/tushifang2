// pages/AA/getphone.js
// var common = require("./login.js")
Page({
  bindGetUserInfo(res) {
    console.log(res);
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
    } else {
      console.log("点击了拒绝授权");
    }
  },
  get2:function(){
    wx.openSetting({
      success:function(res){
        console.log("打开设置",res)
      }
    })
  },
  get: function () {
    wx.getSetting({
      success:function(res){
        console.log("获取用户授权",res)
          wx.getUserInfo({
            success: function (res) {
              console.log("接口" + res)
              // var userInfo = res.userInfo
              // var nickName = userInfo.nickName
              // var avatarUrl = userInfo.avatarUrl
              // var gender = userInfo.gender //性别 0：未知、1：男、2：女
              // var province = userInfo.province
              // var city = userInfo.city
              // var country = userInfo.country
            }
          })
      },fail:function(){
        console.log("授权失败")
      }
    })



    

  },
  data:{
    phone:"",
    code:"",
  },
  catch:function(){
    var that=this
    wx.login({
      success(res) {
        console.log("小程序",res)
        wx.request({
          url: 'http://tsf.suipk.cn/home/Loginwx/get_openid',
          data: {
            code:res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            console.log("后台",res)
          },fail:function(){
            console.log("后台获取失败")
          }
        })
        // that.setData({
        //   code:res.data
        // })
      },fail:function(){
        console.log("获取去用户code失败")
      }
    })
  },
  send:function(){
    var that=this
     //发起网络请求
     wx.request({
      url: 'http://tsf.suipk.cn/home/Loginwx/get_openid',
      data: {
        code:that.data.code
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log("后台",res)
      },fail:function(){
        console.log("后台获取失败")
      }
    })
  },
  getPhoneNumber(res){
    console.log(res)
    this.setData({
      phone:res
    })
    console.log(this.data.phone)
  },
  onLoad:function(){
    var that=this
    // console.log(common)
    
  },
 
})