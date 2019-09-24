// pages/informmation/recruitment/recruitment.js
// 调用时间
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
Page({
  
  // 分享
  share:function(){
    console.log("分享")
  },
  comment:function(){
    console.log("评论")
  },
  like:function(){
    var that = this
    this.setData({ like: that.data.like + 1 });
    console.log("点赞");return
  },
  // 视频播放错误
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  // 招人才跳转
  gotoPeople: function () {
    wx.navigateTo({
      url: '../peopledetail/peopledetail',
    })
  },
  // 跳转详情页
  goto:function(){
    wx.navigateTo({
      url: '../jobdetail/jobdetail',
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 搜索跳转
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 点赞
    like:20,
    // 发布图片
    muskImg:[
      {
        url:"../../images/carousel/02.jpg"
      },
      {
        url:"../../images/carousel/03.jpg",
      },
      {
        url:"../../images/carousel/04.jpg",
      }
    ],
    // 时间
    currenTime: "",
    // 
    currentData: 0,
    // 分类
    index:0,
    dates: '2019-9-10',
    objectArray: ['重庆', '成都', '上海', '浙江', '深圳'],
    // 轮播图片
    imgUrls: [
      {
        link: "../../index/index",
        url: '../../images/carousel/02.jpg',
      },
      {
        link: "../../body/body",
        url: '../../images/carousel/03.jpg',
      },
      {
        link: "../../demo/demo",
        url: '../../images/carousel/04.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 4000,
    duration: 500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var currenTime = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      currenTime: currenTime
    });
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