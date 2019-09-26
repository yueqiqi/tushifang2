// pages/demo/calert/calert.js
Page({
  /* 隐藏弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  /* 显示弹窗 */
  sushow() {
    this.suhide(false);
  },

  /**
   * 页面的初始数据
   */
  data: {
    sup: true

  },

})