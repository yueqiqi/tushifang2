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
    var province_and_city=item.provinces[item.value[0]].name+item.citys[item.value[1]].name+item.countys[item.value[2]].name
    this.setData({
      province_and_city
    });
    console.log(this.data.province, this.data.city, this.data.county);
  }
  ,
  onReachBottom: function () {
  },
  nono: function () { },
  formSubmit: function (e) {
    console.log(e.detail.value)
    console.log(this.data.checked)
    var that=this
    var e=e.detail.value
    console.log(this.data.checked)
    // ++++++++++++++添加地址++++++++++++++++++++++++++
    var uid=wx.getStorageSync('uid');
    var username=e.i1
    var phone=e.i2
    // var province_and_city=that.data.province+that.data.city+that.data.county
    var province_and_city=that.data.province_and_city
    var info=e.textarea
    var is_default
    if(that.data.checked==true){
      is_default=1
    }else{
      is_default=0
    }
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/personal/do_modify_address',
      data:{
        id:that.data.sid,
        uid,
        username,
        phone,
        province_and_city,
        info,
        is_default
      }
      }).then(res=>{
      console.log('调用修改地址成功',res)
      if(res.data.code==0){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          image: '',
          duration: 3500,
          mask: true,
          success: (result)=>{
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 2000);
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }else if(res.data.code==101){
        Dialog.alert({
          message: res.data.msg
        }).then(() => {
          // on close
        });
      }
      }).catch(err=>{
      console.log('调用失败')
    })
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
    // 联系人呢
    name:"某某某",
  // 电话号码
  phone:12345678912,
  // 地区
  add:"重庆市 江北区",
  //详细地址 
  adds:"生么路 什么号 几楼几杠几",
    // 设置默认
    checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // +++++++++++++++++修改地址+++++++++++++++++++++++
    console.log('接受地址兑换来的',options.id)
    var that=this
    that.setData({
      sid:options.id
    })
    request({
      url:'/home/personal/do_modify_addressinfo',
      data:{
        id:options.id
      }
      }).then(res=>{
      console.log('调用成功',res)
      var checked
      if(res.data.data.is_default==1){
        checked=true
      }else{
        checked=false
      }
      this.setData({
        name:res.data.data.username,
        phone:res.data.data.phone,
        province_and_city:res.data.data.province_and_city,
        adds:res.data.data.info,
        checked,
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // +++++++++++++++++修改地址+++++++++++++++++++++++
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