// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR' // 必填
});
Page({
  data: {
    localCity: ""//本地城市
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
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
            let address=res.result.address
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
  }
})