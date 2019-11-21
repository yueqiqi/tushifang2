  // pages/store/index/index.js
import request from '../../login'
Page({

  click:function(e){
    var that=this
    console.log('点击选项卡',e.detail.index)
    var index=e.detail.index
    console.log(that.data.one_class[index].id)
      request({
        url:'/home/Goods/do_getgoods',
        data:{
          page:1,
          limit:10,
          shopping_mall_id:that.data.one_class[index].id
        }
        }).then(res=>{
        console.log('调用商品列表 成功',res)
        if(index==1){
          that.setData({
            product:res.data.list,
          })
        }else if(index==2){
          that.setData({
            product2:res.data.list,
          }) 
        }else if(index==3){
          that.setData({
            product3:res.data.list,
          })
        }else if(index==4){
          that.setData({
            product4:res.data.list,
          })
        }
        
        }).catch(err=>{
        console.log('调用失败')
      })
  },


  // 推荐跳转
  tjgoto:function(e){
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/store/product/product?id=' + id,
    })
    return
  },
  // 汽车用品跳转
  goto:function(e){
    var id=e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/store/product/product?id='+id,
    })
    return
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
    activeIdx: 3,
    // 推荐
    tjproduct: [
    ],
    // 汽车用品
    product:[],
    // 一级分类
    one_class:[],
    // 第一个tab
    page:1,
    autoplay: true,
    circular: true,
    interval: 4000,
    duration: 500,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this

    /**
     * 获取商品详情页banner
     */
    request({
      url:'/home/index/do_banner',
      data:{
        type:0
      }
      }).then(res=>{
      console.log('获取商城详情页banner成功',res)
      this.setData({
        imgUrls:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })



   request({
    url:'//home/Goods/do_shopping_mall',
    data:{
      code:'',
      msg:'',
    }
    }).then(res=>{
    console.log('调用商城tab成功',res)
    this.setData({
      one_class:res.data.data
    })
  /**
    * 获取商品详情
    */
   request({
    url:'/home/Goods/do_getgoods',
    data:{
      page:that.data.page,
      limit:6,
      shopping_mall_id:that.data.one_class[0].id
    }
    }).then(res=>{
    console.log('调用商品列表成功',res)
    this.setData({
      tjproduct:res.data.list
    })
    }).catch(err=>{
    console.log('调用失败')
   })
  //  ===================
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
    wx.showNavigationBarLoading();
    setTimeout(()=>{
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      this.onLoad()
    },1500)
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
    request({
      url:'/home/Goods/do_getgoods',
      data:{
        page:that.data.page,
        limit:6,
        shopping_mall_id:that.data.one_class[0].id
      }
      }).then(res=>{
      console.log('调用商品列表成功',res)
      wx.hideLoading();
        var count=res.data.count
        var all=that.data.message.length
        if (all==count) {
          console.log(1)
          wx.showToast({
            title: '暂无更多',
            icon: 'none',
          })
        }
        var goods = that.data.message.concat(res.data.list)     //message  为一进入页面请求完数据定义的集合
        that.setData({
          tjproduct:goods
        })
      }).catch(err=>{
      console.log('调用失败')
     })
    //  ===================
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})