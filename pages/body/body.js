var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
import request from '../login.js'
import like from '../like.js'
Page({



  // 点击浏览图片-最新发布
  listenerButtonPreviewImage: function (e) {
    let index = e.currentTarget.dataset.index;
    var url=e.currentTarget.dataset.ids
    var id = e.currentTarget.dataset.id
    let that = this;
    console.log('浏览的图片',)
    console.log(e,index)
          // tabuser:res.data.data
    // console.log('图片下标',index,that.data.tabuser.img_url_arr[index])
    // console.log(that.data.tempFilePaths[index]);
    // console.log(that.data.tempFilePaths);
    for(var tb in that.data.tabuser){
     if(id==that.data.tabuser[tb].id){
     var previewImgArr = that.data.tabuser[tb].img_url_arr
     }
    }
    console.log(id)
    wx.previewImage({
      current: url, //当前图片地址
      urls: previewImgArr,//所有要预览的图片的地址集合 数组形式
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
  },
  // 点击浏览图片-优质推荐
  listenerButtonPreviewImagej: function (e) {
    let index = e.currentTarget.dataset.index;
    var url=e.currentTarget.dataset.ids
    var id = e.currentTarget.dataset.id
    let that = this;
    console.log('浏览的图片',)
    console.log(e,index)
          // tabuser:res.data.data
    // console.log('图片下标',index,that.data.tabuser.img_url_arr[index])
    // console.log(that.data.tempFilePaths[index]);
    // console.log(that.data.tempFilePaths);
    for(var tb in that.data.tabuserjian){
     if(id==that.data.tabuserjian[tb].id){
     var previewImgArr = that.data.tabuserjian[tb].img_url_arr
     }
    }
    console.log(id)
    wx.previewImage({
      current: url, //当前图片地址
      urls: previewImgArr,//所有要预览的图片的地址集合 数组形式
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
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
  // goto: function (e) {
  //   //console.log("十万火急跳转",e.currentTarget.dataset.id)
  //   var id=e.currentTarget.dataset.id
  //   wx.navigateTo({
  //     url: '/pages/details/details?id='+id,
  //   })
  // },
  ////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 面板
  tabgoto: function (e) {
    var that = this
    //console.log(e)
    var id = e.currentTarget.dataset.id
    var form=e.currentTarget.dataset.type
    var type=1
    var from='首页'
    console.log(e,form)
    // var id=that.data.tabuser.id
    wx.navigateTo({
      url: '/pages/details/details?id=' + id+'&form='+form+'&type='+type+'&from='+from
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
    console.log('点赞',id)
    var uid=wx.getStorageSync('uid');
    like({
    data:{
      uid,
      type:1,
      info_id:id
    }
    }).then(res=>{
    console.log('调用点赞成功',res)
    that.onLoad();
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
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
    icons:0,
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
    console.log('点赞',id)
    var uid=wx.getStorageSync('uid');
    like({
    data:{
      uid,
      type:1,
      info_id:id
    }
    }).then(res=>{
    console.log('调用优质推荐点赞成功',res)
    that.onLoad();
    
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
    })
    // }
    //console.log("这是点赞后的点赞数" + like)
  },
  nav:function(e){
    var that=this
    console.log(e.currentTarget.dataset.index)
    var index=e.currentTarget.dataset.index
    // console.log(that.data)
    var uid=wx.getStorageSync('uid');
    if(uid!=''){
      wx.navigateTo({
        url:that.data.icon02[index].link
      })
    }else if(uid==''){
      wx.switchTab({
        url: '/pages/self/index/index',
        success:function(){
          wx.showModal({
            title: '登录中心',
            content: '请登录',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                
              }
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
        var that=this
        
        // 禁止跳转
        // 免费认证
        var uid=wx.getStorageSync("uid");
        
  //  获取用户信息
  // ************************************************************************************************************************
  
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
        console.log("调用首页成功",res)
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
        console.log("大广告图"+that.data.advertd)
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
        uid,
        page:1,
        limit:2,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("最新发布调用成功")
        console.log("最新发布调用成功",res)
        that.setData({
          tabuser:res.data.list
        })
      }

    })
    var uid=wx.getStorageSync('uid');
    // 优质推荐
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_Recommend",
      data:{
        type:2,
        uid,
        page:1,
        limit:5,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("优质推荐调用成功")
        console.log("调用优质推荐调用成功",res)
        that.setData({
          tabuserjian:res.data.list
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
        console.log("未读消息",res)
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
    // for(var i in this.data.tabuser){
    //   //console.log("最新发布数组",that.data.tabuser[i].px)
    //   if(that.data.tabuser[i].px==2){
    //     // var like = that.data.tabuser[i].px
    //     var index = "tabuser[" + i + "].px";
    //     that.setData({
    //       [index]:"置顶"
    //     })
    //     continue
    //   }
    // }
    //console.log("十万火急",that.data.user)
    // for(var m in that.data.user){
    //   if(that.data.user[m].lable=1){
    //     var index = "user[" + m + "].lable";
    //     that.setData({
    //       [index]:"十万火急"
    //     })
    //     //console.log("十万火急，啊")
    //     continue
    //   }
    // }
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    this.onReady()
    setTimeout(function () {    
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var uid=wx.getStorageSync('uid');
    console.log('触底了')
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    var page=1
   page+=1;
  //  刷新最新发布
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_Recommend",
      data:{
        type:1,
        uid,
        page,
        limit:2,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("最新发布调用成功")
        console.log("最新发布刷新调用成功",res)
        // that.onLoad()
        that.setData({
          tabuser:res.data.list
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    return {
      title: '包程项',//弹出分享时显示的分享标题
      path: '/pages/body/body',//'/page/user?id=123' // 路径，传递参数到指定页面。
      desc: '土石方首页',
      success: function (res) {
        console.log('分享成功',ops)
       }

    }
  }
})