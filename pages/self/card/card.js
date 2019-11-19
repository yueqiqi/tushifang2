// pages/self/card/card.js
import request from '../../login.js'
Page({


  upset:function(){
    console.log('修改名片')
    wx.navigateTo({
      url: '/pages/self/card/perfect2',
    })

  },

  // 查看名片夹
  mycard:function(e){
    console.log(e)
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/self/mycard/mycard?uid='+id,
    })
  },
  // 完善我的名片
btn:function(){
  wx.navigateTo({
    url: '/pages/self/card/perfect',
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:[],
    // 名片夹
    mycard:[
      {
       id:0,
        // 头像
        head: "",
       // 姓名
        cardname:"用户姓名",
      // 职位
      post:"职位",
      // 公司名称
      com:"公司名称",
      // 时间
      time:"2019.08.25"
      }
    ],
    // //////////////////////////////////////////////////////////////
    // 顶部名片
  
    // 地址
    address:"",
    // 联系电话
    phone:"",
    // 邮箱
    email:"",
    // 公司名称
    com:"",
    // 职位
    post:"",
    // 头像
    head:"",
    // 用户昵称
    name:"",
    // //////////////////////////////////////////////////////////////
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//     console.log("------------------------------------------")
// console.log(options)
//     var that = this
//     wx.getStorage({
//       key: 'userinfo',
//       success: function (res) {
//         console.log(res.data)
//         that.setData({
//           userinfo: res.data,
//           name: res.data.name,
//           post: res.data.post,
//           email: res.data.email,
//           phone: res.data.phone,
//           com: res.data.com,
//           address: res.data.address,
//         })
//       }
//     })
//     console.log("这是名片界面"+that.data.userinfo)
var that=this
    // 我的名片
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/personal/do_mynamecard',
      data:{
        uid,
        // page:1,
      }
      }).then(res=>{
      console.log('调用我的名片成功',res)
      that.setData({
        head:res.data.data.head1,
        name:res.data.data.nickname,
        com:res.data.data.corporate_name,
        post:res.data.data.company_position,
        email:res.data.data.email,
        phone:res.data.data.phone,
        address:res.data.data.detailed_address,
        is_perfect:res.data.data.is_perfect,
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // +++++++++++++++++我的名片夹+++++++++++++++++++++++++++++++
    request({
      url:'/home/personal/do_my_nameCardHolder',
      data:{
        uid,
        page:1,
        limit:999,
      }
      }).then(res=>{
      console.log('调用我的名片夹成功',res)
      that.setData({
        mycard:res.data.list
      })
      }).catch(err=>{
      console.log('调用失败')
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
    this.onLoad();
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
  onShareAppMessage: function (res) {
    console.log(res.from)
    var uid=wx.getStorageSync('uid');
    if(res.from=='button'){
      return {
        title: '包程项',//弹出分享时显示的分享标题
        path: '/pages/self/mycard/mycard?uid='+uid,//'/page/user?id=123' // 路径，传递参数到指定页面。
        desc: '个人名片',
        success: function (res) {
          console.log('分享成功',ops)
         }
      }
    
  }
  }
})