// pages/panel/panel.js
Page({
  // 拨打电话
  callPhone:function(){

  },
  // 分享
  tabShare: function () {
    console.log("分享")
  },
  // 评论
  tabComment: function () {
    console.log("评论")
  },
  // 点赞
  tabLike: function () {
    var that = this
    this.setData({ index: that.data.index + 1 });
    console.log("点赞"); return
  },
  /**
   * 页面的初始数据
   */
  data: {
    mm:"a",
      // 点赞个数
      index:0,
      // 第一个发布者图片
      tabUserImg:[
        {src:"../images/carousel/05.jpg"},
        {src:"../images/carousel/06.jpg"},
        {src:"../images/carousel/07.jpg"},
      ],
      // 第二个发布者图片
      stabUserImg:[
        {src:"../images/carousel/07.jpg"},
      ],
      //第三个发布者信息
      ttabUserImg:[
        {src:"../images/carousel/05.jpg"},
        {src:"../images/carousel/06.jpg"},
        {src:"../images/carousel/07.jpg"},
        {src:"../images/carousel/05.jpg"},
        {src:"../images/carousel/06.jpg"},
        {src:"../images/carousel/07.jpg"},
        {src:"../images/carousel/05.jpg"},
        {src:"../images/carousel/06.jpg"},
        {src:"../images/carousel/07.jpg"},
      ],
      // 第四个发布者信息 
    ftabUserImg: [
      { src: "../images/carousel/05.jpg" },
      // { src: "../images/carousel/06.jpg" },
      // { src: "../images/carousel/07.jpg" },
      // { src: "../images/carousel/05.jpg" },
      // { src: "../images/carousel/06.jpg" },
      // { src: "../images/carousel/07.jpg" },
      // { src: "../images/carousel/05.jpg" },
      // { src: "../images/carousel/06.jpg" },
      // { src: "../images/carousel/07.jpg" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that=this
      var zz = this.data.ftabUserImg.length
    var mm = this.data.mm
    // var that=this
    if(zz == 1) {
    this.setData({
      mm : "b"
      })
      // console.log(zz.length)
    } else if(zz > 1 && zz <5) {
      this.setData({

  mm : "c"
      })
} else {
  this.setData({

  mm : "a"
  })
}
console.log(this.data.ftabUserImg.length)
console.log(mm)
    // })
  },
change:function(){
  // var zz=data.ftabUserImg
  // var mm=data.mm
  // if (zz.length == 1) {
  //   mm = b
  //   console.log(zz.length)
  //   return
  // } else if (zz.length > 1 || zz.length < 5) {
  //   mm = "c"
  // } else {
  //   mm = "a"
  // }
  
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