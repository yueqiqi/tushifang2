import request from '../login.js';
import like from '../like.js';
Page({
  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    //console.log('show+++++++++++')
  },
  //隐藏输入框
  onHideInput: function () {
    
    //console.log('hide+++++++++++')
  },
  // 分享
  share: function () {
    //console.log("分享")
  },
  // 评论

  // 发布评论
  bindKeyInput:function(e){
    this.setData({
      inputMessage:e.detail.value,
      fo:true
    })
  },


// 发布评论
send_btn:function(e){
  var that=this
  that.setData({
    showInput: false,
    fo:false
  })
  //console.log('发布',e)
var uid=wx.getStorageSync('uid');
var content=that.data.inputMessage
// ++++++++++++发布评论++++++++++++++++++++++
    request({
      url:'/home/index/do_addcommemt',
      data:{
        type:2,
        info_id:that.data.info_id,
        uid,
        content,
      }
      }).then(res=>{
      //console.log('调用发布评论成功',res)
      request({
        url:'/home/index/do_comment_list',
        data:{
         type:2,
         info_id:that.data.info_id,
         page:1,
         limit:99,
        }
      }).then(res=>{
        //console.log('调用评论列表成功',res)
        this.setData({
          cons:res.data.list
        })
        }).catch(err=>{
        //console.log('调用失败')
      })


      }).catch(err=>{
      //console.log('调用失败')
    })
    //console.log("评论")
  },




  // 点赞
  like: function () {
    var uid=wx.getStorageSync('uid');
    var that=this
    //console.log("点赞")
    var info_id=that.data.info_id
    //console.log('info_id',info_id)
    like({
      data:{
        uid,
        type:2,
        info_id,
      }
      }).then(res=>{
      //console.log('调用点赞成功',res)
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      var idx=that.data.idx
      var breaks='break['+idx+'].is_point'
      var point_ratio1='break['+idx+'].point_ratio'
      var point=that.data.point
      var point1=Number(point)+1
      var point2=that.data.point
      var point3=Number(point2)-1
      if(res.data.code==0){
        prevPage.setData({
          [point_ratio1]:point1,
          [breaks]:1,
        })
      }else if(res.data.code==1){
        prevPage.setData({
          [point_ratio1]:point3,
          [breaks]:0,
        })        
      }

      request({
        url:'/home/index/do_DishonestyList_info',
        data:{
          uid,
          info_id:that.data.info_id
        }
        }).then(res=>{
        //console.log('调用失信名单详情成功',res)
        this.setData({
          list:res.data.data
        })
        }).catch(err=>{
        //console.log('调用失败')
      })
      }).catch(err=>{
      //console.log('调用失败')
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    like:20,
    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    var that=this
    //console.log('接收失信名单传递过来的info_id',options.info_id)
    this.setData({
      info_id:options.info_id,
      point:options.point,
      idx:options.idx
    })
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/index/do_DishonestyList_info',
      data:{
        uid,
        info_id:that.data.info_id
      }
      }).then(res=>{
      //console.log('调用失信名单详情成功',res)
      this.setData({
        list:res.data.data
      })
      }).catch(err=>{
      //console.log('调用失败')
    })
    // 评论列表
    request({
      url:'/home/index/do_comment_list',
      data:{
       type:2,
       info_id:that.data.info_id,
       page:1,
       limit:99,
      }
    }).then(res=>{
      //console.log('调用评论列表成功',res)
      this.setData({
        cons:res.data.list
      })
      }).catch(err=>{
      //console.log('调用失败')
    })
  },

})