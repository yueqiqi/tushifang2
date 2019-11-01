import request from "../../login.js"

// pages/Ac/index/inex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业图片
    ent:[
      {
        url:"../../images/carousel/1.jpg",
        link:"/pages/index/index"
      },
      {
        url: "../../images/carousel/2.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/3.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/1.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/2.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/3.jpg",
        link: "/pages/index/index"
      },
    ],

    title:[
      {
        url:"../../images/ent.png",
        link:"/pages/Ac/business/business",
        name:"我是企业",
      },
      {
        url: "../../images/car.png",
        link: "/pages/Ac/diver/diver",
        name:"我是司机",
      },
      {
        url: "../../images/self.png",
        link: "/pages/Ac/self/self",
        name:"我是个人",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    request({
      url:"http://tsf.suipk.cn/home/personal/do_check_in",
      data:{
        code:"",
        msg:"",
      }
      }).then(res=>{
        console.log("调用个人免费成功",res)
        that.setData({
          ent:res.data.data
        })
        }).catch(err=>{
          console.log("调用失败")
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