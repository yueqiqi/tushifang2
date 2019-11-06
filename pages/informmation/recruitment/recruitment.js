// pages/informmation/recruitment/recruitment.js
// 调用时间
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
import request from '../../login.js'
import like from '../../like.js'
Page({



  // +++++++++++++++++++++渣场跳转至详情页+++++++++++++++++++++++++++++++++++
  slag:function(e){
    var id=e.currentTarget.dataset.id
    var type=3
    wx.navigateTo({
      url: '/pages/details/details?from=信息中心&type='+type+'&id='+id,
      success: (result)=>{
      },
    });
  },
  // +++++++++++++++++++++跳转至详情页+++++++++++++++++++++++++++++++++++




  scall:function(e){
    console.log('拨打电话')
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 渣场信息
  slike:function(e){
    var uid=wx.getStorageSync('uid');
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
    request({
      url:'http://tsf.suipk.cn/home/info/do_info_list',
      data:{
        one_class_id:that.data.one_class_id[1].id,
        page:1,
        uid
      }
      }).then(res=>{
      console.log('调用渣场信息成功',res)
      this.setData({
        slag:res.data.data
      })
      for(var q in that.data.slag){
        var spxs='slag['+q+'].px'
        if(that.data.slag[q].px==2){
          that.setData({
            [spxs]:'置顶'
          })
        }else if(that.data.slag[q].px==3){
          that.setData({
            [spxs]:'十万火急'
          })
        }
      }
      }).catch(err=>{
      console.log('调用失败')
    })
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
    })
  },
  // 工地信息
  mlike:function(e){
    var uid=wx.getStorageSync('uid');
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
    console.log('调用工地信息点赞成功',res)

      
    request({
      url:'http://tsf.suipk.cn/home/info/do_info_list',
      data:{
        one_class_id:that.data.one_class_id[2].id,
        page:1,
        uid
      }
      }).then(res=>{
      console.log('调用工地信息成功',res)
      // that.vm()
      this.setData({
        meeting:res.data.data
      })
      for(var v in that.data.meeting){
        var spxs='meeting['+v+'].px'
        if(that.data.meeting[v].px==2){
          that.setData({
            [spxs]:'置顶'
          })
        }else if(that.data.meeting[v].px==3){
          that.setData({
            [spxs]:'十万火急'
          })
        }
      }
      }).catch(err=>{
      console.log('调用失败')
    })
    this.setData({
    
    })
    
    }).catch(err=>{
    console.log('调用失败')
    })
  },
  // 买卖信息
  dlike:function(e){
    var uid=wx.getStorageSync('uid');
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
    console.log('调用买卖信息点赞成功',res)
    request({
      url:'http://tsf.suipk.cn/home/info/do_info_list',
      data:{
        one_class_id:that.data.one_class_id[3].id,
        page:1,
        uid
      }
      }).then(res=>{
      console.log('调用买卖信息成功',res)
      this.setData({
        deal:res.data.data
      })
      for(var r in that.data.deal){
        var spxs='deal['+r+'].px'
        if(that.data.deal[r].px==2){
          that.setData({
            [spxs]:'置顶'
          })
        }else if(that.data.deal[r].px==3){
          that.setData({
            [spxs]:'十万火急'
          })
        }
      }
      }).catch(err=>{
      console.log('调用失败')
    })
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
    })
  },
  // 顶部导航条跳转
  // ++++++++++++++++++++++++++++++++++++++
  activetab1(){
    this.setData({
      activetab:1
    })
  },
  activetab2(){
    this.setData({
      activetab:2
    })
  },
  activetab3(){
    this.setData({
      activetab:3
    })
  },
  activetab4(){
    this.setData({
      activetab:4
    })
  },
  // ++++++++++++++++++++++++++++++++++++++
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    var that=this
    var e = e.detail.value
    console.log(e)
    this.setData({
      dates: e
    })
    console.log("保存的日期",this.data.dates)
    // ++++++++++
      // ???
    // 找工作
    var one_class_id=that.data.activetab
    var page=1
    var limit=8
    var uid=1
    if(that.data.class=="请选择分类"){
      var type_work_id=0
    }else if(that.data.class!=''){
      var type_work_id=that.data.class
    }
    if(that.data.dates=="请选择时间"){
      var day=0
    }else if(that.data.dates!=''){
      var day=that.data.dates
    }
    var two_class_id=that.data.two_class_id
    wx.request({
      url: 'http://tsf.suipk.cn/home/info/do_info_list',
      data: {
        one_class_id,
        page,
        limit,
        uid,
        type_work_id,
        two_class_id,
        day
      },
      method: 'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log('时间调用信息列表成功', res.data.data)
      }, fail: function () {
      console.log('调用失败')
      }
    })
    // ++++++++++
  },
  // 分类组件
  bindPickerChange: function (e) {
    var that=this
    var e = e.detail.value
    console.log(e)
    console.log(this.data.objectArray[e])
    this.setData({
      index: e,
      class: that.data.objectArray[e].title
    })
    console.log("保存的分类",this.data.class)
      // ???
    // 找工作
    var one_class_id=that.data.activetab
    var page=1
    var limit=8
    var uid=1
    if(that.data.class=="请选择分类"){
      var type_work_id=0
    }else if(that.data.class!=''){
      var type_work_id=that.data.class
    }
    if(that.data.dates=="请选择时间"){
      var day=0
    }else if(that.data.dates!=''){
      var day=that.data.dates
    }
    var two_class_id=that.data.two_class_id
    wx.request({
      url: 'http://tsf.suipk.cn/home/info/do_info_list',
      data: {
        one_class_id,
        page,
        limit,
        uid,
        type_work_id,
        two_class_id,
        day
      },
      method: 'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log('工种调用信息列表成功', res.data.data)
      that.setData({
        userlists:res.data.data
      })
      }, fail: function () {
      console.log('调用失败')
      }
    })
  },
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
  gotoPeople: function (e) {
    var info_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../peopledetail/peopledetail?info_id='+info_id,
    })
  },
  // 跳转详情页
  goto:function(e){
    var info_id=e.currentTarget.dataset.id
    console.log(info_id)
    wx.navigateTo({
      url: '../jobdetail/jobdetail?info_id='+info_id,
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    console.log("滑动的滑块2",e.detail.current+1)
    that.setData({
      currentData: e.detail.current
    })
    var p=parseInt(e.currentTarget.dataset.current)+1
    console.log("点击的滑块1",parseInt(e.currentTarget.dataset.current)+1)
      that.setData({
        two_class_id:p
      })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    var p=parseInt(e.currentTarget.dataset.current)+1
    console.log("点击的滑块1",parseInt(e.currentTarget.dataset.current)+1)
      that.setData({
        two_class_id:p
      })
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
    // 二级分类
    two_class_id:1,
    // 顶部导航栏
    activetab:1,
    // 底部导航条
    activeIdx: 1,
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
    // 分类
    class:"请选择分类",
    dates: '请选择时间',
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




    // +++++++++++++++++++++++++++++++++++
    // 招聘信息-找工作
    userlists:[
      {
        title:"招聘职位",
        stick:"置顶",
        rec:"荐",
        money:"3000-5000",
        // 招聘状态
        statu:"正在招聘",
        // /工作地点
        province:"重庆市",
        // 区域
        dist:"江北区",
        // 发布时间
        time:"2019.08.20",
        // /工作年限
        num:"10",
        // 
        username:"发布者用户名",
        comp:"发布公司的名称",
        img:"/pages/images/carousel/02.jpg"
      },
      {
        title:"招聘职位",
        stick:"置顶",
        rec:"",
        money:"3000-5000",
        // 招聘状态
        statu:"正在招聘",
        // /工作地点
        province:"重庆市",
        // 区域
        dist:"江北区",
        // 发布时间
        time:"2019.08.20",
        // /工作年限
        num:"10",
        // 
        username:"发布者用户名",
        comp:"发布公司的名称",
      }
    ],
    // 招人才
    findpeople:[
      {
        header:"/pages/images/carousel/02.jpg",
        name:"发布者用户名",
        job:"渣土司机",
        statu:"正在找工作",
        money:"3000-5000",
        time:"2019.08.20",
        num:"10",
      },
      {
        header:"/pages/images/carousel/02.jpg",
        name:"发布者用户名",
        job:"渣土司机",
        statu:"正在找工作",
        money:"3000-5000",
        time:"2019.08.20",
        num:"10",
      }
    ],
    // 一级列表
    one_class_id:"",
    // +++++++++++++++++++++++++++++++++++
  },

  /**
   * 生命周期函数--监听页面加载
   */
  vm:function(e){
    var that=this
    var uid=wx.getStorageSync('uid');
    console.log('选择的标题',e)
    var index=e.detail.index
    if(index==1){
    // +++++++++++++++++渣场-轮播图++++++++++++++++++++++++
    request({
      url:'http://tsf.suipk.cn/home/index/do_banner',
      data:{
        type:that.data.one_class_id[index].id
      }
      }).then(res=>{
      console.log('调用信息中心渣场中心banner成功',res)
      this.setData({
        imgUrls2:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  // +++++++++++++++++轮播图++++++++++++++++++++++++
  // +++++++++++++++++渣场信息+++++++++++++++++++++
    request({
      url:'http://tsf.suipk.cn/home/info/do_info_list',
      data:{
        one_class_id:that.data.one_class_id[1].id,
        page:1,
        uid
      }
      }).then(res=>{
      console.log('调用渣场信息成功',res)
      
      this.setData({
        slag:res.data.data
      })
      for(var q in that.data.slag){
        var spxs='slag['+q+'].px'
        if(that.data.slag[q].px==2){
          that.setData({
            [spxs]:'置顶'
          })
        }else if(that.data.slag[q].px==3){
          that.setData({
            [spxs]:'十万火急'
          })
        }
      }
      }).catch(err=>{
      console.log('调用失败')
    })
  // +++++++++++++++++渣场信息+++++++++++++++++++++
    }else if(index==2){
      // +++++++++++++++++工地轮播图++++++++++++++++++++++++
    request({
      url:'http://tsf.suipk.cn/home/index/do_banner',
      data:{
        type:that.data.one_class_id[index].id
      }
      }).then(res=>{
      console.log('调用信息中心工地中心banner成功',res)
      this.setData({
        imgUrls3:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  // +++++++++++++++++轮播图++++++++++++++++++++++++
  // +++++++++++++++++工地信息++++++++++++++++++++++++
  request({
    url:'http://tsf.suipk.cn/home/info/do_info_list',
    data:{
      one_class_id:that.data.one_class_id[2].id,
      page:1,
      uid
    }
    }).then(res=>{
    console.log('调用工地信息成功',res)
    
    this.setData({
      meeting:res.data.data
    })
    for(var v in that.data.meeting){
      var spxs='meeting['+v+'].px'
      if(that.data.meeting[v].px==2){
        that.setData({
          [spxs]:'置顶'
        })
      }else if(that.data.meeting[v].px==3){
        that.setData({
          [spxs]:'十万火急'
        })
      }
    }
    }).catch(err=>{
    console.log('调用失败')
  })
  // +++++++++++++++++工地信息++++++++++++++++++++++++
    }else if(index==3){
      // +++++++++++++++++轮播图++++++++++++++++++++++++
    request({
      url:'http://tsf.suipk.cn/home/index/do_banner',
      data:{
        type:that.data.one_class_id[index].id
      }
      }).then(res=>{
      console.log('调用信息中心买卖中心banner成功',res)
      this.setData({
        imgUrls4:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  // +++++++++++++++++轮播图++++++++++++++++++++++++
  // +++++++++++++++++买卖信息++++++++++++++++++++++++
  request({
    url:'http://tsf.suipk.cn/home/info/do_info_list',
    data:{
      one_class_id:that.data.one_class_id[3].id,
      page:1,
      uid
    }
    }).then(res=>{
    console.log('调用买卖信息成功',res)
    
    this.setData({
      deal:res.data.data
    })
    for(var r in that.data.deal){
      var spxs='deal['+r+'].px'
      if(that.data.deal[r].px==2){
        that.setData({
          [spxs]:'置顶'
        })
      }else if(that.data.deal[r].px==3){
        that.setData({
          [spxs]:'十万火急'
        })
      }
    }
    }).catch(err=>{
    console.log('调用失败')
  })
  // +++++++++++++++++买卖信息++++++++++++++++++++++++
    }
  },

  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var that=this
    var currenTime = util.formatTime(new Date());
    var uid=wx.getStorageSync('uid');
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      currenTime: currenTime
    });
    // ++++++++++++++++++++++++++++++++++++
    wx.request({
    url: 'http://tsf.suipk.cn/home/info/do_oneclass_list',
      data: {
        code:"",
        msg:"",
      },
      method: 'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log('调用信息中心导航条成功', res.data.data)
      // ++++++++++++招聘列表++++++++++++++++++++++
      request({
        url:'http://tsf.suipk.cn/home/info/do_info_list',
        data:{
          one_class_id:res.data.data[0].id,
          page:1,
          uid,
          two_class_id:2,
        }
            }).then(res=>{
              console.log('调用招聘信息-找工作成功',res)
              that.setData({
                userlists:res.data.data
            })
            }).catch(err=>{
            console.log('调用失败')
          })
          // +++++++++++++++++++++获取去信息中心的列表-招聘信息-招人才+++++++++++++++++++++
          request({
            url:'http://tsf.suipk.cn/home/index/do_banner',
            data:{
              type:1
            }
            }).then(res=>{
            console.log('调用信息中心招聘banner成功',res)
            that.setData({
              imgUrls:res.data.data
            })
            }).catch(err=>{
            console.log('调用失败')
          })
          request({
            url:'http://tsf.suipk.cn/home/info/do_info_list',
            data:{
              one_class_id:res.data.data[0].id,
              page:1,
              uid,
              two_class_id:1,
            }
                }).then(res=>{
                  console.log('调用招聘信息-招人才成功',res)
                  that.setData({
                    findpeople:res.data.data
                })
                }).catch(err=>{
                console.log('调用失败')
              })
      // ++++++++++++招聘列表++++++++++++++++++++++
      that.setData({
        one_class_id:res.data.data
      })
      console.log(that.data.one_class_id)
      }, fail: function () {
      console.log('调用失败')
      }
    })
    // ????????

      // +++++++++++++++++++++获取去信息中心的列表+++++++++++++++++++++
    


    // 二级分类
    wx.request({
      url: 'http://tsf.suipk.cn/home/Personal/do_id_type',
      data: {
        type:1,
      },
      method: 'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      console.log('调用工种成功', res.data.data)
      that.setData({
        objectArray:res.data.data
      })
      console.log()
      }, fail: function () {
      console.log('调用失败')
      }
    })

  
    // ++++++++++++++++++++++++++++++++++++
    // wx.login({
    //   success (res) {
    //     console.log("用户登录信息",res)
    //     // if (res.code) {
    //     //   //发起网络请求
    //     //   wx.request({
    //     //     url: 'https://test.com/onLogin',
    //     //     data: {
    //     //       code: res.code
    //     //     }
    //     //   })
    //     // } else {
    //     //   console.log('登录失败！' + res.errMsg)
    //     // }
    //   }
    // })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    for(var p in that.data.userlists){
      var pxs='userlists['+p+'].px'
      if(that.data.userlists[p].px==2){
        that.setData({
          [pxs]:'置顶'
        })
      }else if(that.data.userlists[p].px==3){
        that.setData({
          [pxs]:'十万火急'
        })
      }
      var w='userlists['+p+'].working_condition'
      if(that.data.userlists[p].working_condition==1){
        that.setData({
          [w]:'正在招聘'
        })
      }else{
        that.setData({
          [w]:'已完成',
        })
      }
    }

    for(var j in that.data.findpeople){
      var st='findpeople['+j +'].working_condition'
      if(that.data.findpeople[j].working_condition==1){
        that.setData({
          [st]:'离职随时到岗'
        })
      }else if(that.data.findpeople[j].working_condition==2){
        that.setData({
          [st]:'在职-月内到岗'
        })
      }else if(that.data.findpeople[j].working_condition==3){
        that.setData({
          [st]:'在职-考虑机会'
        })
      }else  if(that.data.findpeople[j].working_condition==4){
        that.setData({
          [st]:'在职-暂不考虑'
        })
      }
    }
    // var that=this
    
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