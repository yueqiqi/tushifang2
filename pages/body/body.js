// pages/body/body.js
// import postMessage from '../postMessage/postMessage.js';
// var app = getApp()
Page({
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 面板
  // 拨打电话
  callPhone: function () {

  },
  // 分享
  tabShare: function () {
    console.log("分享")
  },
  // 评论
  tabComment: function () {
    console.log("评论")
  },
  // 点赞
  tabLike: function () {
    var that = this
    this.setData({ index: that.data.index + 1 });
    console.log("点赞"); return
  },//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 右边大标题
  titleRight: function () {
    console.log("这是右边大标题")
  },
  // 左上角小标题
  titleLeftTop: function () {
    console.log("这是左上角标题")
  },
  // 右下角小标题
  titleLeftBottom: function () {
    console.log("这是右下角标题")
  },
////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 分享
  share: function () {
    console.log("分享")
  },
  // 评论
  comment: function () {
    console.log("评论")
  },
  // 点赞
  like: function () {
    var that = this
    this.setData({ index: that.data.index + 1 });
    console.log("点赞"); return
  },
  // 视频播放错误
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * 页面的初始数据
   */
  // 公告下方图片跳转
  imgLink:function(e){
    wx.navigateTo({
      url: '/pages/index/index',
    })
      console.log(e)
  },
  // 公告
  hot:function(){
    wx.navigateTo({
      url: "/pages/index/index",
    })
  },
  // 搜索跳转
  search:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
// 信息跳转
message:function(){
  wx.navigateTo({
    url: "/pages/index/index",
  })
},

  data: {
    // 面板
    mm: "a",
    // 点赞个数
    index: 0,
    // 第一个发布者图片
    tabUserImg: [
      { src: "../images/carousel/05.jpg" },
      { src: "../images/carousel/06.jpg" },
      { src: "../images/carousel/07.jpg" },
    ],
    // 第二个发布者图片
    stabUserImg: [
      { src: "../images/carousel/07.jpg" },
    ],
    //第三个发布者信息
    ttabUserImg: [
      { src: "../images/carousel/05.jpg" },
      { src: "../images/carousel/06.jpg" },
      { src: "../images/carousel/07.jpg" },
      { src: "../images/carousel/05.jpg" },
      { src: "../images/carousel/06.jpg" },
      { src: "../images/carousel/07.jpg" },
      { src: "../images/carousel/05.jpg" },
      { src: "../images/carousel/06.jpg" },
      { src: "../images/carousel/07.jpg" },
    ],
    // 第四个发布者信息 
    ftabUserImg: [
      { src: "../images/carousel/05.jpg" },
      // { src: "../images/carousel/06.jpg" },
      // { src: "../images/carousel/07.jpg" },
      // { src: "../images/carousel/05.jpg" },
      // { src: "../images/carousel/06.jpg" },
      // { src: "../images/carousel/07.jpg" },
      // { src: "../images/carousel/05.jpg" },
      // { src: "../images/carousel/06.jpg" },
      // { src: "../images/carousel/07.jpg" },
    ],
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    index: 0,
    // 第二个发布者信息
    userImg2: [
      { url: "../images/carousel/05.JPg", },
      { url: "../images/carousel/06.JPg", }
    ],
    // 第一发布者信息
    userImg: [
      {
        url: "../images/carousel/05.JPg",
      },
      {
        url: "../images/carousel/06.JPg",
      },
      {
        url: "../images/carousel/07.JPg"
      }
    ],
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // 轮播图图片路径
      imgUrls: [
        {
          // 轮播图跳转路径
        link: '../activity/washCar1/index/index',
        // 图片路径
        url:'../images/carousel/02.jpg'
        },
        {
          link: '../activity/washCar1/index/index',
          url: '../images/carousel/03.jpg'
        },
        {
          link: '../activity/washCar1/index/index',
          url: '../images/carousel/04.jpg'
        },
        // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      icon:[
        {
          link:"../index/index",
          url:"../images/icon/icon1.png",
          name:"工地找车"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon2.png",
          name:"车找工地"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon3.png",
          name:"工地除渣"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon4.png",
          name:"求职招聘"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon5.png",
          name:"二手设备"
        },
      ],
      icon02:[
        {
          link: "../index/index",
          url: "../images/icon/icon6.png",
          name:"认证免费"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon7.png",
          name:"发布信息"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon8.png",
          name:"渣场信息"
        },
        {
          link: "../index/index",
          url: "../images/icon/icon9.png",
          name:"我的名片"
        },
        {
          link: "../details/details",
          url: "../images/icon/icon10.png",
          name:"诚信榜"
        }
        ],
      indicatorDots: true, // 是否显示面板指示点
      autoplay: true,      // 是否自动切换
      circular: true,      // 是否采用衔接滑动
      interval: 3000,      // 自动切换时间间隔
      duration: 200,      // 滑动动画时长
    latitude: '',
    longitude: ''
  },
  　　getLocation: function (e) {
    console.log(e)
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    　})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var zz = this.data.ftabUserImg.length
    var mm = this.data.mm
    // var that=this
    if (zz == 1) {
      this.setData({
        mm: "b"
      })
      // console.log(zz.length)
    } else if (zz > 1 && zz < 5) {
      this.setData({

        mm: "c"
      })
    } else {
      this.setData({

        mm: "a"
      })
    }
    console.log(this.data.ftabUserImg.length)
    console.log(mm)
    // })
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