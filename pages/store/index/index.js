// pages/store/index/index.js
Page({
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
      {
        id: 0,
        //  商品图片
        img: "../../images/carousel/02.jpg",
        //商品标题
        title: "日本车载眼镜架多功能创意汽车用眼睛支架",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef: "200",
      },
      {
        id: 1,
        //  商品图片
        img: "../../images/carousel/03.jpg",
        //商品标题
        title: "可折叠汽车储物多功能车载拉杆箱整理收纳盒子",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef: "200",
      },
      {
        id: 2,
        //  商品图片
        img: "../../images/carousel/04.jpg",
        //商品标题
        title: "安全反光贴道路黄红黑白警示桩反光膜",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef: "200",
      },
      {
        id: 3,
        //  商品图片
        img: "../../images/carousel/04.jpg",
        //商品标题
        title: "重卡原厂配件德龙x3000外把手外拉手车门",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef: "200",
      },
    ],
    // 汽车用品
    product:[
      {
        id:0,
     //  商品图片
        img:"../../images/carousel/02.jpg",
     //商品标题
        title:"日本车载眼镜架多功能创意汽车用眼睛支架",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef:"200",
      },
      {
        id:1,
        //  商品图片
        img: "../../images/carousel/03.jpg",
        //商品标题
        title: "日本车载眼镜架多功能创意汽车用眼睛支架",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef: "200",
      },
      {
        id:2,
        //  商品图片
        img: "../../images/carousel/04.jpg",
        //商品标题
        title: "日本车载眼镜架多功能创意汽车用眼睛支架",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef: "200",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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