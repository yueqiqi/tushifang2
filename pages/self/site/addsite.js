// pages/self/site/addsite.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
var model = require('../../../model/model.js')

var ashow = false;
var item = {};
import request from '../../login.js'
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'
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
    var that=this
    var e=e.detail.value
    console.log(this.data.checked)
    // ++++++++++++++添加地址++++++++++++++++++++++++++
    var uid=wx.getStorageSync('uid');
    var username=e.i1
    var phone=e.i2
    var province_and_city=that.data.province+that.data.city+that.data.county
    var info=e.textarea
    var is_default
    if(that.data.checked==true){
      is_default=1
    }else{
      is_default=0
    }
    // if(username==''&&phone==''&&province_and_city==''&&)
    request({
      url:'/home/personal/do_add_address',
      data:{
        uid,
        username,
        phone,
        province_and_city,
        info,
        is_default
      }
      }).then(res=>{
      console.log('调用添加地址成功',res)
      if(res.data.code==0){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          image: '',
          duration: 1500,
          mask: false,
          success: (result)=>{
            wx.navigateBack({
              delta: 1
            });
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }else if(res.data.code==101){
        console.log('123',res.data.msg)
        Dialog.alert({
          message: res.data.msg
        }).then(() => {
          // on close
        });
      }
      this.setData({
      
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // ++++++++++++++添加地址++++++++++++++++++++++++++
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
    thidden:false,
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
    this.setData({
      thidden:true
    })
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
    this.setData({
      thidden:false
    })
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
    this.setData({
      thidden:false
    })
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