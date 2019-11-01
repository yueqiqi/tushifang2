Page({
  data:{
    img:[]
  },
  img:function(){
    wx.chooseMessageFile({
      count: 3,
      type: 'file',
      success(res) {
        console.log("选择结果",res)
        console.log(res.tempFiles[0].path)
        wx.uploadFile({
          url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img', //仅为示例，非真实的接口地址
          filePath: res.tempFiles[0].path,
          data:{
            image: res.tempFiles[0]
          },
          name: 'file',
          success(res) {
            console.log("结果",res)
            //json字符串 需用JSON.parse 转
          }
        })
      }
    })
  }
})