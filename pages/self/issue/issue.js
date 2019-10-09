// pages/self/issue/issue.js
Page({
  /* 隐藏弹窗 */
  nsuhide(flag = true) {
    this.setData({
      "nsup": flag
    });
  },
  /* 显示弹窗 */
  nsushow() {
    this.nsuhide(false);
  },
  // /////////////////////////////////////////////////////////////////////
  // 时间分类
  // 结束
  ebindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      edates: e.detail.value
    })
  },
  // 开始
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 第二个单选
  seonChange(e) {
    this.setData({
      seradio: e.detail
    });
    console.log(e.detail)
  },
  // 单选框
  sonChange(e) {
    this.setData({
      sradio: e.detail
    });
    console.log(e.detail)
  },
  /* 隐藏弹窗 */
  sssuhide() {
    this.setData({
      "sssup": true
    });
    console.log("隐藏弹框")
    var zzz = this.data
    // console.log(zzz.sradio,zzz.seradio,zzz.dates,zzz.edates)
    if (zzz.sradio == 0, zzz.dates == "请选择开始时间", zzz.edates == "请选择结束时间") {
      this.nsushow()
    }
  },
  /* 显示弹窗 */
  ssushow() {
    console.log("显示弹框")
    this.setData({
      "sssup": false
    })

  },

  // 
  goto:function(e){
    var id = e.currentTarget.dataset.id
    console.log(e)
    console.log(id)
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  },
  // 修改跳转
  up:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '',
    })
  },
//  修改type
change:function(e){
  var that=this
  var id = e.currentTarget.dataset.id
  console.log(id)
  var index="usermes["+id+"].type"
  if(that.data.fin=="改为正在进行"){
  that.setData({
    fin:"已完成",
    [index]:"正在进行"
  })
  }else if(that.data.fin=="已完成"){
    that.setData({
      fin:"改为正在进行",
      [index]:"已完成"
    })
  }
},
  // 我要发布跳转
  iss:function(){
    wx.navigateTo({
      url: '/pages/Ac/post/post',
    })
  },
  // 搜索跳转
  search: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 错误提示
    nsup: true,
    // 消耗积分
    int: 100,
    // 时间分类
    index: 0,
    dates: '请选择开始时间',
    edates: '请选择结束时间',
    sssup: true,
    // 单选框
    sradio: '0',
    seradio: '1',
    // 
    usermes:[
      {
        id:0,
        // 标题
        til:"发布内容标题",
        // 状态
        type:"已完成",
        // 
        
      }
      ],
    fin: "改为正在进行",
    // // 改为正在进行
    // btn:"改为已完成",
    // // 正在进行
    // ing:"正在进行",
    // ing2:"正在进行",
    // // 样式
    // ch: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.ing=="已完成"){
      this.setData({
        ch:1
      })
    }
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