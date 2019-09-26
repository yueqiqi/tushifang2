// pages/Ac/jobs/jobs.js
Page({
  //  // ======================================================
  // 工作年限
  // 下拉选项框
  selectTap4(e) {
    this.setData({
      selectShow4: !this.data.selectShow4
    });
    // console.log(e)
  },
  // 点击下拉列表
  optionTap4(e) {

    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index4: Index,
      selectShow4: !this.data.selectShow4,
    });
  },
  // ======================================================
  // ======================================================
  // 求职状态
  // 下拉选项框
  selectTap3(e) {
    this.setData({
      selectShow3: !this.data.selectShow3
    });
    // console.log(e)
  },
  // 点击下拉列表
  optionTap3(e) {
  
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index3: Index,
      selectShow3: !this.data.selectShow3,
    });
  },
  // ======================================================
  // ======================================================
  // 薪资待遇
  // 下拉选项框
  selectTap2(e) {
    this.setData({
      selectShow2: !this.data.selectShow2
    });
    // console.log(e)
  },
  // 点击下拉列表
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      indexs: Index,
      selectShow2: !this.data.selectShow2,
    });
  }, 
  // ======================================================
  // =========================================================
  // 双击
  doubleClick: function (e) {
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time  // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据
    console.log(e)
    if (curTime - lastTime > 0) {
    if (curTime - lastTime < 500) {
      this.setData({
        isDisabled: false
      })
    } }
    this.setData({
      lastTapTime: curTime
    })
  },
 
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
    // console.log(Index)
    // console.log(e)
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
    });
    
    console.log(this.data.isDisabled)
  }, 
  // =========================================================
  formSubmit:function(e){
    console.log(e.detail.value)
    var m = e.detail.value
    console.log(e.detail.value);
    if (m.i1 == "" || m.i2 == "" || m.i3 == "" || m.i4 == "" || m.i5 == "" || m.i6==""||m.textarea.length==0) {
      this.hidePopup(false);
    } else {
      this.suhide(false);
    }
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 工作年限
    selectData4: ['请选择工作年限', "1年以下", "1~3年", "3~5年", "5年以上"],//下拉列表的数据
    selectShow4: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index4: 0,//选择的下拉列表下标
    // 求职状态
    selectData3: ['请选择求职状态', "离职随时到岗","在职-月内到岗","在职-考虑机会","在职-暂不考虑"],//下拉列表的数据
    selectShow3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index3: 0,//选择的下拉列表下标
    // 薪资待遇
    selectData2: ['请选择薪资待遇', '1000~3000', '3000~5000', "5000~7000", "7000~9000","9000元及以上"],//下拉列表的数据
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    indexs: 0,//选择的下拉列表下标
    // 双击事件
    lastTapTime: 0,
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['', '职位', '职位', "职位","职位"],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
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