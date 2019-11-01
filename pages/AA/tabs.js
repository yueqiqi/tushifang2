// pages/AA/tabs.js
Page({
  data: {
    tab:[
      {
        id:1,
        title:"选项一"
      },
      {
        id:2,
        title:"选项二"
      },
      {
        id:3,
        title:"选项三"
      },
      
    ]
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    console.log(e)
    var e=e.detail.current
    var tab='tab['+e+'].id'
    that.setData({
      [tab]: e+1
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    var es=e.currentTarget.dataset.current
    console.log("点击",es)
    console.log("滑块"+that.data.tab[es].id)
    var tabs='tab['+es+'].id'
    if (that.data.tab[es].id == e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        [tabs]: e.currentTarget.dataset.current
      })
      console.log(that.data.tab[es].id)
      console.log(e.currentTarget.dataset.current)
    }

  },
})