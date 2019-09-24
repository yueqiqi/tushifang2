// pages/site/site.js
Page({
  // 拨打电话
  callPhone: function () {
console.log("1008611")
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
  },
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
  //  点击城市组件确定事件  
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    mm:"a",
    index:0,
    dates: '2019-9-10',
    objectArray: ['重庆', '成都', '上海','浙江','深圳'],
    // 第二个发布者信息
    stabUserImg: [
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
    // 第一个发布者信息
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
    // 轮播图图片
    imgUrls: [
      '../images/carousel/02.jpg',
      '../images/carousel/03.jpg',
      '../images/carousel/04.jpg',
      
    ],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    circular: true,      // 是否采用衔接滑动
    interval: 3000,      // 自动切换时间间隔
    duration: 1000,      // 滑动动画时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that=this
    var zz = this.data.stabUserImg.length
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
    console.log(this.data.stabUserImg.length)
    console.log(mm)
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