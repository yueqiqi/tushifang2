// pages/store/product/product.js
Page({
  // 价格变化
  onChange: function (e) {
    // 获取输入框的值
    console.log(e.detail)
    var num = e.detail
    var p = this.data.price
    this.setData({
      price: 199 * num

    })
    return
    console.log()
  },
  // 型号
  size(e) {
    let index = e.currentTarget.dataset.index
    var bool = this.data.size[index].checked
    var f = this.data.size[index].disabled
    this.setData({
      ['size[' + index + '].checked']: !bool,
      // ['color[11].disabled']:true
    })
    // if(){
    //   console.log(123)
    // }
    console.log(index, bool, ['size[' + index + '].checked'], f)
  },
  // 颜色
  choose(e) {
    let index = e.currentTarget.dataset.index
    var bool = this.data.color[index].checked
    var f = this.data.color[index].disabled
    this.setData({
      ['color[' + index + '].checked']: !bool,
      // ['color[11].disabled']:true
    })
    // if(){
    //   console.log(123)
    // }
    console.log(index, bool, ['color[' + index + '].checked'], f)
  },

  //点击我显示底部弹出框
  // pay: function () {
  //   this.showModal();
  // },
pay:function(){
  this.showModal()
},
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    // 价格
    price: 199,
    // 型号
    size: [
      {
        size: "sm",
        disabled: false,
        checked: false
      },
      {
        size: "s",
        disabled: false,
        checked: false
      },
      {
        size: "s",
        disabled: false,
        checked: false
      },
      {
        size: "l",
        disabled: false,
        checked: false
      },
      {
        size: "xl",
        disabled: true,
        checked: false
      },
    ],
    // 颜色
    color: [
      {
        color: "红色",
        checked: false,
        disabled: false
      },
      {
        color: "黄色",
        checked: false,
        disabled: false
      },
      {
        color: "白色",
        checked: false,
        disabled: false
      },
      {
        color: "绿色",
        checked: false,
        disabled: false
      },
      {
        color: "绿色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: false
      },
      {
        color: "灰色",
        checked: false,
        disabled: false
      },
      {
        color: "橘色",
        checked: false,
        disabled: false
      },
      {
        color: "彩色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: false
      },
      {
        color: "紫色",
        checked: false,
        disabled: true
      },
    ],
    imgUrls: [
      {
        link:"../index/index",
        url:"../../images/carousel/02.jpg",
      },
      {
        link: "./product",
        url: "../../images/carousel/03.jpg",
      },
      {
        link: "../index/index",
        url: "../../images/carousel/04.jpg",
      },
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
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