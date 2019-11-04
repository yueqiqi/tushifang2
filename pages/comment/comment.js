// pages/comment/comment.js
Page({
  // 发布评论
  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  //隐藏输入框
  onHideInput: function () {
    this.setData({
      showInput: false
    })
    console.log('hide+++++++++++')
  },

  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
  },

})