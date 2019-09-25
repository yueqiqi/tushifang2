// pages/postMessage/postMessage.js
// var app = getApp()
Page({
  // 跳转
  goto:function(){
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
  // 分享
  share:function(){
    console.log("分享")
  },
  // 评论
  comment:function(){
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
  /**
   * 页面的初始数据
   */
  data: {
    // =============================
    user:[
      {
        // 用户头像
        header: "../../images/carousel/02.jpg",
        // 用户名
        name:"发布者用户名",
        // 十万火急
        type:"十万火急",
        // 发布者需求标题
        title:"发布者需求标题",
        // 时间
        time:"2019.02.02 18:36",
        // 发布者定位
        lcation:"发布者定位",
        // 内容
        title: "翠云万科欢迎32万/28方/22方车24小时随时开自运。要来拉的老板提前联系，结账方式随意。",
        // 图片
        userimg: [
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
        // 视屏
        video:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        // 项目类型
        project:"车辆出售",
        // 拨打电话
        callphone:"",
      }
    ],
    
    // =============================

      index:0,
      // 第二个发布者信息
      userImg2:[
        { url:"../images/carousel/05.JPg",},
        { url:"../images/carousel/06.JPg",}
      ],
      // 第一发布者信息
      userImg:[
        {
          url:"../images/carousel/05.JPg",
        },
        {
          url:"../images/carousel/06.JPg",          
        },
        {
          url:"../images/carousel/07.JPg"
        }
      ]
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