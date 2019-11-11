Page({
  data:{
    imgs:[],
  },
  /**
   * 选择图片
   */
  choose:function(){
    var that=this
    wx-wx.chooseImage({
      count: 3,
      sizeType: [],
      sourceType: [],
      success: function(res) {
        console.log(res)
        let tempFilePaths = res.tempFilePaths
        let imgs = that.data.imgs.concat(tempFilePaths)
        that.setData({
          imgs
        })
      },
    })
  },
})