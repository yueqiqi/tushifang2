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
          // console.log("已授权=====")     
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
                  url:'/home/Loginwx/get_openid',
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
              // var pid=1
              var head=u.avatarUrl
              var addr=u.province+u.city
              var sex=u.gender
              var nickname=u.nickName
              var parent_id=wx.getStorageSync('parent_id');
              console.log('电泳邀请parent——id',parent_id)
              console.log('这是获取数据中的：',openid,'color:green')
                request({
                  url:'/home/Loginwx/register',
                  data:{
                    openid,
                    // pid,
                    head,
                    addr,
                    sex,
                    nickname,
                    phone,
                    parent_id
                  }
                  }).then(res=>{
                  console.log('调用注册成功',res)
                  var uid=res.data.data.id
                  console.log('获取用户id',uid)
                  wx.setStorageSync('uid',uid);
                  var uids=wx.getStorageSync('uid');
                  console.log('这是用户的uids',uids)
                  if(uids!=''){
                    /**
                     * 设置兴趣
                     */
                    var interest=wx.getStorageSync('int');
                    var int=interest.toString()
                    console.log('兴趣格式',int)
                    request({
                      url:'/home/personal/do_addmy_Interest',
                      data:{
                        uid,
                        two_class_id_str:int
                      }
                      }).then(res=>{
                      console.log('调用保存兴趣成功',res)
                      this.setData({
                      
                      })
                      }).catch(err=>{
                      console.log('调用失败')
                    })
                    // ？++++++++++++++++++++++++++++++++++++++++++++++
                    /**
                     * 
                     */
                    that.setData({
                      sh:true,
                    })
                    that.onLoad()
                  }
                  that.setData({
                    showDialog: false,
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

    // var openid=wx.getStorageSync('openid');
    this.setData({
      iv:e.detail.iv,
      encryptedData:e.detail.encryptedData
    })
    // +++++++++++++++++++++++获取去手机号+++++++++++++++++++++++++++++
    console.log('iv的值:',e.detail.iv)
    if(e.detail.iv==undefined){
      that.setData({
        showDialog: false
      });
    }else{
      that.setData({
        showDialog: true
      });
    }
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
            const openid=m.openid
            const sessionKey=m.session_key 
            wx.setStorageSync("openid",openid)  
            wx.setStorageSync("sessionKey",sessionKey)            
          // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
          request({
            url:'/home/Loginwx/getWechatUserPhone',
            data:{
              openid:m.openid,
              iv:e.detail.iv,
              encryptedData:e.detail.encryptedData
            }
            }).then(res=>{
            console.log('手机号获取',res)
            wx.setStorageSync('userphone', res.data.phoneNumber);

            }).catch(err=>{
            console.log('手机号获取失败')
            })
          },
          toggleDialog() {
            this.setData({
              showDialog: !this.data.showDialog
            });
          // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      }, fail: ()=> {
        console.log('调用失败')
        }
      })
    }
  })
    
    // +++++++++++++++++++++++获取去手机号+++++++++++++++++++++++++++++

   
  },
  
  /**
   * 未登录不能点击按钮
   */
  nav:function(e){
    var that=this
    console.log(e)
    var index=e.currentTarget.dataset.index
    var uid=wx.getStorageSync('uid');
    if(uid!=''){
      wx.navigateTo({
        url: that.data.self[index].link,
      });
    }else if(uid==''){
      wx.showModal({
        title: '登录提示',
        content: '请登录',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
          }
        },
      });
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    iv:"",
    sh:false,
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
        link: "/pages/self/share/share",
        til: "好友列表"
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
        link: "/pages/interest/interest2",
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
        url:'/home/Loginwx/get_openid',
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
      url:'/home/personal/do_personal_center',
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
    // var sessionKey=wx.getStorageSync("sessionKey")
    // var openid=wx.getStorageSync("openid")
    // that.setData({
    //   openid:openid,
    //   sessionKey,
    // })
    // console.log("代用储存openid",that.data.openid)
    // wx.checkSession({
    //   success () {
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail () {
    //     // session_key 已经失效，需要重新执行登录流程
    //    that.login()
    //   }
    // })
   
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
  url:'/home/Loginwx/register',
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