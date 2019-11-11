// pages/Ac/self/self.js
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
var model = require('../../../model/model.js')
import request from "../../login.js"
var ashow = false;
var item = {};
Page({
  chp:function(){
    this.setData({
      mz:false
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  // /获取地理位置
  getlocation: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        let province = res.result.address_component.province;//省份
        let city = res.result.address_component.city;//城市
        let district = res.result.address_component.district
        that.setData({
          location: province + city + district
        })
      },
    })
  },
  bindPickerChange: function (e) {
    var that = this
    var e = e.detail.value
    this.setData({
      index: e,
      class: that.data.objectArray[e].title,
      hiddex:true
    })
    console.log("保存的分类", this.data.class)
  },
  backs:function(){
    wx.redirectTo({
      url: '/pages/Ac/index/inex',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  // 表单提交
  formSubmit: function (e){
    var that=this
    var m=e.detail.value
    /**
     * 提交后台
     */
    // 身份选择
    var identity_selection=that.data.class
    // 真实信命
    var real_name=m.i2
    // 联系电话
    var tel=m.i3
    // 所在区域
    var province=that.data.province
    var city=that.data.city
    var county=that.data.county
    var region=province+city+county
    // 详细地址
    var detailed_address=m.i5
    // 身份证照片
    if(this.data.tempFilePaths.length<2){
      console.log(that.data.identity_card)
    }else{
      var p=that.data.identity_card
      var z=p.join('|')
      var identity_card=z
    }
    console.log(e.detail.value, that.data.province);
    if (that.data.class== "请选择份类型" || m.i2 == "" || m.i3 == "" || m.i5 == "" || this.data.tempFilePaths.length<2||this.data.province==""){
      this.hidePopup(false);
    }else{
      var uid=wx.getStorageSync('uid');
      request({
        url:'http://tsf.suipk.cn/home/personal/do_personal',
        data:{
          uid,
        identity_selection,
        real_name,
        tel,
        region,
        detailed_address,
        identity_card
      }
    }).then(res=>{
      console.log('调用成功',res)
      // if(res.data.code==101&&res.data.code==0){
          that.suhide(false);
        // }
      }).catch(err=>{
      console.log('调用失败')
      })
    }
    console.log(this.data.tempFilePaths.length)
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  next: function () {
    
  },

  /**
       * 上传图片方法
       */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let imgs = that.data.tempFilePaths.concat(tempFilePaths)
        if (imgs.length>1){
          that.setData({
              showupload:false
          })
      }
        that.setData({
          tempFilePaths: imgs
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        var a =[]
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          wx.uploadFile({
            url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            filePath: tempFilePaths[i],
            name: 'image',
            method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
            success: function (res) {
              // console.log(that.data.tempFilePaths[1])
              console.log("检验图片上传",res)
              count++;
              var qwe=res.data
              var resl=JSON.parse(qwe)
              a.push(resl.data)
              console.log("返回值",resl,a)
              that.setData({
                identity_card:a
              })
              //如果是最后一张,则隐藏等待中  
              if (count == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }

      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
  },
  /**
   * 长按删除图片
   */
  deleteImage: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (tempFilePaths.length<2){
          that.setData({
              showupload:true
          })
      }
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  /**
   * 页面的初始数据
   */
  mmm:function(e){
    console.log(e)
  },
  data: {
    /**
     * 隐藏上传按钮
     */
    showupload:true,

    objectArray: [],
    class: "请选择身份类型",
    mz:true,
    province:"",
    // ///////////////////////////////////////
    item: {
      ashow: ashow
    },
    // ///////////////////////////////////////
    show: false,
    // 是否隐藏
    hidden:false,
    // 地址
    location: "",
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [
      {id:1,title:"重庆"},
      {id:2,title:"成都"},
      {id:3,title:"北京"}
    ],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    //成功 提示框
    sup: true,
    // 错误提示框
    popup:true,
    // 图片路径
    tempFilePaths: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()
    
  },
  //更新顶部展示的数据
  updateShowData: function (e) {
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
    console.log("最后选择的",this.data.province,this.data.city,this.data.county);
  }
  ,
  onReachBottom: function () {
  },
  nono: function () { },

  onLoad: function (options) {
    
    var that=this
    var phone=wx.getStorageSync('userphone');
    that.setData({
      phone
    })
    request({
      url:'http://tsf.suipk.cn/home/Personal/do_id_type',
      data:{
      type:2,
      }
      }).then(res=>{
      console.log('调用身份选择成功',res)
      that.setData({
        objectArray:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
})