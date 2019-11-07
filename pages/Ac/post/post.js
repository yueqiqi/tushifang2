// pages/Ac/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info2:[],
    info:[],
  //   arr1:[
  //     {
  //       name:"我要找工作",
  //       link:"/pages/Ac/jobs/jobs?id=1"
  //     },
  //     {
  //       name: "我要招人",
  //       link: "/pages/Ac/hiring/hiring?id=1"
  //     },
  //   ],
  //   // 工地信息
  //   arr2: [
  //     {
  //       name: "劳务分包",
  //       link: "/pages/Ac/issue/issue?id=3"
  //     },
  //     {
  //       name: "劳务输出",
  //       link: "/pages/Ac/issue/issue?id=3"
  //     },
  //     {
  //       name: "工地找车",
  //       link: "/pages/Ac/issue/issue?id=3"
  //     },
  //     {
  //       name: "我要出渣",
  //       link: "/pages/Ac/issue/issue?id=3"
  //     },
  //   ],
  //   // 渣场信息
  //   arr3: [
  //     {
  //       name: "政府收渣",
  //       link: "/pages/Ac/issue/issue?id=2"
  //     },
  //     {
  //       name: "园林收渣",
  //       link: "/pages/Ac/issue/issue?id=2"
  //     },
  //     {
  //       name: "房建收渣",
  //       link: "/pages/Ac/issue/issue?id=2"
  //     },
  //     {
  //       name: "工地收渣",
  //       link: "/pages/Ac/issue/issue?id=2"
  //     },
  //   ],
  // // 买卖信息
  //   arr4: [
  //     {
  //       name: "二手租货",
  //       link: "/pages/Ac/issue/issue?id=4"
  //     },
  //     {
  //       name: "渣车出售",
  //       link: "/pages/Ac/issue/issue?id=4"
  //     },
  //   ],
  },
cha:function(){
  var that=this
  console.log("打印",that.data.info2)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
      mask:true
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)



    var that=this
    wx.request({
      url:"http://tsf.suipk.cn/home/index/do_one_two",
      data:{
        code:"",
        msg:"",
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log("获取菜单列表",res)
        // for(var q in that.data.info){}
        that.setData({
          info:res.data.data
        })


},fail:function(){
        console.log("调用失败")
      }
    })
    
    

    
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