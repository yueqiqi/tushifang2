// pages/self/goup/goup.js
import request from '../../login.js';
Page({
  changetotal:function(e){
    console.log('绑定',e)
    var that=this
    var zz = e.currentTarget.dataset.num;
    var recharge_id=e.currentTarget.dataset.id
    console.log('选择的id',recharge_id)
    var s=that.data.userscore
    that.setData({
      num: zz,
      money:s[zz].money,
      up:s[zz].integral,
      recharge_id,
    })
  },
  // changeOil: function (e) {
  //   var that=this
  //   // console.log(e);
  //   var zz = e.currentTarget.dataset.num;
  //   that.setData({
  //     num: e.currentTarget.dataset.num,
  //   })
  //   if(zz==1){
  //     that.setData({
  //       money: 10,
  //       up: 10,
  //     })
  //   }else if(zz==2){
  //     that.setData({
  //       money: 29,
  //       up: 30,
  //     })
  //   }else if(zz==3){
  //     that.setData({
  //       money: 50,
  //       up: 60,
  //     })
  //   }else if(zz==4){
  //     that.setData({
  //       money: 100,
  //       up: 150,
  //     })
  //   }else{
  //     console.log("请选择")
  //   }
  //   console.log(e.currentTarget.dataset.num)
  // },
  // 充值
  next:function(){
    console.log(this.data.money+"元",this.data.up+"积分")

    /**
     * 充值信誉分
     */
    var that=this
    var recharge_id=that.data.recharge_id
    var uid=wx.getStorageSync('uid');
    var recharge_id
    request({
      url:'http://tsf.suipk.cn/home/pay/do_wxpay_recharge',
      data:{
        type:2,
        uid,
        recharge_id
      }
      }).then(res=>{
      console.log('调用充值信誉分成功',res)

      }).catch(err=>{
      console.log('调用失败')
    })
  },
// 点击金额变化
  
  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    // 充值积分
    up:0,
    // 充值金额
    money:0,
    // 剩余积分
    score:0,


    userscore:[
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 剩余积分
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/personal/do_mypoints',
      data:{
        type:2,
        uid,
      }
      }).then(res=>{
      console.log('调用剩余积分成功',res)
      this.setData({
        score:res.data.data.credit
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // 充值积分
    request({
      url:'http://tsf.suipk.cn/home/pay/do_recharge_list',
      data:{
        type:2,
      }
      }).then(res=>{
      console.log('调用充值积分成功',res)
      this.setData({
        userscore:res.data.data,
        recharge_id:res.data.data[0].id
      })
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