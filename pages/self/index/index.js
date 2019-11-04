// pages/self/index/index.js
const app=getApp()
const token=app.global.token
import request from "../../login.js"
// const openid=app.globalopenid.openid
// const request from 
Page({

  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  getPhoneNumber(e){
    var that = this
    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv
    console.log(iv,encryptedData)
    // this.onShow()
          that.setData({
            showDialog:false,
            iv,
            encryptedData,
            close:1,
          })
        },
        
  getUserInfo:function(e){
    // console.log(e)
    var that=this
    // this.setData({
    //   showDialog: !this.data.showDialog
    // });
    // var encryptedData=e.detail.encryptedData
    // var iv=e.detail.iv
    // console.log(iv,encryptedData)
    // this.userinfo()
    wx.getUserInfo({
      withCredentials: 'true',
      lang: 'zh_CN',
      timeout:10000,
      success: function(res) {
        console.log("获取用户信息",res)
        var iv=that.data.iv
        var encryptedData=that.data.encryptedData
        var userInfo = res.userInfo
        var openid=that.data.openid
        var head = userInfo.avatarUrl
        var province = userInfo.province
        var city = userInfo.city
        var addr=province+city
        var nickname = userInfo.nickName
        var sex = userInfo.gender //性别 0：未知、1：男、2：女
        console.log("iv +enc",iv,encryptedData)
        // +++++++++++++++请求祖册+++++++++++++++++++++++++
        request({
          url:'http://tsf.suipk.cn/home/Loginwx/register',
          data:{
            openid,
            // pid,
            head,
            addr,
            sex,
            nickname,
            encryptedData,
            iv,
          }
          }).then(res=>{
          console.log('调用用户所有信息成功',res)
          wx.setStorageSync("uid",res.data.data.id)
          wx.setStorageSync("userphone",res.data.data.phone)
          that.setData({
            sh:!that.data.sh,
            header:res.data.data.head,
            wxName:res.data.data.nickname
          })
          }).catch(err=>{
          console.log('调用手机注册失败',err)
        })
        // +++++++++++++++请求祖册+++++++++++++++++++++++++
      }
    })
    console.log("电话号码调用结束")

        that.setData({
          showDialog: true//!that.data.showDialog
        });

    // if(that.data.close==1){
      
    // }     
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    iv:"",
    encryptedData:"",
    showDialog: false,
    // 微信头像
    header:"",
    // 微信昵称
    wxName:"",
    // 当前信誉分
    score:"",
    // 底部导航条
    activeIdx: 4,
    self:[
      {
        img:"../../images/ico/i1.png",
        link:"/pages/self/data/data",
        til:"我的资料"
      },
      {
        img: "../../images/ico/i2.png",
        link: "/pages/self/issue/issue",
        til: "我的发布"
      },
      {
        img: "../../images/ico/i3.png",
        link: "/pages/self/total/total",
        til: "我的积分"
      },
      {
        img: "../../images/ico/i4.png",
        link: "/pages/self/score/score",
        til: "我的信誉分"
      },
      {
        img: "../../images/ico/i5.png",
        link: "/pages/self/site/site",
        til: "我的地址"
      },
      {
        img: "../../images/ico/i6.png",
        link: "/pages/store/classify/classify",
        til: "我的订单"
      },
      {
        img: "../../images/ico/i7.png",
        link: "/pages/index/index",
        til: "分享好友"
      },
      {
        img: "../../images/ico/i8.png",
        link: "/pages/self/contact/contact",
        til: "联系我们"
      },
      {
        img: "../../images/ico/i9.png",
        link: "/pages/self/ewm/ewm",
        til: "我的二维码"
      },
      {
        img: "../../images/ico/i10.png",
        link: "/pages/self/card/card",
        til: "我的名片"
      },
      {
        img: "../../images/ico/i11.png",
        link: "/pages/interest/interest",
        til: "我的兴趣"
      },
    ]
  },
  login(){
    wx.login({
      success:(res)=>{
        console.log("获取用户code",res)
        const code =res.code
        request({
        url:'http://tsf.suipk.cn/home/Loginwx/get_openid',
          data:{
            code
          }
          }).then(res=>{
          console.log('调用登录成功',res)
            var m=res.data.data
            var resb=JSON.parse(m)
            console.log("调用登录1",resb)
            const sessionKey=resb.session_key
            console.log("sess",sessionKey)
            // wx.setStorageSync("openid",resb.openid)
            this.setData({
              session_key:sessionKey
            })
            }).catch(err=>{
            console.log('调用登录失败')
          })
        }
      }) },//重新登录
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    that.login()
    var uid=wx.getStorageSync("uid")
    if(uid!=""){
      that.setData({
        sh:true
      })
      request({
      url:'http://tsf.suipk.cn/home/personal/do_personal_center',
        data:{
          uid,
        }
        }).then(res=>{
        console.log('调用储存用户成功',res)
        this.setData({
          header:res.data.data.head,
          wxName:res.data.data.nickname,
          score:res.data.data.credit
        })
        }).catch(err=>{
        console.log('调用失败')
      })
    }else{
      that.setData({
        sh:false
      })
    }
    var sessionKey=wx.getStorageSync("sessionKey")
    var openid=wx.getStorageSync("openid")
    that.setData({
      openid:openid,
      sessionKey,
    })
    console.log("代用储存openid",that.data.openid)
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
       that.login()
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