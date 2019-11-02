// pages/Ac/diver/diver.js
import request from "../../login.js"
Page({
chp:function(){
  this.setData({
    mz:fasle
  })
},
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
    var that=this
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log("下拉选项的东西",that.data.selectData[Index])
    that.setData({
      type:that.data.selectData[Index].title
    })
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
  /* 失败函数隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  // 下一步
  next: function () {
    
  },
  // 提交
o1:function(e){
  if(e.detail.value.length==1){
    this.setData({
      fo2:"true"
    })
  }
},
  o2: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        fo3: "true"
      })
    }
  },
  o3: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        fo4: "true"
      })
    }
  },
  o4: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        fo5: "true"
      })
    }
  },
  o5: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        fo6: "true"
      })
    }
  },
  o6: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        fo7: "true"
      })
    }
  },
  o7: function (e) {
    if (e.detail.value.length == 1) {
      this.setData({
        fo8: "true"
      })
    }
  },
  formSubmit: function (e) {
    var that=this
    var a=e.detail.value
    console.log(e)
    console.log(e.detail.value)
    console.log(e.detail.value.i2)
    /**
     * 后台提交
     */
    // 司机类型
    var identity_selection=a.input
    // 真实姓名
    var real_name=a.i2
    // 联系电话
    var tel =a.i3
    // 车辆id
    var vehicle_id=a.i4
    // 车牌号
    var car_number=a.c1+a.c2+a.c3+a.c4+a.c5+a.c6+a.c7+a.c8
    // 
    if (a.input == "" || a.i2 == "" || a.i3 == "" || a.i4 == "" || a.c1 == "" || a.c2 == "" || a.c3 == "" || a.c4 == "" || a.c5 == "" || a.c6 == "" || a.c7 == ""){
      // 判断其中一个输入框的值 如果有一个为空就调用错误函数
      this.hidePopup(false);
    }else{
      wx.navigateTo({
        url: '/pages/Ac/diver2/diver2?identity_selection='+identity_selection+"&real_name="+real_name+"&tel="+tel+"&vehicle_id="+vehicle_id+"&car_number="+car_number,
      })
    }
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
    username: "",
    fo1: "false",
    fo2: "false",
    fo3: "false",
    fo4: "false",
    fo5: "false",
    fo6: "false",
    fo7: "false",
    fo8: "false",
    mz:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var phone=wx.getStorageSync('userphone');
    that.setData({
      phone,
    })
    request({
      url:'http://tsf.suipk.cn/home/Personal/do_id_type',
      data:{
        type:3
      }
      }).then(res=>{
      console.log('调用司机类型成功',res)
      this.setData({
        selectData:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
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

  },
 
})
