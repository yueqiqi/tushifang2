// pages/self/index/index.js
const app=getApp()
const token=app.global.token
import request from "../../login.js"
// const openid=app.globalopenid.openid
// const request from 
Page({
  show:function(){
    var that=this
    
    // +++++++++++++++++++++++获取
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            success(res) {
              console.log("获取用户信息成功", res)
              
              var u=res.userInfo
              // ++++++++++++++++++++++登录接口+++++++++++++++++++++++
              wx.login({
                timeout:10000,
                success: (res)=>{
                  var code=res.code
                  console.log('获取用户的code',code)
                  request({
                  url:'http://tsf.suipk.cn/home/Loginwx/get_openid',
                  data:{
                    code,
                  }
                  }).then(res=>{
                  console.log('获取用户的code',res)
                  var openid=res.data.data.openid
                  console.log('这是储存在数据的：',openid,'color:red')
                  wx.setStorageSync('openid', openid);
                  }).catch(err=>{
                  console.log('调用失败')
                  })
                },
                fail: ()=>{},
                complete: ()=>{}
              });
              // ++++++++++++++++++++++登录接口+++++++++++++++++++++++
              // ++++++++++++++++++++调用接口+++++++++++++++++++
              var openid=wx.getStorageSync('openid');
              var phone= wx.getStorageSync('userphone');
              console.log('%c','获取本地手机号码啊啊啊',phone)
              var pid=1
              var head=u.avatarUrl
              var addr=u.province+u.city
              var sex=u.gender
              var nickname=u.nickName
              console.log('这是获取数据中的：',openid,'color:green')
                request({
                  url:'http://tsf.suipk.cn/home/Loginwx/register',
                  data:{
                    openid,
                    pid,
                    head,
                    addr,
                    sex,
                    nickname,
                    phone
                  }
                  }).then(res=>{
                  console.log('调用注册成功',res)
                  var uid=res.data.data.id
                   console.log('获取用户id',uid)
                  wx.setStorageSync('uid',uid);
                  that.setData({
                    showDialog: false,
                    sh:true
                  })
                  }).catch(err=>{
                  console.log('调用失败')
                })
              // ++++++++++++++++++++调用接口+++++++++++++++++++


            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })


  },
  // +++++++++++++++++++++++++++++++++++++获取用户信息+++++++++++++++++++++++++++
  // +++++++++++++++++++++++++++++++++++++获取手机号+++++++++++++++++++++++++++
  getPhoneNumber:function(e){
    var that=this
    that.setData({
      showDialog: true
    });
    var openid=wx.getStorageSync('openid');
    console.log('按钮获取的iv',e.detail.iv)
    console.log('按钮获取的data',e.detail.encryptedData)
    this.setData({
      iv:e.detail.iv,
      encryptedData:e.detail.encryptedData
    })
    console.log('最后保存的信息',this.data.iv,this.data.encryptedData)
    // +++++++++++++++++++++++获取去手机号
    request({
    url:'http://tsf.suipk.cn/home/Loginwx/getWechatUserPhone',
    data:{
      openid,
      iv:that.data.iv,
      encryptedData:that.data.encryptedData
    }
    }).then(res=>{
    console.log('手机号获取',res)
    wx.setStorageSync('userphone', res.data.phoneNumber);
    }).catch(err=>{
    console.log('调用失败')
    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  // getPhoneNumber(e){
  //   var that = this
  //   var encryptedData = e.detail.encryptedData
  //   var iv = e.detail.iv
  //   console.log(iv,encryptedData)
  //   // this.onShow()
  //   // var openid=wx.getStorageSync('openid');
  //     // +++++++++++++++++++++++++获取手机号+++++++++++++++++++++++++
  //     // request({
  //     //   url:'http://tsf.suipk.cn/home/Loginwx/getWechatUserPhone',
  //     //   data:{
  //     //     encryptedData,
  //     //     iv,
  //     //     openid
  //     //   }
  //     //   }).then(res=>{
  //     //   console.log('调用手机号成功',res)
  //     //   wx.setStorageSync('userphone', res.data.data.phoneNumber);
  //     //   this.setData({
        
  //     //   })
  //     //   }).catch(err=>{
  //     //   console.log('调用失败')
  //     // })
  //     // +++++++++++++++++++++++++获取手机号+++++++++++++++++++++++++
  //         that.setData({
  //           showDialog:false,
  //           iv,
  //           encryptedData,
  //           close:1,
  //         })
  //         // +++++++++++++++请求祖册+++++++++++++++++++++++++
  //         var openid=wx.getStorageSync('openid');
  //         var pid=1
  //         var head=that.data.head
  //         var addr=that.data.addr
  //         var nickname=that.data.nickname
  //         var sex=that.data.sex
  //         // var encryptedData=
  //       request({
  //         url:'http://tsf.suipk.cn/home/Loginwx/register',
  //         data:{
  //           openid,
  //           // pid,
  //           head,
  //           addr,
  //           sex,
  //           nickname,
  //           encryptedData,
  //           iv,
  //           phone,
  //         }
  //         }).then(res=>{
  //         console.log('调用用户所有信息成功',res)
  //         wx.setStorageSync("uid",res.data.data.id)
  //         wx.setStorageSync("userphone",res.data.data.phone)

  //           // ++++++++++++++++++++++
  //           // var uid=wx.getStorageSync('uid');
  //           // request({
  //           //   url:'http://tsf.suipk.cn/home/personal/do_personal_center',
  //           //     data:{
  //           //       uid,
  //           //     }
  //           //     }).then(res=>{
  //           //     console.log('调用储存用户成功',res)
  //           //     this.setData({
  //           //       header:res.data.data.head,
  //           //       wxName:res.data.data.nickname,
  //           //       score:res.data.data.credit
  //           //     })
  //           //     }).catch(err=>{
  //           //     console.log('调用失败')
  //           //   })
  //           // ++++++++++++++++++++++



  //         that.setData({
  //           sh:!that.data.sh,
  //           header:res.data.data.head,
  //           wxName:res.data.data.nickname
  //         })
  //         }).catch(err=>{
  //         console.log('调用手机注册失败',err)
  //       })
  //       },
        
  // getUserInfo:function(e){
  //   // console.log(e)
  //   var that=this
  //   // this.setData({
  //   //   showDialog: !this.data.showDialog
  //   // });
  //   // var encryptedData=e.detail.encryptedData
  //   // var iv=e.detail.iv
  //   // console.log(iv,encryptedData)
  //   // this.userinfo()
  //   wx.getUserInfo({
  //     withCredentials: 'true',
  //     lang: 'zh_CN',
  //     timeout:10000,
  //     success: function(res) {
  //       console.log("获取用户信息",res)
  //       // var iv=that.data.iv
  //       // var encryptedData=that.data.encryptedData
  //       var userInfo = res.userInfo
  //       var openid=that.data.openid
  //       var head = userInfo.avatarUrl
  //       var province = userInfo.province
  //       var city = userInfo.city
  //       var addr=province+city
  //       var nickname = userInfo.nickName
  //       var sex = userInfo.gender //性别 0：未知、1：男、2：女
  //       // var phone=wx.getStorageSync('userphone');
  //       // console.log('这是手机号',phone)
  //       // console.log("iv +enc",iv,encryptedData)
  //       that.setData({
  //         openid,
  //         head,
  //         addr,
  //         nickname,
  //         sex,
  //         // phone
  //       })
  //       // +++++++++++++++请求祖册+++++++++++++++++++++++++
  //     }
  //   })
  //   console.log("需要的用户信息",that.data.openid,that.data.head,that.data.addr,
  //   that.data.nickname,that.data.sex)
  //       that.setData({
  //         showDialog: true//!that.data.showDialog
  //       });

  //   // if(that.data.close==1){
      
  //   // }     
  // },
  
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
 * 注册接口
 */
userlogin(){
  // 用户的openid
  var openid=wx.getStorageSync('openid');
  // 用户的pid
  var pid=1
  // 头像地址
  var head
  // 地址
  var addr
  // 性别
  var sex
  // 手机号
  var phone
  //encryptedData
  var encryptedData
  // iv
  var iv
  // 昵称
  var nickname
  request({
  url:'http://tsf.suipk.cn/home/Loginwx/register',
    data:{
      openid,
      pid,
      head,
      addr,
      sex,
      phone,
      encryptedData,
      iv,
      nickName,
    }
    }).then(res=>{
    console.log('调用用户注册信息成功',res)
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
  })
},


userlogin(){
  wx.login({
    // code只有5分钟时效
    success:(res)=>{
    const code=res.code;
    // 请求接口
    wx.request({
      url: 'http://tsf.suipk.cn/home/Loginwx/get_openid',
      data: {
        code,
      },
      method: 'POST',
      header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
      success: (res)=> {
        console.log("opendi",res)
        var m=res.data.data
        // var resb=JSON.parse(m)
        // console.log("1",resb)
        // 取出token
        // const token=res.data.token
        const openid=m.openid
        const sessionKey=m.session_key

        // 存储到全局global中
        // this.global.token=token
        // 储存在stroge中
        // wx.setStorageSync("token",token)   
        wx.setStorageSync("openid",openid)  
        wx.setStorageSync("sessionKey",sessionKey)  
        this.globalopenid.openid=openid 
      console.log('调用内存成功', res)
      console.log("===========================")
      // console.log(resb.openid)
      console.log("===========================")
    }, fail: ()=> {
      console.log('调用失败')
      }
    })
  }
})
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