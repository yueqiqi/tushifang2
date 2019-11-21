// pages/integrity/integrity.js
import request from '../login.js'
Page({
  // 跳转详情页
  Mes:function(e){
    var info_id=e.currentTarget.dataset.id
    var idx=e.currentTarget.dataset.idx
    var point=e.currentTarget.dataset.point
    wx.navigateTo({
      url: '/pages/integrityMes/integrityMes?info_id='+info_id+'&idx='+idx+'&point='+point,
    })
    //console.log("跳转至详情页")
  },
  // 分享


  share: function () {
    var info_id=e.currentTarget.dataset.id
    this.setData({
      info_id
    })
  },
  // 评论
  comment: function () {
    //console.log("评论")
  },



  // 点赞
  like: function (e) {
    //console.log(e)
    var that = this
    var uid=wx.getStorageSync('uid');
    var info_id=e.currentTarget.dataset.id
    // +++++++++++++点赞功能++++++++++++++++++++
    request({
      url:'/home/index/do_point',
      data:{
        uid,
        type:2,
        info_id
      }
      }).then(res=>{
      //console.log('调用成功',res)
      that.onLoad()//重点   重新执行下onLoad去获取当前的数据
      }).catch(err=>{
      //console.log('调用失败')
    })
    // +++++++++++++点赞功能++++++++++++++++++++
    //console.log("点赞"); return
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 点赞个数
    index: 0,
    // 失信图片
    breakImg:[
      {
        url:"../images/carousel/04.jpg"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    // +++++++++++++诚信红榜请求++++++++++++++++++++++
      request({
        url:'/home/index/do_Honesty_list',
        data:{
          uid,
          type:1,
          page:1,
          limit:99,
        }
        }).then(res=>{
        //console.log('调用诚信红榜成功',res)
        this.setData({
          integrity:res.data.list,
        })
        }).catch(err=>{
        //console.log('调用失败')
      })
    // +++++++++++++诚信红榜请求++++++++++++++++++++++
    // +++++++++++++诚信灰榜请求++++++++++++++++++++++
    request({
      url:'/home/index/do_Honesty_list',
      data:{
        uid,
        type:2,
        page:1,
        limit:99,
      }
      }).then(res=>{
      //console.log('调用诚信灰榜成功',res)
      this.setData({
        integritys:res.data.list,
      })
      }).catch(err=>{
      //console.log('调用失败')
    })
    // +++++++++++++诚信灰榜请求++++++++++++++++++++++
    // +++++++++++++诚信失信名单请求++++++++++++++++++++++
    request({
      url:'/home/index/do_Honesty_list',
      data:{
        uid,
        type:3,
        page:1,
        limit:99,
      }
      }).then(res=>{
      //console.log('调用失信名单成功',res)
      this.setData({
        break:res.data.list,
      })
      }).catch(err=>{
      //console.log('调用失败')
    })
    // +++++++++++++诚信失信名单请求++++++++++++++++++++++
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    //console.log(res)
    var info_id=that.data.info_id
    if(res.from=='button'){
      return {
        title: '包程项',//弹出分享时显示的分享标题
        path: '/pages/integrityMes/integrityMes?info_id='+info_id,
        //'/page/user?id=123' // 路径，传递参数到指定页面。
        desc: '分享页面的内容',
        success: function (res) { 
          //console.log('分享成功',res)
        },
        fail:function(err){
          //console.log('分享失败',err)
        }
      }
    }
  }
})