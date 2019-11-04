import request from '../login.js';
import like from '../like.js';
Page({
  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  //隐藏输入框
  onHideInput: function () {
    
    console.log('hide+++++++++++')
  },
  // 分享
  share: function () {
    console.log("分享")
  },
  // 评论
// 发布评论
send_btn:function(e){
  this.setData({
    showInput: false
  })
  console.log('发布',e)
var uid=wx.getStorageSync('uid');
var m = e.detail.value
var that=this
var content=m.inputMessage
console.log('评论',content,)
console.log('发布的评论',content,that.data.info_id)
// ++++++++++++发布评论++++++++++++++++++++++
    request({
      url:'http://tsf.suipk.cn/home/index/do_addcommemt',
      data:{
        type:2,
        info_id:that.data.info_id,
        uid,
        content,
      }
      }).then(res=>{
      console.log('调用发布评论成功',res)
      }).catch(err=>{
      console.log('调用失败')
    })
    console.log("评论")
  },




  // 点赞
  like: function () {
    var uid=wx.getStorageSync('uid');
    var that=this
    console.log("点赞")
    var info_id=that.data.info_id
    console.log('info_id',info_id)
    like({
      data:{
        uid,
        type:2,
        info_id,
      }
      }).then(res=>{
      console.log('调用点赞成功',res)
      request({
        url:'http://tsf.suipk.cn/home/index/do_DishonestyList_info',
        data:{
          uid,
          info_id:that.data.info_id
        }
        }).then(res=>{
        console.log('调用失信名单详情成功',res)
        this.setData({
          list:res.data.data
        })
        }).catch(err=>{
        console.log('调用失败')
      })
      }).catch(err=>{
      console.log('调用失败')
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
    console.log('接收失信名单传递过来的info_id',options.info_id)
    this.setData({
      info_id:options.info_id
    })
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/index/do_DishonestyList_info',
      data:{
        uid,
        info_id:that.data.info_id
      }
      }).then(res=>{
      console.log('调用失信名单详情成功',res)
      this.setData({
        list:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // 评论列表
    request({
      url:'http://tsf.suipk.cn/home/index/do_comment_list',
      data:{
       type:2,
       info_id:that.data.info_id,
       page:1,
       limit:10,
      }
    }).then(res=>{
      console.log('调用评论列表成功',res)
      this.setData({
        cons:res.data.list
      })
      }).catch(err=>{
      console.log('调用失败')
    })
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