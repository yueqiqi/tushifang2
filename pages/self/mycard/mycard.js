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
    img:[],
    // 图文介绍信息
    textarea: "",

    // 地址
    address:"",
    // 电话
    phone:"",
    // 邮箱
    email:"",
    // 公司名字
    com:"",
    // 职位
    post:"",
    // 昵称
    name:"",
    // 头像
    head:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    // console.log("options",options)
    // let id=options.jsonStr
    // console.log("id",id)
    console.log(options)
    var head=options.head
    var name=options.name
    var post=options.post
    var com=options.com
    var email=options.email
    var phone=options.phone
    var address=options.address
    var textarea=options.textarea
    var img=options.imgs
    var imgs=img.split('-')
    console.log(img)
    that.setData({
      head,
      name,
      post,
      com,email,phone,address,textarea,img:imgs
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