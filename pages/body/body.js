var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
import request from '../login.js'
import like from '../like.js'
Page({

// 点击浏览图片--十万火急
listenerButtonPreviewImages:function(e){
  let index = e.currentTarget.dataset.index;
    var url=e.currentTarget.dataset.ids
    var id = e.currentTarget.dataset.id
    let that = this;
    // console.log('浏览的图片',)
    // console.log(e,index)
    // console.log(that.data.tabuser)
    for(var tb in that.data.user){
     if(id==that.data.user[tb].id){
     var previewImgArr = that.data.user[tb].img_url_arr
     }
    }
    console.log('浏览的数组',previewImgArr)
    wx.previewImage({
      current: url, //当前图片地址
      urls: previewImgArr,//所有要预览的图片的地址集合 数组形式
    })
},
  // 点击浏览图片-最新发布
  listenerButtonPreviewImage: function (e) {
    let index = e.currentTarget.dataset.index;
    var url=e.currentTarget.dataset.ids
    var id = e.currentTarget.dataset.id
    let that = this;
    // console.log('浏览的图片',)
    // console.log(e,index)
    // console.log(that.data.tabuser)
    for(var tb in that.data.tabuser){
     if(id==that.data.tabuser[tb].id){
     var previewImgArr = that.data.tabuser[tb].img_url_arr
     }
    }
    console.log('浏览的数组',previewImgArr)
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
    console.log(e,index,id)
    console.log(that.data.tabuserjian)
          // tabuser:res.data.data
    // console.log('图片下标',index,that.data.tabuser.img_url_arr[index])
    // console.log(that.data.tempFilePaths[index]);
    // console.log(that.data.tempFilePaths);
    for(var tbs in that.data.tabuserjian){
     if(id==that.data.tabuserjian[tbs].id){
     var previewImgArrs = that.data.tabuserjian[tbs].img_url_arr
     }
    }
    console.log('浏览的数组',previewImgArrs)
    wx.previewImage({
      current: url, //当前图片地址
      urls: previewImgArrs,//所有要预览的图片的地址集合 数组形式
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
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var uid=wx.getStorageSync('uid');
    like({
    data:{
      uid,
      type:1,
      info_id:id
    }
    }).then(res=>{
    console.log('调用点赞成功',res)
    // that.onLoad();
      /**
       * 调用点赞列表
       */
      console.log('点赞加载',that.data.tabuser)
      // var jj=tabuser[inedx].is_point
      // that.setData({
      //   tabuser
      // })
      console.log(res.data.code)
      if(res.data.code==0){
        // for(var m in that.data.tabuser){
          var like='tabuser['+index+'].is_point'
          var point_ratio=that.data.tabuser[index].point_ratio
          var point_ratio1='tabuser['+index+'].point_ratio'
          var p=p+1
          that.setData({
            [like]:1,
            [point_ratio1]:point_ratio+1
          })
          // }
          console.log('点赞加载数组',that.data.tabuser)
        }else if(res.data.code==1){
          // for(var ms in that.data.tabuser){
            var point_ratios=that.data.tabuser[index].point_ratio
            var likes='tabuser['+index+'].is_point'
            var point_ratios1='tabuser['+index+'].point_ratio'
            var m=m-1
            that.setData({
              [likes]:0,
              [point_ratios1]:point_ratios-1
          })
        // }
      }
      // else{
      //   for(var m in tabuser){
      //     var like='tabuser['+m+'].is_point'
      //     that.setData({
      //       [like]:0
      //     })
      //   }
      // }


    }).catch(err=>{
    console.log('调用失败')
    })
  },
  swLike: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var uid=wx.getStorageSync('uid');
    like({
    data:{
      uid,
      type:1,
      info_id:id
    }
    }).then(res=>{
      /**
       * 调用点赞列表
       */
      console.log(res.data.code)
      if(res.data.code==0){
          var like='user['+index+'].is_point'
          var point_ratio=that.data.user[index].point_ratio
          var point_ratio1='user['+index+'].point_ratio'
          var p=p+1
          that.setData({
            [like]:1,
            [point_ratio1]:point_ratio+1
          })
        }else if(res.data.code==1){
            var point_ratios=that.data.user[index].point_ratio
            var likes='user['+index+'].is_point'
            var point_ratios1='user['+index+'].point_ratio'
            var m=m-1
            that.setData({
              [likes]:0,
              [point_ratios1]:point_ratios-1
          })
      }
      // else{
      //   for(var m in tabuser){
      //     var like='tabuser['+m+'].is_point'
      //     that.setData({
      //       [like]:0
      //     })
      //   }
      // }


    }).catch(err=>{
    console.log('调用失败')
    })
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  


// 第一排导航条跳转
navto:function(e){
  var that=this
  var index=e.currentTarget.dataset.index
wx.reLaunch({
  url: that.data.icon[index].link+'?active='+that.data.icon[index].active,
  success: (result)=>{
    
  },
  fail: ()=>{},
  complete: ()=>{}
});
},


  data: {
    page:1,
    pages:1,
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
    // 优质推荐信息
    tabuserjian:[], 
    // 最新发布信息 
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
          link:"/pages/informmation/recruitment/recruitment",
          img_url:"/pages/images/icon/icon1.png",
          title:"工地找车",
          active:2
        },
        {
          link: "/pages/informmation/recruitment/recruitment",
          img_url: "/pages/images/icon/icon2.png",
          title:"车找工地",
          active:2
        },
        {
          link: "/pages/informmation/recruitment/recruitment",
          img_url: "/pages/images/icon/icon3.png",
          title:"工地除渣",
          active:1
        },
        {
          link: "/pages/informmation/recruitment/recruitment",
          img_url: "/pages/images/icon/icon4.png",
          title:"求职招聘",
          active:0
        },
        {
          link: "/pages/informmation/recruitment/recruitment",
          img_url: "/pages/images/icon/icon5.png",
          title:"二手设备",
          active:3
        },
      ],
      icon02:[
        {
          link: "/pages/Ac/index/inex",
          img_url: "/pages/images/icon/icon6.png",
          title:"免费认证"
        },
        {
          link: "/pages/Ac/post/post",
          img_url: "/pages/images/icon/icon7.png",
          title:"发布信息"
        },
        {
          link: "/pages/informmation/recruitment/recruitment",
          img_url: "/pages/images/icon/icon8.png",
          title:"渣场信息"
        },
        {
          link: "/pages/self/card/card",
          img_url: "/pages/images/icon/icon9.png",
          title:"我的名片"
        },
        {
          link: "/pages/integrity/integrity",
          img_url: "/pages/images/icon/icon10.png",
          title:"诚信榜"
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
    var index = e.currentTarget.dataset.index
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
    if(res.data.code==0){
      // for(var m in that.data.tabuser){
        var like='tabuserjian['+index+'].is_point'
        var point_ratio=that.data.tabuserjian[index].point_ratio
        var point_ratio1='tabuserjian['+index+'].point_ratio'
        var p=p+1
        that.setData({
          [like]:1,
          [point_ratio1]:point_ratio+1
        })
        // }
        console.log('点赞加载数组',that.data.tabuser)
      }else if(res.data.code==1){
        // for(var ms in that.data.tabuser){
          var point_ratios=that.data.tabuserjian[index].point_ratio
          var likes='tabuserjian['+index+'].is_point'
          var point_ratios1='tabuserjian['+index+'].point_ratio'
          var m=m-1
          that.setData({
            [likes]:0,
            [point_ratios1]:point_ratios-1
        })
      // }
    }
    
    }).catch(err=>{
    console.log('调用失败')
    })
    // }
  },
  nav:function(e){
    var that=this
    var index=e.currentTarget.dataset.index
    var uid=wx.getStorageSync('uid');
    if(uid!=''){
      /**
       * 渣场信息跳转
       */
      if(index==2){
        wx.reLaunch({
          url: that.data.icon02[2].link+'?active=1',
        });
      }
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
          });
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that=this
        
        // 禁止跳转
        if(options.parentid){
          console.log('分享的id',options.parentid)
          wx.setStorageSync('parentid', options.parentid);
        }
        
       // console.log('进入打印',uid)
       

  //  获取用户信息
  // *********************************************************************************
  
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

  // *********************************************************************************
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
    // })
    // *******************************************************************************
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
        console.log('首页轮播图',res)
        var res = res.data.data
        that.setData({
          imgUrls: res
        })
      },
      fail: function () {
      }
    })
    // *******************************************************************************
    // 首页十万火急
    request({
      url:'http://tsf.suipk.cn/home/index/do_hot',
      data:{
        uid,
      }
      }).then(res=>{
      console.log('调用首页十万火急成功',res)
      that.setData({
        user:res.data.data,
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // *******************************************************************************
    // 首页公告+首页十万火急+首页广告位
    wx.request({
      url: 'http://tsf.suipk.cn/home/index/do_info',
      data:{
        code:'',
        msg:'',
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.setData({
          // 广告
          advert:res.data.data.advert,
          // 公告
          msgList:res.data.data.notice,
          // 首页发布者信息
          advertd:res.data.data.advertd[0].img_url
          
        })
      },fail:function(){
      }
    })
    // *******************************************************************************************************************//
    // 三个标题下的优质发布和最新推荐
    
    var interest=wx.getStorageSync('int');
    if(interest){
      var interest=wx.getStorageSync('int');
      }else {
        var interest=''
      }
      console.log('获取选择兴趣的id',interest)
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_Recommend",
      data:{
        type:1,
        uid,
        page:that.data.page,
        limit:5,
        interest,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
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
        page:that.data.pages,
        limit:5,
        interest,
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
        console.log('优质推荐里面的内容',that.data.tabuserjian)
      }

    })
    /**
     * 未读消息
     */
    console.log('uid 是都等',uid)
    if(uid!=''){
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
    }
    // *******************************************************************************************************************//
    // var that=this
    // 调用首页导航条
    // this.bodylist()
  },
    /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideTabBar()
  },
  // +++++++++++++++++++首页导航条+++++++++++++++++++++++++
  bodylist(){
    var s=[]
    request({
      url:'http://tsf.suipk.cn/home/Index/do_index_list',
      data:{
        code:"",
        msg:"",
      }
      }).then(res=>{
      console.log('调用首页头部导航条成功',res)
       this.setData({
        icon:res.data.data.slice(0,5),
        icon02:res.data.data.slice(5,11)
       }) 
       console.log('首页第二行导航条',this.data.icon2)
      }).catch(err=>{
      console.log('调用首页头部导航条失败')
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // this.onReady()
    var that=this
    var interest=wx.getStorageSync('int');
    if(interest){
      var interest=wx.getStorageSync('int');
      }else {
        var interest=''
      }
    setTimeout(function () {    
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    // that.onLoad()
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_Recommend",
      data:{
        type:1,
        uid,
        page:1,
        limit:5,
        interest
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("最新发布调用成功")
        console.log("最新发布调用成功",res)
        that.setData({
          tabuser:res.data.list,
          page:1,
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
        interest,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log("优质推荐调用成功")
        console.log("调用优质推荐调用成功",res)
        that.setData({
          tabuserjian:res.data.list,
          pages:1
        })
        console.log('优质推荐里面的内容',that.data.tabuserjian)
      }

    })

    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    var page = that.data.page
    var pages = that.data.pages
    page++
    pages++
    that.setData({
      page,
      pages
    })
    var interest=wx.getStorageSync('int');
    if(interest){
      var interest=wx.getStorageSync('int');
      }else {
        var interest=''
      }
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
      })
      var uid=wx.getStorageSync('uid');
      request({
        url:'http://tsf.suipk.cn/home/index/do_Recommend',
        data:{
          type:1,
          uid,
          page:that.data.page,
          limit:5,
          interest
        }
        }).then(res=>{
        console.log('调用刷新最新发布成功',res)
        var count=res.data.count
        var all=that.data.tabuser.length
        if (all==count) {
          console.log(1)
          wx.showToast({
            title: '暂无更多',
            icon: 'none',
          })
        }
        var goods = that.data.tabuser.concat(res.data.list)     //message  为一进入页面请求完数据定义的集合
        that.setData({
          tabuser:goods,
        })
        wx.hideLoading();
        }).catch(err=>{
        console.log('调用失败')
      })



      request({
        url:'http://tsf.suipk.cn/home/index/do_Recommend',
        data:{
          type:2,
          uid,
          page:that.data.pages,
          limit:5,
          interest
        }
        }).then(res=>{
        console.log('调用刷新最新发布成功',res)
        var count=res.data.count
        var all=that.data.tabuserjian.length
        if (all==count) {
          console.log(1)
          wx.showToast({
            title: '暂无更多',
            icon: 'none',
          })
        }
        var goods = that.data.tabuserjian.concat(res.data.list)     //message  为一进入页面请求完数据定义的集合
        that.setData({
          tabuserjian:goods
        })
        wx.hideLoading();
        }).catch(err=>{
        console.log('调用失败')
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
