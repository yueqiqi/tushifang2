// pages/self/site/addsite.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
var model = require('../../../model/model.js')

var ashow = false;
var item = {};
Page({
  // /获取地理位置
  getlocation: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        let province = res.result.address_component.province;//省份
        let city = res.result.address_component.city;//城市
        let district = res.result.address_component.district
        that.setData({
          location: province + city + district
        })
      },
    })
  },
  ////
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  //////
  formSubmit:function(e){
    console.log(e.detail.value)
    console.log(this.data.checked)
  },
  // 是否设置默认
  onChange(event) {
    this.setData({
      checked: event.detail
    });
    console.log(this.data.checked)
  },
  /**
   * 页面的初始数据
   */
  data: {
    item: {
      ashow: ashow
    },
    // ///////////////////////////////////////
    show: false,
    // 是否隐藏
    hidden: false,
    // 地址
    location: "",
    province: "",
    // 设置默认
    checked: false,

  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()

  },
  //更新顶部展示的数据
  updateShowData: function (e) {
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
    console.log(this.data.province, this.data.city, this.data.county);
  }
  ,
  onReachBottom: function () {
  },
  nono: function () { },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
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