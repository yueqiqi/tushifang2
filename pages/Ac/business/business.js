// pages/Ac/business/business.js
Page({

// ==================================================
// 下拉选项框
  selectTap(e) {
    this.setData({
      selectShow: !this.data.selectShow
    });
    // console.log(e)
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
    });
    if (Index == 4) {
      this.setData({
        isDisabled: false
      })
    } return
    console.log(this.data.isDisabled)
  }, 
// ==================================================
  
  next:function(){
    
  },
  // 获取form表单的数据
  formSubmit:function(e){
    var m = e.detail.value
    console.log(e.detail.value);
    // 获取输入框的值
    if (m.i1 == "" || m.i2 == "" || m.i3 == "" || m.i4 == "") {
      // 判断其中一个输入框的值 如果有一个为空就调用错误函数
      this.hidePopup(false);
    } else {
    wx.navigateTo({
      url: '/pages/Ac/business2/business2',
    })
     
    }

    console.log(e.detail.value)
    console.log(e.detail.value.i2)
    // if (e.detail.value.i2==""){
    //   var that=this
    //   this.setData({
    //     err:"err"
    //   })
    //   console.log("空")
    // }
  },

  /* 失败函数隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['请选择类型', '身份类型', '身份类型', "身份类型", "自定义编辑"],//下拉列表的数据
    index: 0,//选择的下拉列表下标

    // 错误提示框
    popup: true,
    // 输入内容为空
    // err:"",
    username:"",
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