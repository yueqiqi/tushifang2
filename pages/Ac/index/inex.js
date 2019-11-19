import request from "../../login.js"

// pages/Ac/index/inex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业图片
    ent:[
      {
        url:"../../images/carousel/1.jpg",
        link:"/pages/index/index"
      },
      {
        url: "../../images/carousel/2.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/3.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/1.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/2.jpg",
        link: "/pages/index/index"
      },
      {
        url: "../../images/carousel/3.jpg",
        link: "/pages/index/index"
      },
    ],

    title:[
      {
        url:"../../images/ent.png",
        link:"/pages/Ac/business/business",
        name:"我是企业",
      },
      {
        url: "../../images/car.png",
        link: "/pages/Ac/diver/diver",
        name:"我是司机",
      },
      {
        url: "../../images/self.png",
        link: "/pages/Ac/self/self",
        name:"我是个人",
      },
    ],
    gg:1
  },
/**
 * 跳转
 */
gg:function(e){
  var that=this

  if(that.data.gg==1){
    var index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: that.data.title[index].link,
    });
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    /**
     * 验证是否认证
     */
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/Personal/do_is_identification',
      data:{
        uid,
      }
      }).then(res=>{
      console.log('查看是否认证',res)
        if(res.data.data[0].status==1){
          wx.showModal({
            title: '审核状态',
            content: '您已经审核通过不必再次审核',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                that.setData({
                  gg:0
                })
              }else if(result.cancel){
                wx.navigateBack({
                  delta: 1
                });
              }
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }else if(res.data.data[0].status==2){
          wx.showModal({
            title: '审核状态',
            content: '您已经正在审核',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                that.setData({
                  gg:0
                })
              }else if(result.cancel){
                wx.navigateBack({
                  delta: 1
                });
              }
            },
          });
        }
      }).catch(err=>{
      console.log('调用失败')
    })
    // 
    request({
      url:"/home/personal/do_check_in",
      data:{
        code:"",
        msg:"",
      }
      }).then(res=>{
        console.log("调用个人免费成功",res)
        that.setData({
          ent:res.data.data
        })
        }).catch(err=>{
          console.log("调用失败")
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