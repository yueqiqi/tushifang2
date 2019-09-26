// pages/store/index/index.js
Page({
  goto:function(){
    wx.navigateTo({
      url: '',
    })
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
    product:[
      {
     //  商品图片
        img:"../../images/carousel/02.jpg",
     //商品标题
        title:"日本车载眼镜架多功能创意汽车用眼睛支架",
        // 商品价格
        price: "99.00",
        // 原来价格
        gef:"200",
        // 跳转页面
        link:"/pages/store/product/product"
      },
      {
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