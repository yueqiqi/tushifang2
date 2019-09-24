// pages/store/classify/classify.js
// 调用时间
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1:[
      {
        suc:"交易成功",
        tit:"日本车载眼镜架多功能创意汽车用眼睛支架",
        img:"../../images/carousel/06.jpg",
        btn: ["删除订单", "查看物流"]
      },

      {
        suc: "待发货",
        tit: "日本车载眼镜架多功能创意汽车用眼睛支架",
        img: "../../images/carousel/06.jpg",
        btn: ["提醒发货", "查看物流","取消订单"]
      },
      {
        suc: "待收货",
        tit: "日本车载眼镜架多功能创意汽车用眼睛支架",
        img: "../../images/carousel/06.jpg",
        btn: [ "查看物流", "确认收货"]
      }
    ],
    su: "mm",
    // 数量
    num:1,
    // 商品价钱
    price: "100.00",
    currenDate: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var currenDate = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      currenDate: currenDate
    });
    for(var i in this.data.arr1){
      console.log(i)
      if (this.data.arr1[i].suc=="待发货"){
        console.log("待发货")
      }
    }
    console.log(this.data.arr1[1].btn)
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