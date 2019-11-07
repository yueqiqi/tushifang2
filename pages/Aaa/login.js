import request from '../login.js'
Page({
  data:{
    showDialog: false
  },

  // +++++++++++++++++++++++++++++++++++++获取用户信息+++++++++++++++++++++++++++
  show:function(){
    var that=this
    
    // +++++++++++++++++++++++获取
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            success(res) {
              console.log("获取用户信息成功", res)
              
              var u=res.userInfo
              // ++++++++++++++++++++++登录接口+++++++++++++++++++++++
              wx.login({
                timeout:10000,
                success: (res)=>{
                  var code=res.code
                  console.log('获取用户的code',code)
                  request({
                  url:'http://tsf.suipk.cn/home/Loginwx/get_openid',
                  data:{
                    code,
                  }
                  }).then(res=>{
                  console.log('获取用户的code',res)
                  var openid=res.data.data.openid
                  console.log('这是储存在数据的：',openid,'color:red')
                  wx.setStorageSync('openid', openid);
                  }).catch(err=>{
                  console.log('调用失败')
                  })
                },
                fail: ()=>{},
                complete: ()=>{}
              });
              // ++++++++++++++++++++++登录接口+++++++++++++++++++++++
              // ++++++++++++++++++++调用接口+++++++++++++++++++
              var openid=wx.getStorageSync('openid');
              var phone= wx.getStorageSync('userphone');
              console.log('%c','获取本地手机号码啊啊啊',phone)
              var pid=1
              var head=u.avatarUrl
              var addr=u.province+u.city
              var sex=u.gender
              var nickname=u.nickName
              console.log('这是获取数据中的：',openid,'color:green')
                request({
                  url:'http://tsf.suipk.cn/home/Loginwx/register',
                  data:{
                    openid,
                    pid,
                    head,
                    addr,
                    sex,
                    nickname,
                    phone
                  }
                  }).then(res=>{
                  console.log('调用注册123成功',res)
                  console.log('123')
                  console.log(res.data.data.id)
                  console.log('_________________________________________')
                  // console.log('获取用户id',)
                  // wx.setStorageSync('uid',uid);
                  that.setData({
                    showDialog: false
                  })
                  
                  }).catch(err=>{
                  console.log('调用失败')
                })
              // ++++++++++++++++++++调用接口+++++++++++++++++++


            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })


  },
  // +++++++++++++++++++++++++++++++++++++获取用户信息+++++++++++++++++++++++++++
  // +++++++++++++++++++++++++++++++++++++获取手机号+++++++++++++++++++++++++++
  getPhoneNumber:function(e){
    var that=this
    that.setData({
      showDialog: true
    });
    var openid=wx.getStorageSync('openid');
    console.log('按钮获取的iv',e.detail.iv)
    console.log('按钮获取的data',e.detail.encryptedData)
    this.setData({
      iv:e.detail.iv,
      encryptedData:e.detail.encryptedData
    })
    console.log('最后保存的信息',this.data.iv,this.data.encryptedData)
    // +++++++++++++++++++++++获取去手机号
    request({
    url:'http://tsf.suipk.cn/home/Loginwx/getWechatUserPhone',
    data:{
      openid,
      iv:that.data.iv,
      encryptedData:that.data.encryptedData
    }
    }).then(res=>{
    console.log('手机号获取',res)
    wx.setStorageSync('userphone', res.data.phoneNumber);
    }).catch(err=>{
    console.log('调用失败')
    })
  },

  // +++++++++++++++++++++++++++++++++++++获取手机号+++++++++++++++++++++++++++

err:function(){
  this.setData({
    showDialog: false
  })
},
















  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
})