// pages/inform/inform.js
// 调用时间
var util = require('../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
import request from '../login.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    currenTime:"",
    message:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var currenTime = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      currenTime: currenTime
    });
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/index/do_news_list',
      data:{
        uid,
        page:that.data.page,
        limit:5,
      }
      }).then(res=>{
      //console.log('调用信息列表成功',res)
      that.setData({
        message:res.data.list
      })
      }).catch(err=>{
      //console.log('调用失败')
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    var page
    var page = that.data.page
    page++
    that.setData({
      page,
    })
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
      })
      var uid=wx.getStorageSync('uid');
      request({
        url:'/home/index/do_news_list',
        data:{
          uid,
          page:that.data.page,
          limit:4,
        }
        }).then(res=>{
        //console.log('调用刷新信息列表成功',res)
        var count=res.data.count
        var all=that.data.message.length
        if (all>count) {
          //console.log(1)
          wx.showToast({
            title: '暂无更多',
            icon: 'none',
          })
        }
        var goods = that.data.message.concat(res.data.list)     //message  为一进入页面请求完数据定义的集合
        that.setData({
          message:goods
        })
        wx.hideLoading();
        }).catch(err=>{
        //console.log('调用失败')
      })
  },
})