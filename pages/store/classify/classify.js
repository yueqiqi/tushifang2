// pages/store/classify/classify.js
import request from '../../login'
Page({
  /**
   * 点击滑块重新请求
   */
  change:function(e){
    var uid=wx.getStorageSync('uid');
    // 滑块下标
    var that=this
    var index = e.detail.index
      request({
        url:'http://tsf.suipk.cn/home/Goods/do_order',
        data:{
          uid,
          type:index+1,
          page:1,
          limit:10,
        }
        }).then(res=>{
        console.log('调用待发货列表成功',res)
        that.setData({
          list2:res.data.list,
          list3:res.data.list,
          list4:res.data.list,
          indexs:index
        })
        })
  },
  // 查看订单详情
  detail:function(e){
    // 商品详情
    var order_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/store/order/order?order_id='+order_id,
    })
  },



  // 确认收货
  affirm:function(e){
    // console.log("确认收货");
    // wx.navigateTo({
    //   url: '/pages/store/logistics/logistics?id=1',
    // })
      var order_id=e.currentTarget.dataset.id
      var that=this
      var uid=wx.getStorageSync('uid');

      wx.showModal({
        title: '状态收货',
        content: '确认收货后将不再显示订单状态',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            request({
              url:'http://tsf.suipk.cn/home/Goods/do_confirm_receipt',
              data:{
                order_id,
              }
              }).then(res=>{
              console.log('调用确认收货成功',res)
                if(res.data.code==0){
                  wx.showToast({
                    title: '确认成功',
                    icon: 'success',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result)=>{
                      request({
                        url:'http://tsf.suipk.cn/home/Goods/do_order',
                        data:{
                          uid,
                          type:3,
                          page:1,
                          limit:10,
                        }
                        }).then(res=>{
                        console.log('调用待发货列表成功',res)
                        this.setData({
                          list3:res.data.list,
                        })
                        })
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                  });
                }
              }).catch(err=>{
              console.log('调用失败')
            })   
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
  },

  // 取消订单
  cancel:function(e){
    // var order_id=e.currentTarget.dataset.id
    // var that=this
    // request({
    //   url:'http://tsf.suipk.cn/home/goods/do_cancel_order',
    //   data:{
    //     order_id,
    //   }
    //   }).then(res=>{
    //   console.log('调用取消订单成功',res)
    //   this.setData({
      
    //   })
    //   }).catch(err=>{
    //   console.log('调用失败')
    // })
  },
  // 提醒发货
  remind:function(e){
    var uid=wx.getStorageSync('uid')
    var order_id=e.currentTarget.dataset.id
    var that=this
    request({
      url:'http://tsf.suipk.cn/home/goods/do_OrderRemind',
      data:{
        uid,
        order_id
      }
      }).then(res=>{
      console.log('调用提醒发货成功',res)
        if(res.data.code==0){
          wx.showToast({
            title: '提醒成功',
            icon: 'success',
            image: '',
            duration: 1500,
            mask: false,
          });
        }
      }).catch(err=>{
      console.log('调用失败')
    })
  },
  // 查看物流
  look:function(e){
    var order_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/store/logistics/logistics?order_id='+order_id,
    })
  },
