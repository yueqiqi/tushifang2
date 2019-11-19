import request from '../../login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
  },
ewm(){
  var id=wx.getStorageSync('uid');
  request({
    url:'/home/Loginwx/do_sendcode',
    data:{
      id,
    }
    }).then(res=>{
    console.log('获取二维码 成功',res)
    this.setData({
      img:res.data.data
    })
    }).catch(err=>{
    console.log('调用失败')
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ewm()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: '包程项',
        path: '/pages/interest/interest',
        imageUrl:this.data.img //不设置则默认为当前页面的截图
      }
    }
  }
})