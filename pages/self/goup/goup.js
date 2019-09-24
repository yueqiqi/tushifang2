// pages/self/goup/goup.js
Page({
  changeOil: function (e) {
    var that=this
    // console.log(e);
    var zz = e.currentTarget.dataset.num;
    that.setData({
      num: e.currentTarget.dataset.num,
    })
    if(zz==1){
      that.setData({
        money: 10,
        up: 10,
      })
    }else if(zz==2){
      that.setData({
        money: 29,
        up: 30,
      })
    }else if(zz==3){
      that.setData({
        money: 50,
        up: 60,
      })
    }else if(zz==4){
      that.setData({
        money: 100,
        up: 150,
      })
    }else{
      console.log("请选择")
    }
    console.log(e.currentTarget.dataset.num)
  },
  // 充值
  next:function(){
    console.log(this.data.money+"元",this.data.up+"积分")
  },
// 点击金额变化
  
  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    // 充值积分
    up:10,
    // 充值金额
    money:10,
    // 剩余积分
    score:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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