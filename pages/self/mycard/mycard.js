// pages/self/mycard/mycard.js
import request from '../../login.js'
Page({
  /* 失败函数隐藏弹窗 */
  // 浏览图片
  look:function(e){
    var that=this
    var index=e.currentTarget.dataset.index
    console.log(index)
    var imgList=that.data.img
    console.log(e)
    wx.previewImage({
      current: index,//当前点击的图片链接
      urls: imgList//图片数组
    })
  },
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
    var that=this
    var e=this.data
    if (e.name == "" || e.post == "" || e.company == "" || e.email == "" || e.phone == "" || e.add == "" || e.title == ""){
      this.hidePopup(false);

    }else{
      var uid=wx.getStorageSync('uid');
      var touid=that.data.uid
      request({
        url:'/home/personal/do_business_card',
        data:{
          uid,
          touid
      }
    }).then(res=>{
      console.log('调用回递名片成功',res)
      if(res.data.code==0){
        wx.showToast({
          title: '回递成功',
          icon: 'success',
          duration: 1500,
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        });
      }       
    }).catch(err=>{
      console.log('调用失败')
    })
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
    // ++++++++++++++++++++++调用名片详情+++++++++++++++++++++++++++++++
    var uid=options.uid
    this.setData({
      uid,
    })
    request({
      url:'/home/personal/do_card_info',
      data:{
       uid 
      }
      }).then(res=>{
      console.log('调用名片详情成功',res)
      this.setData({
        head:res.data.data.head1,
        name:res.data.data.nickname,
        post:res.data.data.company_position,
        com:res.data.data.corporate_name,
        email:res.data.data.email,
        phone:res.data.data.phone,
        address:res.data.data.detailed_address,
        textarea:res.data.data.info,
        img:res.data.data.img_url_arr,  
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // ++++++++++++++++++++++调用名片详情+++++++++++++++++++++++++++++++
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
  onShareAppMessage: function (res) {
    var that=this
      var uid=that.data.uid
    console.log('分享',res)
    return {
      title: '包程项',//弹出分享时显示的分享标题
      path: '/pages/self/mycard/mycard?uid='+uid,//'/page/user?id=123' // 路径，传递参数到指定页面。
      desc: '个人名片',
      success: function (res) {
        console.log('分享成功',ops)
       }
    }
  }
})