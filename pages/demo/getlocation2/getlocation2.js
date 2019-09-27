// pages/demo/getlocation2/getlocation2.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
}); // 必填
Page({
  // 地理位置
  location:function(){
    let that = this;
    // 调用接口
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude//纬度
        var longitude = res.longitude//经度
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            let province = res.result.address_component.province;//省份
            let city = res.result.address_component.city;//城市
            let address = res.result.address
            that.setData({
              localCity: address
            })
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    })
  
    // // 实例化API核心类
    // qqmapsdk = new QQMapWX({
    //   key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
    // });
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     console.log(res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     // 调用接口转换成具体位置
    //     qqmapsdk.reverseGeocoder({
    //       location: {
    //         latitude: res.latitude,
    //         longitude: res.longitude
    //       },
          
    //       success: function (res) {
    //         var thta=this
    //         console.log(res.result.address)
    //         // wx.setStorageSync('address_component', res.result.addres)
    //         that.setData({
    //           location:res.result.address
    //         })
    //       },
    //       fail: function (res) {
    //       },
        
    //     })
    //   }
    // })

    //     // console.log(this.data.longitude)

  },
  // 用户信息
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  /**
   * 页面的初始数据
   */
  data: {
    localCity: "",//本地城市
    latitude:"",
    longitude:"",
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
location:"当前位置",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 获取地址
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    // console.log(res)
    //   }
    // })
    // wx.getLocation({
    //   success: function(res) {
    //     console.log(res);
    //   },
    // })
    // 用户信息
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })

    // 
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
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
  //   // 调用接口
  //   qqmapsdk.search({
  //     keyword: '酒店',
  //     success: function (res) {
  //       console.log(res);
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       console.log(res);
  //     }
  //   });
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