// pages/Ac/hiring/hiring.js
Page({
  
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
          isDisabled: false,
          hidden:true
        })
      }
    }
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
  // 判断form表单中的东西
  formSubmit: function (e) {
    var m = e.detail.value
    console.log(e.detail.value);
    if (m.i1 == "" || m.i2 == "" || m.i3 == "" || m.i4 == "" || m.i5 == "" || m.i5 == "" || m.i6 == "" || m.i7 == "" || m.i8 == "" || this.data.tempFilePaths.length ==0 || this.data.tempFilePathss == "" || m.textarea.length==0) {
      this.hidePopup(false);
    } else {
      this.suhide(false);
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
  next: function () {

  },
  // ====================================================================
  /**
       * 上传视频方法
       */
  uploads: function () {
    let that = this;
    wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePath;

        that.setData({
          tempFilePathss: tempFilePath
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        // for (var i = 0, h = tempFilePath; i < h; i++) {
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
        // }

      }
    })
  },
  // uploadvideo: function () {
  //   var src = this.data.src;
  //   wx.uploadFile({
  //     url: '**************/Upload', //服务器接口
  //     filePath: src,
  //     header: {
  //       'content-type': 'multipart/form-data'
  //     },
  //     name: 'files',
  //     success: function (res) {
  //       console.log(res.data)
  //     },
  //     fail: function () {
  //       console.log('接口调用失败')
  //     }
  //   })
  // },
  /**
 * 长按删除图片
 */
  deleteVideo: function () {
    var that = this;
    var tempFilePaths = that.data.tempFilePathss;
    wx.showModal({
      title: '提示',
      content: '确定要删除此视频吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths="";
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePathss: tempFilePaths
        });
      }
    })
  },
// ?=============================================================================
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
  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示下拉图片
    hidden:false,
    // 求职状态
    selectData3: ['请选择工作年限', "1年以下", "1~3年", "3~5年", "5年以上"],//下拉列表的数据
    selectShow3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index3: 0,//选择的下拉列表下标
    // 薪资待遇
    selectData2: ['请选择薪资待遇', '1000~3000', '3000~5000', "5000~7000", "7000~9000", "9000元及以上"],//下拉列表的数据
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    indexs: 0,//选择的下拉列表下标
    // 双击事件
    lastTapTime: 0,
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['', '职位', '职位', "职位", "职位"],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    // 图片路径
    tempFilePaths: [],
    tempFilePathss:"",
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