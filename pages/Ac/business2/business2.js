// pages/Ac/business2/business2.js
import request from "../../login.js"
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'});
Page({
  // /获取地理位置
  getlocation:function(){
    let that=this
    wx.chooseLocation({
      success: function(res) {
        console.log(res.address)
        that.setData({
          location:res.address
        })
      },
    })
  },
  formSubmit:function(e){
    // 打印输入的内容
    var that=this
    console.log(e.detail.value)
    var m = e.detail.value
    /**
     * 请求提交
     */
    // 公司类型
    var identity_selection=that.data.identity_selection
    // 企业名称
    var business_name=that.data.business_name
    // 联系人
    var contacts=that.data.contacts
    // 联系电话
    var tel =that.data.tel
    // 所在地区
    var region=m.i1
    // 详细地址
    var detailed_address=m.i2
    // 成立时间
    var established_time
    if(m.i3==''){
      established_time=''
    }else{
      established_time=m.i3
    }

    var p=that.data.img_url_license
    // console.log(p)
    if(that.data.tempFilePaths==''){
      console.log(that.data.img_url_license)
    }else{
      var z=p.join('|')
      var img_url_license=z
      console.log(z)
    }
    // 营业执照
    // var img_url_license=that.data.img_url_license
    var q=that.data.img_url_certificate
    if(that.data.tempFilePathss==''){
      console.log(that.data.img_url_license)
    }else{
      var w=q.join('|')
      var img_url_certificate=w
      console.log(z)
    }
    var uid=wx.getStorageSync('uid');
    // 法人证明书
    // var img_url_certificate=that.data.img_url_certificate
    console.log("营业执照和证明书",img_url_license,img_url_certificate)
    console.log(e.detail.value);
    if (m.i1 == "" || m.i2 == ""|| this.data.tempFilePaths.length == 0) {
      this.hidePopup(false);
    } else {
      request({
        url:'http://tsf.suipk.cn/home/Personal/do_enterprise',
        data:{
          uid,
          identity_selection,
          business_name,
          contacts,
          tel,
          region,
          detailed_address,
          established_time,
          img_url_license,
          img_url_certificate,
        }
      }).then(res=>{
        console.log('调用企业信息成功',res)
        
          that.suhide(false);
 
          that.hidePopup(false)
        
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

  
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
// 上一步
up:function(){
wx.navigateTo({
  url: '/pages/Ac/business/business',
  success: (result)=>{
    
  },
  fail: ()=>{},
  complete: ()=>{}
});
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
// 法人证明上传图片
  /**
     * 预览图片方法
     */
  listenerButtonPreviewImages: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePathss[index],
      urls: that.data.tempFilePathss,
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
  deleteImages: function (e) {
    var that = this;
    var tempFilePathss = that.data.tempFilePathss;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePathss.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePathss
        });
      }
    })
  },
  uploads: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
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
        let tempFilePathss = res.tempFilePaths;

        that.setData({
          tempFilePathss: tempFilePathss
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        var a =[]
        // for (var i = 0, h = tempFilePathss.length; i < h; i++) {
          //上传文件
          wx.uploadFile({
            url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            filePath: tempFilePathss[0],
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
                img_url_certificate:a
              })
              //如果是最后一张,则隐藏等待中  
              if (count == tempFilePathss.length) {
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
        // }

      }
    })
  },
  // /////////////////////////////////////////////////////////////////////////////
  // 营业执照
  /**
     * 上传图片方法
     */

  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
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

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        var a =[]
        // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          wx.uploadFile({
            url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            filePath: tempFilePaths[0],
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
                img_url_license:a
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
        // }

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
  data: {
    // 地址
    location:"",
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    // 营业执照图片
    tempFilePaths: [],
    // 法人证明执照
    tempFilePathss: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log("接受我是企业1的参数",options)
    that.setData({
      tel:options.tel,
      identity_selection:options.identity_selection,
      business_name:options.business_name,
      contacts:options.contacts
    })
    // 调用接口
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude//纬度
        var longitude = res.longitude//经度
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            let province = res.result.address_component.province;//省份
            let city = res.result.address_component.city;//城市
            let address = res.result.address
            that.setData({
              location: address
            })
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
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