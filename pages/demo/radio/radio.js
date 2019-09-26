// pages/demo/radio/radio.js
Page({
  selectClick: function (event) {
    // this.data.model[event.currentTarget.id].selectImage
    for (var i = 0; i < this.data.model.length; i++) {
      if (event.currentTarget.id == i) {

        this.data.model[i].selectImage = true
      }
      else {
        this.data.model[i].selectImage = false
      }
    }
    this.setData(this.data)
  },
  /**
   * 页面的初始数据
   */
  data: {
    model: [
      {
        image: '../../images/add.png',
        title: '挂牌',
        sub_title: '进行松香交易，松香买卖。。。',
        selectImage: false
      },
      {
        image: '../../images/del.png',
        title: '贸易',
        sub_title: '根据需求，快速的为您提供服务',
        selectImage: true
      }
    ]

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