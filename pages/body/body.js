var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
Page({
  // /获取地理位置
  getlocation: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        that.setData({
          location: res.address
        })
      },
    })
  },
  // 消息跳转
  message:function(){
    wx.navigateTo({
      url: '/pages/inform/inform',
    })
  },
  // ///////////////////////////////////////////
  // 十万火急
  // 跳转
  goto: function () {
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
  ////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 面板
  tabgoto: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    // var id=that.data.tabuser.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  },
  // 拨打电话
  callPhone: function (e) {

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
      [index]: like + 1
    })

    // }
    console.log("这是点赞后的点赞数" + like)
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
// 十万火急
  // 跳转
  goto: function () {
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },

  // 分享
  share: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("这是第" + id + "分享")
  },
  // 评论
  comment: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("这是第" + id + "评论")
  },
  // 点赞
  like: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log("这是第" + id + "个")
    // for(var i in this.data.user){
    var like = that.data.user[id].index
    var index = "user[" + id + "].index";
    that.setData({
      [index]: like + 1
    })
    // }
    console.log("这是点赞后的点赞数" + like)
    console.log("点赞");
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

  data: {
    mm: "a",
    // 点赞个数
    index: 0,
    // 第四个发布者信息 
    tabuser: [
      {
        id: 0,
        name: "发布者用户名",
        type: "置顶",
        dis: 2.3,
        title: "发布者标题",
        time: "2019.02.02 18:36",
        location: "发布者定位",
        content: "招28方430杰师渣车，熟悉南岸. 江北.渝北的老渣娃2名，新手勿扰，工资7000 三万提 + 安全奖电话17774973668",
        img: [
          { src: "../images/carousel/05.jpg" },
          { src: "../images/carousel/06.jpg" },
          { src: "../images/carousel/07.jpg" },
        ],
        project: "车辆出售",
        index: 1,
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
        index: 1,
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
        index: 1,
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
        index: 1,
      }
    ],
    // 推荐是否隐藏
    hidden: true,
    // =============================
    user: [
      {
        // id
        id: 0,
        // 用户头像
        header: "/pages/images/carousel/02.jpg",
        // 用户名
        name: "发布者用户名",
        // 十万火急
        type: "十万火急",
        // 距离
        dis: 2.3,
        // 发布者需求标题
        title: "发布者需求标题",
        // 时间
        time: "2019.02.02 18:36",
        // 发布者定位
        location: "发布者定位",
        // 内容
        content: "翠云万科欢迎32万/28方/22方车24小时随时开自运。要来拉的老板提前联系，结账方式随意。",
        // 图片
        userimg: [
          {
            url: "/pages/images/carousel/05.jpg",
          },
          {
            url: "/pages/images/carousel/06.jpg",
          },
          {
            url: "/pages/images/carousel/07.jpg"
          }
        ],
        // 视屏
        video: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        // 项目类型
        project: "车辆出售",
        // 拨打电话
        callphone: "",
        // 点赞数
        index: 1,
      },
      {
        // id
        id: 1,
        // 用户头像
        header: "/pages/images/carousel/02.jpg",
        // 用户名
        name: "发布者用户名",
        // 十万火急
        type: "十万火急",
        // 距离
        dis: 2.3,
        // 发布者需求标题
        title: "发布者需求标题",
        // 时间
        time: "2019.02.02 18:36",
        // 发布者定位
        location: "发布者定位",
        // 内容
        content: "翠云万科欢迎32万/28方/22方车24小时随时开自运。要来拉的老板提前联系，结账方式随意。",
        // 图片
        userimg: [
          {
            url: "/pages/images/carousel/05.jpg",
          },
          {
            url: "/pages/images/carousel/06.jpg",
          },
          {
            url: "/pages/images/carousel/07.jpg"
          }
        ],
        // 视屏
        video: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        // 项目类型
        project: "车辆出售",
        // 拨打电话
        callphone: "",
        // 点赞数
        index: 1,
      }
    ],
    // 定位位置
    location:"",
    // 
    activeIdx:0,
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
          link:"/pages/site/site",
          url:"/pages/images/icon/icon1.png",
          name:"工地找车"
        },
        {
          link: "/pages/site/site",
          url: "/pages/images/icon/icon2.png",
          name:"车找工地"
        },
        {
          link: "/pages/site/site",
          url: "/pages/images/icon/icon3.png",
          name:"工地除渣"
        },
        {
          link: "/pages/site/site",
          url: "/pages/images/icon/icon4.png",
          name:"求职招聘"
        },
        {
          link: "/pages/site/site",
          url: "/pages/images/icon/icon5.png",
          name:"二手设备"
        },
      ],
      icon02:[
        {
          link: "/pages/Ac/index/inex",
          url: "/pages/images/icon/icon6.png",
          name:"免费认证"
        },
        {
          link: "/pages/Ac/post/post",
          url: "/pages/images/icon/icon7.png",
          name:"发布信息"
        },
        {
          link: "../index/index",
          url: "/pages/images/icon/icon8.png",
          name:"渣场信息"
        },
        {
          link: "/pages/self/card/card",
          url: "/pages/images/icon/icon9.png",
          name:"我的名片"
        },
        {
          link: "/pages/integrity/integrity",
          url: "/pages/images/icon/icon10.png",
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
    let that = this;
    // 调用接口
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude//纬度
        var longitude = res.longitude//经度
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            let province = res.result.address_component.province;//省份
            let city = res.result.address_component.city;//城市
            let address = res.result.address
            that.setData({
              location: address
            })
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    })
    // 隐藏原生的tabbar
    wx.hideTabBar();
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
  onShow: function (e) {
    this.setData({
      msgList: [
        { url: "url", title: "平台公告" },
        { url: "url", title: "2019土石方风向标" },
        { url: "url", title: "土石方红黑榜" },
        { url: "url", title: "如何在土石方平台找到好工作" }]
    });
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

    }
  }
})