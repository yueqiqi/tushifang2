// pages/self/card/perfect.js
Page({
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
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          /*  wx.uploadFile({
              url: HOST + '地址路径',
              filePath: tempFilePaths[i],
              name: 'uploadfile_ant',
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                count++;
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
            });*/
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
    if (e.i2 == "" || e.i3 == "" || e.i4 == "" || e.i5 == "" || e.i6 == "" || e.i7 == "" || e.textarea == "" || this.data.tempFilePaths.length==0){
      console.log("有空")
      // 判断其中一个输入框的值 如果有一个为空就调用错误函数
      this.hidePopup(false);
    }else{
      console.log("提交成功");
    }
  },
  // 选择头像
  choose:function(){
    var that=this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        console.log(res.tempFilePaths[0])
        var mm=res.tempFilePaths[0]
        that.setData({
          head:mm
        })
      },
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
    hidden:false,
    // 用户名
    name:"用户昵称",
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
    head: "../../images/carousel/02.jpg",
    // 
    focus:false
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