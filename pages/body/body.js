var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
import request from '../login.js'
Page({



  // 点击浏览图片
  listener: function (e) {
    let index = e.currentTarget.dataset.index;
    var url=e.currentTarget.dataset.ids
    let that = this;
    console.log(e,url,index)
          // tabuser:res.data.data
    // console.log('图片下标',index,that.data.tabuser.img_url_arr[index])
    // console.log(that.data.tempFilePaths[index]);
    // console.log(that.data.tempFilePaths);
    // for(var tb in that.data.tabuser){
      wx.previewImage({
        current: url, //当前图片地址
        urls: that.data.tabuser,//所有要预览的图片的地址集合 数组形式
        //这根本就不走
        success: function (res) {
          //console.log(res);
        },
        //也根本不走
        fail: function () {
          //console.log('fail')
        }
      })
    // }
  },


  yz:function(e){
    //console.log(e)
    //console.log('跳转优质推荐')
    var uid=wx.getStorageSync('uid');
    var interest=wx.getStorageSync('interest');
    if(e.detail.index==1){
      request({
        url:'http://tsf.suipk.cn/home/index/do_Recommend',
        data:{
          type:2,
          uid,
          // interest
        }
        }).then(res=>{
        //console.log('调用优质推荐兴趣成功',res)
        this.setData({
          tabuserjian:res.data.data
        })
        }).catch(err=>{
        //console.log('调用失败')
      })
    }
  },
  // /获取地理位置
  getlocation: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        //console.log(res.address)
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
  goto: function (e) {
    //console.log("十万火急跳转",e.currentTarget.dataset.id)
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  },
  ////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 面板
  tabgoto: function (e) {
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    // var id=that.data.tabuser.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  },
  // 拨打电话
  callphone: function (e) {
    var e=e.currentTarget.dataset.id
    var that=this
    var tel=that.data.user[e].tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
    //console.log("第几个带年华",e)
  },
  // 分享
  tabShare: function (e) {
    // wx.showShareMenu({

    // })
    //console.log("分享")
  },
  // 评论
  tabComment: function (e) {
    //console.log("评论")
  },
  // 点赞
  tabLike: function (e) {
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    //console.log("这是第" + id + "个")
    // for(var i in this.data.user){
    var like = that.data.tabuser[id].point_ratio
    var index = "tabuser[" + id + "].point_ratio";
    that.setData({
      [index]: like + 1
    })

    // }
    //console.log("这是点赞后的点赞数" + like)
  },//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 右边大标题
  titleRight: function () {
    //console.log("这是右边大标题")
  },
  // 左上角小标题
  titleLeftTop: function () {
    //console.log("这是左上角标题")
  },
  // 右下角小标题
  titleLeftBottom: function () {
    //console.log("这是右下角标题")
  },
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 十万火急
  // 跳转
  // goto: function () {
  //   wx.navigateTo({
  //     url: '/pages/details/details',
  //   })
  // },

  // 分享
  share: function (e) {
    var id = e.currentTarget.dataset.id
    //console.log("这是第" + id + "分享")
  },
  // 评论
  comment: function (e) {
    var id = e.currentTarget.dataset.id
    //console.log("这是第" + id + "评论")
  },
  // 点赞
  like: function (e) {
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    //console.log("这是第" + id + "个")
    // for(var i in this.data.user){
    var like = that.data.user[id].index
    var index = "user[" + id + "].index";
    that.setData({
      [index]: like + 1
    })
    // }
    //console.log("这是点赞后的点赞数" + like)
    //console.log("点赞");
  },
  // 视频播放错误
  videoErrorCallback: function (e) {
    //console.log('视频错误信息:')
    //console.log(e.detail.errMsg)
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
      //console.log(e)
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
    // 未读消息
    icons:"0",
    // 首页公告
    imgUrls: [],
    msgList:[],
    // 首页广告图
    advert:"",
    mm: "a",
    // 点赞个数
    index: 0,
    // 最新发布信息 
    // 优质推荐信息
    tabuserjian:[], 
    tabuser: [],
    // 推荐是否隐藏
    hidden: true,
    // =============================
    user: [],
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
      // 图标跳转
      icon:[
        {
          link:"/pages/Ac/index/inex",
          url:"/pages/images/icon/icon1.png",
          name:"工地找车"
        },
        {
          link: "/pages/Ac/index/inex",
          url: "/pages/images/icon/icon2.png",
          name:"车找工地"
        },
        {
          link: "/pages/Ac/index/inex",
          url: "/pages/images/icon/icon3.png",
          name:"工地除渣"
        },
        {
          link: "/pages/Ac/index/inex",
          url: "/pages/images/icon/icon4.png",
          name:"求职招聘"
        },
        {
          link: "/pages/Ac/index/inex",
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
          link: "/pages/site/site",
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
    //console.log(e)
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    　})
  },
  /**
   * 最新发布打电话
   */
   callphonenew:function(e){
    var e=e.currentTarget.dataset.id
    var that=this
    var tel=that.data.tabuser[e].tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
    //console.log("最新发布第几个带年华",e)
   },
   callphonejian:function(e){
    var e=e.currentTarget.dataset.id
    var that=this
    var tel=that.data.tabuserjian[e].tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
    //console.log("最新发布第几个带年华",e)
   },
   // 分享
  tabSharejian: function (e) {
    // wx.showShareMenu({

    // })
    //console.log("分享")
  },
  // 评论
  tabCommentjian: function (e) {
    //console.log("评论")
  },
  // 点赞
  tabLikejian: function (e) {
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    //console.log("这是第" + id + "个")
    // for(var i in this.data.user){
    var like = that.data.tabuser[id].point_ratio
    var index = "tabuser[" + id + "].point_ratio";
    that.setData({
      [index]: like + 1
    })

    // }
    //console.log("这是点赞后的点赞数" + like)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
        var that=this
        
  //  获取用户信息
  // ************************************************************************************************************************
  
  var uid=wx.getStorageSync("uid");
  that.setData({
    uid
  })
    //1、调用微信登录接口，获取code
    wx.login({
      success: function (r) {

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
                //console.log(res);
                let province = res.result.address_component.province;//省份
                let city = res.result.address_component.city;//城市
                let address = res.result.address
                that.setData({
                  location: address
                })
                console.log('用户地址的信息',uid,city,longitude,latitude)
                var code = r.code;//登录凭证
                if (code) {
                  //2、调用获取用户信息接口
                  //...
                  wx.request({
                    url: 'http://tsf.suipk.cn/home/index/do_getLocation',
                    data: {
                      uid,
                      city,
                      longitude,
                      latitude,
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      console.log("地址信息",res)
                    },
                    fail: function () {
                      //console.log("调用失败")
                    }
                  })
                } 

              },
              fail: function (res) {
                //console.log(res);
              }
            });
          }
        })

        
      },
      fail: function () {
        callback(false)
      }
    })

  // ************************************************************************************************************************
    // 调用接口
    
    // 隐藏原生的tabbar
    wx.hideTabBar();
    var zz = this.data.ftabUserImg.length
    var mm = this.data.mm
    // var that=this
    if (zz == 1) {
      this.setData({
        mm: "b"
      })
      // //console.log(zz.length)
    } else if (zz > 1 && zz < 5) {
      this.setData({

        mm: "c"
      })
    } else {
      this.setData({

        mm: "a"
      })
    }
    //console.log(this.data.ftabUserImg.length)
    //console.log(mm)
    // })
    // *******************************************************************************************************************//
    // 轮播图
    //console.log("body调用后台接口--onLoad")
    wx.request({
      url: 'http://tsf.suipk.cn/home/index/do_banner',
      data: {
        type: 0
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // that.setData({ goodslist: res.data.data });
        //console.log("访问成功")
        //console.log(res, 1111111);
        // 轮播图片
        //console.log(res.data.data)
        var res = res.data.data
        //console.log("轮播图",res)
        that.setData({
          imgUrls: res
        })
        //console.log("图片"+that.data.imgUrls)
      },
      fail: function () {
        //console.log("调用失败")
      }
    })
      // //console.log(data)
    // *******************************************************************************************************************//
    // 首页公告+首页十万火急+首页广告位
    wx.request({
      url: 'http://tsf.suipk.cn/home/index/do_info',
      data:{
        uid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("调用首页成功",res)
        //console.log("1---------------")
        //console.log("发布十万火急",res)
        // 首页广告-advert[0]
        // var advert=res.data.data.advert[0].img_url
        that.setData({
          // 广告
          advert:res.data.data.advert,
          // 公告
          msgList:res.data.data.notice,
          // 首页发布者信息
          user:res.data.data.info,
          advertd:res.data.data.advertd[0].img_url
          
        })
        //console.log()
        //console.log("广告图"+that.data.advert)
        //console.log("公告",that.data.msgList)
        //console.log("发布者信息",that.data.user)
        //console.log("发布十万火急",res.data.data.info)
        //console.log(res)
        //console.log("2---------------")
      },fail:function(){
        //console.log("调用失败")
      }
    })
    // *******************************************************************************************************************//
    // 三个标题下的优质发布和最新推荐
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_Recommend",
      data:{
        type:1,
        uid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("最新发布调用成功")
        //console.log("最新发布调用成功",res)
        that.setData({
          tabuser:res.data.data
        })
      }

    })
    // 优质推荐
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_Recommend",
      data:{
        type:2,
        // uid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("优质推荐调用成功")
        //console.log("优质推荐调用成功",res)
        that.setData({
          tabuserjian:res.data.data
        })
      }

    })
    /**
     * 未读消息
     */
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_is_news",
      data:{
        uid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("未读消息",res)
        that.setData({
          icons:res.data.data
        })
      }
    })
    // *******************************************************************************************************************//
    // var that=this
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    //console.log("#########")
    //console.log("最新发布数组",that.data.tabuser)
    //console.log("#########")
    for(var i in this.data.tabuser){
      //console.log("最新发布数组",that.data.tabuser[i].px)
      if(that.data.tabuser[i].px==2){
        // var like = that.data.tabuser[i].px
        var index = "tabuser[" + i + "].px";
        that.setData({
          [index]:"置顶"
        })
        continue
      }
    }
    //console.log("十万火急",that.data.user)
    for(var m in that.data.user){
      if(that.data.user[m].lable=1){
        var index = "user[" + m + "].lable";
        that.setData({
          [index]:"十万火急"
        })
        //console.log("十万火急，啊")
        continue
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
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