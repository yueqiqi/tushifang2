
Page({
rote:function(){
  var rote = wx.createAnimation({
    duration: 400,
    timingFunction: "linear",
    // delay: 0
  })
  rote.rotate(45).step()
  this.setData({
    rotez: rote.export(),
  })
  // setTimeout(function () {
  //   rote.rotate(0).step()
  //   this.setData({
  //    rotez: rote.export()
  //   })
  // }.bind(this), 2000)
},
  data: {

  },

})