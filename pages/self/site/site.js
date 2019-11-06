// pages/store/site/site.js
import request from '../../login.js'
Page({
  // 修改
  mod:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/self/site/modsite?id='+id,
    })
  },
  // 删除
  del:function(e){
var that=this
var id=e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        console.log(sm)
        if (sm.confirm) {
          // asd.splice(e, 1)
          // that.setData({
          //   defa: asd
          // })
          request({
            url:'http://tsf.suipk.cn/home/personal/do_del_adress',
            data:{
              id
            }
            }).then(res=>{
            console.log('调用删除地址成功',res)
            if(res.data.code==0){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                image: '',
                duration: 1500,
                mask: false,
                success: (result)=>{
                  that.onLoad()
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            }
            }).catch(err=>{
            console.log('调用失败')
          })
          // 用户点击了确定 可以调用删除方法了
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    var e = e.target.dataset.num
    console.log(e)
    console.log(this.data.defa[e])
    var asd=this.data.defa
    
  },


  add: function () {
    console.log("添加收货地址")
wx.navigateTo({
  url: '/pages/self/site/addsite',
})

  },
  mm: function (e) {
    var zz = e.currentTarget.dataset.index
    var d = this.data.defa
    console.log(d[zz])
    // d[zz].nom = "aa"
  },
  /**
   * 页面的初始数据
   */
  data: {
    defa: [
      {
        name: "用户名1",
        phone: 13333333333,
        def: "默认",
        sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
        nom: "aa"
      },
      {
        name: "用户名2",
        phone: 13333333333,
        def: "默认",
        sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
        nom: ""
      },
      {
        name: "用户名3",
        phone: 13333333333,
        def: "默认",
        sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
        nom: ""
      },
    ],
    // def:"默认",
    // nom:"",
    // sit: "重庆市 渝北区 多少路 80号 什么大厦几楼几杠几 a"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    // +++++++++++++++++++收货地址列表+++++++++++++++++++++++
    request({
    url:'http://tsf.suipk.cn/home/personal/do_my_addres',
    data:{
      uid,
      page:1,
    }
    }).then(res=>{
    console.log('调用收货列表成功',res)
    this.setData({
      defa:res.data.list
    })
    }).catch(err=>{
    console.log('调用失败')
    })
    // +++++++++++++++++++收货地址列表+++++++++++++++++++++++
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
    this.onLoad()
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