// pages/panel/panel.js
Page({
  tabgoto:function(e){
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    // var id=that.data.tabuser.id
    wx.navigateTo({
      url: '/pages/details/details?id='+id
    })
  },
  // 拨打电话
  callPhone:function(e){

  },
  // 分享
  tabShare: function (e) {
    // wx.showShareMenu({
      
    // })
    console.log("分享")
  },
  // 评论
  tabComment: function (e) {
    console.log("评论")
  },
  // 点赞
  tabLike: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log("这是第" + id + "个")
    // for(var i in this.data.user){
    var like = that.data.tabuser[id].index
    var index = "tabuser[" + id + "].index";
    that.setData({
      [index]: like +1
    })
   
    // }
    console.log("这是点赞后的点赞数" + like)
  },
  /**
   * 页面的初始数据
   */
  data: {
    mm:"a",
      // 点赞个数
      index:0,
      // 第四个发布者信息 
      tabuser:[
        {
        id:0,
        name:"发布者用户名",
        type:"置顶",
        dis:2.3,
        title:"发布者标题",
        time:"2019.02.02 18:36",
        location:"发布者定位",
        content: "招28方430杰师渣车，熟悉南岸. 江北.渝北的老渣娃2名，新手勿扰，工资7000 三万提 + 安全奖电话17774973668",
        img: [
         { src: "../images/carousel/05.jpg" },
      { src: "../images/carousel/06.jpg" },
      { src: "../images/carousel/07.jpg" },
      ],
        project:"车辆出售",
        index:1,
      },
      {
          id: 1,
          name: "发布者用户名",
          type: "置顶",
          dis: 2.3,
          title: "发布者标题",
          time: "2019.02.02 18:36",
          location: "发布者定位",
        content: "晚鱼村28方今晚装成12点，想装细料装细料，想装页岩装页岩，想装自运装自运，随意，自运1200.提供南山渣票，车子750电密18580515020……同时今晚鹅公岩桥头有5车料1300现在切得到的报名，没夜间。同时关音桥建渣现金1500.通宵联系电话153 1086 6666同时内转需要6个车，能跑一个月固定车车跑电密15922709164另外我朋友要30台18方内转车要切的电密182 2325 7564",
          img: [
            { src: "../images/carousel/05.jpg" },
           
          ],
          project: "车辆出售",
          index:1,
        },
        {
          id: 2,
          name: "发布者用户名",
          type: "置顶",
          dis: 2.3,
          title: "发布者标题",
          time: "2019.02.02 18:36",
          location: "发布者定位",
          content: "翠云万科 肖家河万科 欢迎来22 28 32 45的来自运， 附近有渣场的也可以合作。结账方式随意！",
          img: [
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
          project: "车辆出售",
          index:1,
        },
        {
          id: 3,
          name: "发布者用户名",
          type: "置顶",
          dis: 2.3,
          title: "发布者标题",
          time: "2019.02.02 18:36",
          location: "发布者定位",
          content: "卡特320..323DL，324D，326.329D，336D，等，中介好操作，直接与老板谈价，如需要请联系 最新挖机信息在朋友圈，如有打扰多多原谅",
          rec: "荐",
          img: [
          ],
          project: "车辆出售",
          index: 1,
        },
        {
          id: 4,
          name: "发布者用户名",
          type: "置顶",
          dis: 2.3,
          title: "发布者标题",
          time: "2019.02.02 18:36",
          location: "发布者定位",
          content: "翠云万科 肖家河万科 欢迎来22 28 32 45的来自运， 附近有渣场的也可以合作。结账方式随意！",
          img: [
            { src: "../images/carousel/05.jpg" },
            { src: "../images/carousel/06.jpg" },
            { src: "../images/carousel/07.jpg" },
            { src: "../images/carousel/05.jpg" },
          ],
          project: "车辆出售",
          index:1,
        }
      ],
      // 推荐是否隐藏
      hidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  推荐是否隐藏
    wx.hideShareMenu()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideShareMenu()
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
    return {
      title: '转发',//弹出分享时显示的分享标题
      path: '/pages/index/index',//'/page/user?id=123' // 路径，传递参数到指定页面。
      desc: '分享页面的内容',
      success: function (res) { }

  }}
})