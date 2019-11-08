Page({
  data:{
    objectArray: [],
    class: "请选择分类",
  },
  bindPickerChange: function (e) {
    var that = this
    var e = e.detail.value
    this.setData({
      index: e,
      class: that.data.objectArray[e].title
    })
    console.log("保存的分类", this.data.class)
  },
  onLoad:function(){
    var that=this
    wx.request({
      url: 'http://tsf.suipk.cn/home/Personal/do_id_type',
      data: {
        type: 1,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('调用工种成功', res.data.data)
        that.setData({
          objectArray: res.data.data
        })
        console.log()
      }, fail: function () {
        console.log('调用失败')
      }
    })
  }
})