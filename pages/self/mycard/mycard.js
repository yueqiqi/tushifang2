// pages/self/mycard/mycard.js
Page({
  /* 失败函数隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  // /* 显示弹窗 */
  // showPopup() {
  //   this.hidePopup(false);
  // },
  back:function(){
    var e=this.data
    console.log(e.name,e.post,e.company,e.email,e.phone,e.add,e.title,e.titleText,e.img.length)
    if (e.name == "" || e.post == "" || e.company == "" || e.email == "" || e.phone == "" || e.add == "" || e.title == "" || e. titleText == "" ||e.img.length==0){
      this.hidePopup(false);
    }
  },
  // =============================================================================
  // 加入参数
  //转发
  // onShareAppMessage: function(res) {
  //   if (res.from === 'button') {

  //   }
  //   return {
  //     title: '转发',
  //     path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list,
  //     success: function (res) {
  //       console.log('成功', res)
  //     }
  //   }
  // },
  // =============================================================================
  // 存入手机通讯录
  addPhone: function () {
    let that = this;
    // 添加到手机通讯录
    wx.addPhoneContact({
      firstName: that.data.name,//联系人姓名
      mobilePhoneNumber: that.data.phone,//联系人手机号
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 错误提示框
    popup: true,
    // 图片
    img:[
      "../../images/carousel/05.jpg",
      "../../images/carousel/06.jpg",
      "../../images/carousel/07.jpg",
      // "../../images/carousel/07.jpg",
    ],
    // 图文介绍信息
    titleText: "主要在渝北江北地区跑，住在渝北两路熟悉渝北路线的优先，杰斯430.22方，工资7000保底三万开提10%，每月工资兑现，新手和找车练手的就不要打扰了。",
    // 图文介绍标题
    title:"招聘渣车司机10名",
    // 地址
    add:"重庆市 渝北区",
    // 电话
    phone:"13500000000",
    // 邮箱
    email:"123456789@163.com",
    // 公司名字
    company:"重庆立诚达科技有限公司",
    // 职位
    post:"设计师",
    // 昵称
    name:"用户昵称",
    // 头像
    head:"../../images/carousel/03.jpg",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    console.log("options",options)
    let id=options.jsonStr
    console.log("id",id)
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