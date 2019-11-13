// pages/self/score/score.js
import request from '../../login.js'
Page({
/**
 * 获取用户输入的值
 */
setValue:function(e){
  console.log('用户输入得值',e)
  this.setData({
    phone:e.detail.value
  })
},
/**
 * 点击取消
 */
cancel:function(){
  this.setData({
    alert:false
  })
},
/**
 * 点击确定
 */
confirm:function(){
  console.log(this.data.phone)
},
/**
 * 输入电话号码转出积分
 */
out:function(){
  console.log('转出积分')
  this.setData({
    alert:true
  })
},


  // 下拉
  // 点击下拉显示框

  selectTap(e) {
    this.setData({
      selectShow: !this.data.selectShow
    });
    // console.log(e)
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
    })
    // if(Index!=0){
    //   this.setData({
    //     img:"img"
    //   })
    // }
    if(Index==1){
      // 转出积分调用微信扫一扫二维码
        var _this = this;
        wx.scanCode({
          success: (res) => {
          }
        })
    }
    console.log(this.data.isDisabled)
  }, 
  // 去充值
  gup: function () {
    console.log("去充值")
    wx.navigateTo({
      url: '/pages/self/goup/goup',
    })
  },
  // 邀请
  ginv: function () {
    console.log("去邀请")
  },
  /**
   * 页面的初始数据
   */
  data: {
    alert:false,
    phone:"",
    // img:"",
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['换积分', '转出积分', '转入积分'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    score: 50,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var uid=wx.getStorageSync("uid");
    request({
      url:'http://tsf.suipk.cn/home/personal/do_mypoints',
      data:{
        type:1,
        uid
      }
      }).then(res=>{
      console.log('调用我的积分成功',res)
      this.setData({
        integral:res.data.data.integral
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