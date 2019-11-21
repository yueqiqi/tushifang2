// pages/demo/calert/calert.js
Page({
  /* 隐藏弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  /* 显示弹窗 */
  show() {
    this.hidePopup(false);
  },

  /**
   * 页面的初始数据
   */
  data: {
    popup: true

  },

})