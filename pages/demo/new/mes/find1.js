// pages/demo/new/mes/search.js
Page({
  close: function () {
    wx.switchTab({
      url: '/pages/body/body',
    })
    console.log("關閉弹窗")
  },
  // 上一步
  up: function () {
    wx.navigateBack({

    })
  },
  // 下一步
  next: function () {
    console.log(123)
    wx.navigateTo({
      url: '/pages/demo/new/mes/find2',
      success: (result)=>{
      
      },
      fail: (err)=>{
        console.log(err)
      },
      complete: ()=>{}
    });
  },
  /**
   * 页面的初始数据
   */
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  data: {
    currentData: 0,
    activeIdx: 1,
  },


})