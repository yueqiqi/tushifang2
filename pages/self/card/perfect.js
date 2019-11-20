// pages/self/card/perfect.js
import request from '../../login.js'
Page({
  // 地址
  address: function (e) {
    var value = e.detail.value
    console.log(value)
    this.setData({
      address: value
    })
  },
  // 邮箱
  email: function (e) {
    var value = e.detail.value
    this.setData({
      email: value
    })
  },
  // 职位信息
  post:function(e){
    var value = e.detail.value
    this.setData({
      post: value
    })
  },
  // 公司名称
  com:function(e){
    var value = e.detail.value
    this.setData({
      com: value
    })
  },
  // 电话更改
  phone:function(e){
    var value = e.detail.value
    this.setData({
      phone: value
    })
  },
  // 名字更改
  name:function(e){
    console.log(e.detail.value)
    var value = e.detail.value
    this.setData({
      name:value
    })
  },
  // 
  /* 失败函数隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /**
      * 上传图片方法
      */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 3, // 默认9
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
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
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
                img_url_arr:a
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
  // 改变全局窗口
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  },
  // 更换电话号码
  ch:function(){
    var that=this
    that.setData({
      phone:"",
      sisDisabled:false,
      focus:true
    })
  },
  // 表单提交数据
  mes:function(e){
    var e=e.detail.value
    console.log(e)
    if (e.name == "" || e.phone == "" || e.com == "" || e.post == "" || e.email == "" || e.address == ""){
      console.log("有空")
      // 判断其中一个输入框的值 如果有一个为空就调用错误函数
      this.hidePopup(false);
    }else{
      var that=this
    // // ？+++++++++++上传头像+++++++++++++++++++++++++++++
    var nickname=e.name
    var phone=e.phone
    var corporate_name=e.com
    var company_position=e.post
    var email=e.email
    var detailed_address=e.address
    var info=e.textarea
    var head1=that.data.heads1
    var p=that.data.img_url_arr
    if(p==undefined){
      var img_url_arr=""
    }else {
      // console.log(that.data.img_url_arr)
      var z=p.join('|')
      var img_url_arr=z
      console.log(z)
    }
    var share_id=1
    // ////////////////////////////////////////////////////
      var updata = that.data.userinfo
      that.data.userinfo.push(e);
      var uid=wx.getStorageSync('uid');
      // console.log(updata)
      // ////////////////////////////////////////////////////
      wx.showModal({
        title: '是否保存',
        content: '确认保存该名片吗？',
        success: function (res) {
          if (res.confirm) {
            // ===================完善名片++++++++++++++++++++++++++++
            request({
              url:'/home/personal/do_add_perfect',
              data:{
                uid,
                share_id,
                head1,
                nickname,
                phone,
                corporate_name,
                company_position,
                email,
                detailed_address,
                info,
                img_url_arr
              }
              }).then(res=>{
              console.log('调用完善名片成功',res)
              if(res.data.code==0){
                wx.navigateBack({
                  delta: 1
                });
              }else{
                that.hidePopup(false);
                that.setData({
                  model:res.data.msg
                })
              }
              }).catch(err=>{
              console.log('调用失败')
            })
            // ===================完善名片++++++++++++++++++++++++++++

              // /////////////////////////////////////////////////////////////////////////////////////////
              // 本地储存名片
              // /////////////////////////////////////////////////////////////////////////////////////////
          } else {
            //  that.onShow();
           console.log("用户点击了取消")
            getCurrentPages()[getCurrentPages().length - 1].route.onLoad
          }
        }
      })
    }
  },
  choose: function () {
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
          head: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        // var a=[]
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
              console.log("检验头像图片上传",res)
              // count++;
              var qwe=res.data
              var resl=JSON.parse(qwe)
              // a.push(resl.data)
              console.log("返回头像值",resl.data)
              that.setData({
                heads1:resl.data
              })
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
          })

      }
    })
  },


  // +++++++++++++++++++上传头像+++++++++++++++++++++++++++++++++++++
  
  // +++++++++++++++++++上传头像+++++++++++++++++++++++++++++++++++++
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
    if (Index == 2) {
      this.setData({
        isDisabled: false,
        hidden:true,
        selectData:"",
        focus:true
      })
    }
    console.log(this.data.isDisabled)
  }, 
  /**
   * 页面的初始数据
   */
  data: {
    model:'请完善信息',
    userinfo:[],
    // 公司信息
    com:"",
    // 职位信息
    post:"",
    // 邮箱
    email:"",
    // 地址
    address:"",
    hidden:false,
    // 用户名
    name:"",
    // 错误提示框
    popup: true,
    // 图片保存
    tempFilePaths: [],
    // 聚焦
    focus:false,
    // 电话号码
    phone:13500000000,
    // input禁用  
    sisDisabled: true,
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['您好，这是我的电子名片，望惠存', '这是我的电子名片，一键保存', "自定义编辑"],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    // 头像
    head: "",
    // 
    focus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ++++++++++++++++++完善我的名片++++++++++++++++++++++++++
    var phone=wx.getStorageSync('userphone')
    this.setData({
      phone,
    })
    // ++++++++++++++++++完善我的名片++++++++++++++++++++++++++
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
    console.log(this.data.tempFilePaths)
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
    var that=this
    var e=that.data
    console.log("用户昵称："+e.name,"职位信息："+e.post,"公司信息："+e.com,"邮箱："+e.email,"电话号码："+e.phone,"地址："+e.address)
    var that=this
    console.log("这是储存数据"+that.data.userinfo)
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