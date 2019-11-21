// pages/report/report.js
Page({

 

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

})