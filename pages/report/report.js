// pages/report/report.js
Page({

  // /**
  //  * 字数限制
  //  */
  // inputs: function (e) {
  //   // 获取输入框的内容
  //   var value = e.detail.value;
  //   // 获取输入框内容的长度
  //   var len = parseInt(value.length);
  //   //最少字数限制
  //   if (len < this.data.min) {
  //     this.setData({
  //       texts: "请至少要输入5个字哦"
  //     })
  //   } else if (len >= this.data.min) {
  //     this.setData({
  //       texts: " "
  //     })
  //   }
  //   //最多字数限制
  //   if (len > this.data.max) return;
  //   // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
  //   this.setData({
  //     currentWordNumber: len //当前字数  
  //   });
  // },
  // /**
  //  * 上传图片方法
  //  */
  // upload: function () {
  //   let that = this;
  //   wx.chooseImage({
  //     count: 9, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: res => {
  //       wx.showToast({
  //         title: '正在上传...',
  //         icon: 'loading',
  //         mask: true,
  //         duration: 1000
  //       })
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       let tempFilePaths = res.tempFilePaths;

  //       that.setData({
  //         tempFilePaths: tempFilePaths
  //       })
  //       /**
  //        * 上传完成后把文件上传到服务器
  //        */
  //       var count = 0;
  //       for (var i = 0, h = tempFilePaths.length; i < h; i++) {
  //         //上传文件
  //         /*  wx.uploadFile({
  //             url: HOST + '地址路径',
  //             filePath: tempFilePaths[i],
  //             name: 'uploadfile_ant',
  //             header: {
  //               "Content-Type": "multipart/form-data"
  //             },
  //             success: function (res) {
  //               count++;
  //               //如果是最后一张,则隐藏等待中  
  //               if (count == tempFilePaths.length) {
  //                 wx.hideToast();
  //               }
  //             },
  //             fail: function (res) {
  //               wx.hideToast();
  //               wx.showModal({
  //                 title: '错误提示',
  //                 content: '上传图片失败',
  //                 showCancel: false,
  //                 success: function (res) { }
  //               })
  //             }
  //           });*/
  //       }

  //     }
  //   })
  // },
  // /**
  //  * 预览图片方法
  //  */
  // listenerButtonPreviewImage: function (e) {
  //   let index = e.target.dataset.index;
  //   let that = this;
  //   console.log(that.data.tempFilePaths[index]);
  //   console.log(that.data.tempFilePaths);
  //   wx.previewImage({
  //     current: that.data.tempFilePaths[index],
  //     urls: that.data.tempFilePaths,
  //     //这根本就不走
  //     success: function (res) {
  //       //console.log(res);
  //     },
  //     //也根本不走
  //     fail: function () {
  //       //console.log('fail')
  //     }
  //   })
  // },
  // /**
  //  * 长按删除图片
  //  */
  // deleteImage: function (e) {
  //   var that = this;
  //   var tempFilePaths = that.data.tempFilePaths;
  //   var index = e.currentTarget.dataset.index;//获取当前长按图片下标
  //   wx.showModal({
  //     title: '提示',
  //     content: '确定要删除此图片吗？',
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('点击确定了');
  //         tempFilePaths.splice(index, 1);
  //       } else if (res.cancel) {
  //         console.log('点击取消了');
  //         return false;
  //       }
  //       that.setData({
  //         tempFilePaths
  //       });
  //     }
  //   })
  // },
  
  /**
  * 弹窗
  */

  showDialogBtn: function () {



    this.setData({

      showModal: true

    })

  },

  /**
  * 弹出框蒙层截断touchmove事件
  */

  preventTouchMove: function () {

  },

  /**
  * 隐藏模态对话框
  */

  hideModal: function () {

    this.setData({

      showModal: false

    });

  },

  /**
  * 对话框取消按钮点击事件
  */

  onCancel: function () {

    this.hideModal();

  },

  /**
  * 对话框确认按钮点击事件
  */

  onConfirm: function () {

    wx.showToast({

      title: '提交成功',

      icon: 'success',

      duration: 2000

    })

    this.hideModal();

  },
  /**
   * 页面的初始数据
   */
  data: {
    texts: "",
    min: 5,//最少字数
    max: 100, //最多字数 (根据自己需求改变)
    tempFilePaths: []
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