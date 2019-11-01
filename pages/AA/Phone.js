// pages/AA/Phone.js
Page({
  /**
 * 控制 pop 的打开关闭
 * 该方法作用有2:
 * 1：点击弹窗以外的位置可消失弹窗
 * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
 */
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  getPhoneNumber(e){
    var that = this
    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
    console.log(iv,encryptedData)
          this.setData({
            showDialog:!this.data.showDialog
          })
        },
  get:function(){

  },
      // getPhoneNumber: function(e) {
      //   var iv = e.detail.iv
      //   var encryptedData = e.detail.encryptedData
      //   console.log("1",iv, encryptedData)
      //   var sessionKey=wx.getStorageSync("sessionKey")
      //   var openid=wx.getStorageSync("openid")
      //   console.log("获取se和open",sessionKey,openid)
      //   console.log(e.detail.errMsg)
      //   if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      //     wx.showModal({
      //       title: '提示',
      //       showCancel: false,
      //       content: '未授权',
      //       success: function(res) {}
      //     })
      //   } else {
      //     wx.login({
      //       success: function(res) {
      //         var code = res.code;
      //         if (res.code) {
      //           //发起网络请求  
      //           console.log(res.code)
      //         } else {
      //           console.log('获取用户登录态失败！' + res.errMsg)
      //         }
      //         wx.showModal({
      //           title: '提示',
      //           showCancel: false,
      //           content: '同意授权',
      //           success: function(res) {
      //             var that = this;
      //             console.log(123)
      //             wx.request({
      //               url: "http://tsf.suipk.cn/home/Loginwx/getWechatUserPhone",
      //               data: {
      //                 sessionKey,
      //                 openid,
      //                 iv: e.detail.iv,
      //                 encryptedData: e.detail.encryptedData
      //               },
      //               method: 'post',
      //               header: {
      //                 'content-type': 'application/x-www-form-urlencoded'
      //               },
      //               success: function(res) {
      //                 wx.setStorageSync('user', res.data.data);
      //                 if (res.data.code == "200") {
      //                   console.log(res.data.data)
      //                   wx.showToast({
      //                     title: '一键绑定成功',
      //                     icon: 'success',
      //                     duration: 2000,
      //                     success: function() {
      //                       wx.switchTab({
      //                         url: '/pages/index/index'
      //                       });
      //                     }
      //                   })
      //                 } else {
      //                   wx.showModal({
      //                     title: '提示',
      //                     content: '一键绑定失败，请重新尝试',
      //                     success: function(res) {
      //                       if (res.confirm) {
      //                         console.log('用户点击确定')
      //                       } else if (res.cancel) {
      //                         console.log('用户点击取消')
      //                       }
      //                     }
      //                   })
      //                 }
      //               },
      //             });
      //           }
      //         })
      //       }
      //     });
      //   }
      //   },
        /**
         * 页面的初始数据
         */
        data: {
          showDialog: false
          },

          /**
           * 生命周期函数--监听页面加载
           */
          onLoad: function(options) {

          },

          /**
           * 生命周期函数--监听页面初次渲染完成
           */
          onReady: function() {

          },

          /**
           * 生命周期函数--监听页面显示
           */
          onShow: function() {

          },

          /**
           * 生命周期函数--监听页面隐藏
           */
          onHide: function() {

          },

          /**
           * 生命周期函数--监听页面卸载
           */
          onUnload: function() {

          },

          /**
           * 页面相关事件处理函数--监听用户下拉动作
           */
          onPullDownRefresh: function() {

          },

          /**
           * 页面上拉触底事件的处理函数
           */
          onReachBottom: function() {

          },

          /**
           * 用户点击右上角分享
           */
          onShareAppMessage: function() {

          }
      })