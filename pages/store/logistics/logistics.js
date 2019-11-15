// pages/store/logistics/logistics.js
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
import request from '../../login.js'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    list:'',
    state:"",
    active:3,
    date:"",
    steps: [
      {
        text: '已签收 签收人：本人签收',
        desc: '2019.07.05 14:00'
      },
      {
        text: '【哪里哪里转运中心】已收入',
        desc: '描述信息'
      },
      {
        text: '已到达哪里哪里转运中心',
        desc: '描述信息'
      },
      {
        text: '快递公司某某某（13333333333）已揽件',
        desc: '描述信息'
      },
      {
        text: '快件已出库',
        desc: '描述信息'
      }
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收我的订单发来的参数
    console.log(options,options.order_id)
    // 向数组中添加数据
    // var DATE = util.formatTime(new Date());
    var that = this;
    // var steps=this.data.steps
    // for(var z in steps){
  // var up = "steps[" + z + "].desc";//先用一个变量，把(info[0].gMoney)用字符串拼接起来
  // that.setData({
  //   [up]: DATE
  //   })
  //   }
    /**
     * 物流接口
     */
    request({
      url:'http://tsf.suipk.cn/home/index/do_get_logistics',
      data:{
        order_id:options.order_id,
        // order_id:16,
      }
      }).then(res=>{
      console.log('调用物流接口成功',res)
      var res=res.data.data
        that.setData({
          // 快递图片
          img_url:res.img_url,
          // 订单号
          num:res.order_sn,
          // 物流编号
          list:res.LogisticCode,
          // 订单状态
          state:res.State,
          // 快递公司
          ShipperCode:res.ShipperCode,
          // 快递跟踪
          // steps:res.Traces
        })
      var ppp = res.Traces.map((item) => {
        return { text: item.AcceptStation, desc: item.AcceptTime }
        })
        that.setData({
          steps:ppp,
          active:ppp.length
        })
        console.log(ppp)
      }).catch(err=>{
      console.log('调用失败')
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