// 删除订单
  del: function (e) {
    var uid=wx.getStorageSync('uid');
    var that=this
    var order_id=e.currentTarget.dataset.id
    console.log('点击的商品id',order_id)
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log('用户点击了确定')
          request({
            url:'http://tsf.suipk.cn/home/Goods/do_del_order',
            data:{
              order_id,
            }
            }).then(res=>{
            console.log('调用删除订单成功',res)
            if(res.data.code==0){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                image: '',
                duration: 1500,
                mask: false,
                success: (result)=>{
                  that.onLoad()
                  request({
                    url:'http://tsf.suipk.cn/home/Goods/do_order',
                    data:{
                      uid,
                      type:4,
                      page:1,
                      limit:10,
                    }
                    }).then(res=>{
                    console.log('调用待发货列表成功',res)
                    that.setData({
                      list4:res.data.list
                    })
                    })
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            }
            }).catch(err=>{
            console.log('调用失败')
          })  
          // 用户点击了确定 可以调用删除方法了
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    su: "mm",
    // 数量
    num:1,
    // 商品价钱
    price: "100.00",
    currenDate: "",
    // 全部订单
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this

    /**
     * 调用我的订单列表
     */
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/Goods/do_order',
      data:{
        uid,
        type:1,
        page:1,
        limit:5,
      }
      }).then(res=>{
      console.log('调用全部订单成功',res)
      that.setData({
        list:res.data.list
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  },

  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    var page = that.data.page
    var pages = that.data.pages
    var pages3 = that.data.pages3
    var pages4 = that.data.pages4
    page++
    pages++
    that.setData({
      page,
      pages,
      pages3,
      pages4,
    })
    var uid=wx.getStorageSync('uid');
    wx.showLoading({
      title: '玩命加载中',
      })
    request({
      url:'http://tsf.suipk.cn/home/Goods/do_order',
      data:{
        uid,
        type:1,
        page:that.data.page,
        limit:5,
      }
      }).then(res=>{
      console.log('调用全部订单成功',res)
      var count=res.data.count
        var all=that.data.list.length
        if (all==count) {
          console.log(1)
          wx.showToast({
            title: '暂无更多',
            icon: 'none',
          })
        }
        var goods = that.data.list.concat(res.data.list)     //message  为一进入页面请求完数据定义的集合
        that.setData({
          list:goods,
        })
        wx.hideLoading();
      }).catch(err=>{
      console.log('调用失败')
    })
    if(that.data.indexs==1){
      request({
        url:'http://tsf.suipk.cn/home/Goods/do_order',
        data:{
          uid,
          type:2,
          page:that.data.pages,
          limit:5,
        }
        }).then(res=>{
        console.log('调用全部订单成功',res)
        var count=res.data.count
          var all=that.data.list2.length
          if (all==count) {
            console.log(1)
            wx.showToast({
              title: '暂无更多',
              icon: 'none',
            })
          }
          var goods = that.data.list.concat(res.data.list2)     //message  为一进入页面请求完数据定义的集合
          that.setData({
            list2:goods,
          })
          wx.hideLoading();
        }).catch(err=>{
        console.log('调用失败')
      })
    }else if(that.data.indexs==2){
      request({
        url:'http://tsf.suipk.cn/home/Goods/do_order',
        data:{
          uid,
          type:3,
          page:that.data.pages3,
          limit:5,
        }
        }).then(res=>{
        console.log('调用全部订单成功',res)
        var count=res.data.count
          var all=that.data.list3.length
          if (all==count) {
            console.log(1)
            wx.showToast({
              title: '暂无更多',
              icon: 'none',
            })
          }
          var goods = that.data.list.concat(res.data.list3)     //message  为一进入页面请求完数据定义的集合
          that.setData({
            list3:goods,
          })
          wx.hideLoading();
        }).catch(err=>{
        console.log('调用失败')
      })
    }else if(that.data.indexs==3){
      request({
        url:'http://tsf.suipk.cn/home/Goods/do_order',
        data:{
          uid,
          type:4,
          page:that.data.pages4,
          limit:5,
        }
        }).then(res=>{
        console.log('调用全部订单成功',res)
        var count=res.data.count
          var all=that.data.list4.length
          if (all==count) {
            console.log(1)
            wx.showToast({
              title: '暂无更多',
              icon: 'none',
            })
          }
          var goods = that.data.list.concat(res.data.list4)     //message  为一进入页面请求完数据定义的集合
          that.setData({
            list4:goods,
          })
          wx.hideLoading();
        }).catch(err=>{
        console.log('调用失败')
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})