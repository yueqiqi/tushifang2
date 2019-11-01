
//app.js
App({
  // 全局对象
  /*
   *全局对象 
   */
  global:{
    token:"",
  },
  globalopenid:{
    openid:"",
  },
  onLoad:function(){
    // 隐藏原生的tabbar
    wx.hideTabBar();
  },
  onReady:function(){
    // 隐藏原生的tabbar
    wx.hideTabBar();
  },
  onLaunch: function () {
    // 隐藏原生的tabbar
    wx.hideTabBar();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /**
     * 从缓存中取出token
     */
    // const token=wx.getStorageSync("token")
    // 判断是否token有值
    // if(token&&token.length!==0){//已经有token，验证token是否过期
      // 验证token是否过期
      // console.log("直接从缓存中登录")
      // this.check_token(token)

    // }else{//没有token从新获取
      // console.log("进行了新的登录")
      this.login()
    // }
  },
    /**
     * 微信登录接口
     */
    login(){
      console.log("执行了登录操作")
      wx.login({
        // code只有5分钟时效
        success:(res)=>{
        const code=res.code;
        // 请求接口
        wx.request({
          url: 'http://tsf.suipk.cn/home/Loginwx/get_openid',
          data: {
            code,
          },
          method: 'POST',
          header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
          success: (res)=> {
            console.log("opendi",res)
            var m=res.data.data
            // var resb=JSON.parse(m)
            // console.log("1",resb)
            // 取出token
            // const token=res.data.token
            const openid=m.openid
            const sessionKey=m.session_key

            // 存储到全局global中
            // this.global.token=token
            // 储存在stroge中
            // wx.setStorageSync("token",token)   
            wx.setStorageSync("openid",openid)  
            wx.setStorageSync("sessionKey",sessionKey)  
            this.globalopenid.openid=openid 
          console.log('调用内存成功', res)
          console.log("===========================")
          // console.log(resb.openid)
          console.log("===========================")
        }, fail: ()=> {
          console.log('调用失败')
          }
        })
      }
    })
    },
  check_token(token){
    // var that=this
    // console.log("执行了验证token操作")
    // wx.request({
    //   url: 'http://tsf.suipk.cn',
    //   data: {
    //     token
    //   },
    //   method: 'POST',
    //   header: {
    //   'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     if(!res.data){
    //       console.log("token有效")
    //       that.global.token=token
    //     }else{
    //       that.login()
    //     }
    //   console.log('调用成功', res.data.data)
    //   }, fail: function () {
    //   console.log('调用失败')
    //   }
    // })

    // console.log(token)
    // wx.checkSession({
    //   success: (result)=>{
    //     console.log("验证session是否过期",result)
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },
    

    



    

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  globalData: {
    userInfo: null
  }
})