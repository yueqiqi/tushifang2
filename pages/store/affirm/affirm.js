// pages/store/affirm/affirm.js
var util = require('../../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
import request from '../../login.js'
Page({



/**
 * 选择地址
 */
addr:function(){
  var radios=this.data.radios
  wx.navigateTo({
    url: '/pages/store/site/site?product=tt&radios='+radios,
    success: (result)=>{
      
    },
    fail: ()=>{},
    complete: ()=>{}
  });
},






close:function(){
  console.log("结算")
  /**
   * 支付接口
   */
  
  var that=this
  var user_addres_id=that.data.user_addres_id
  console.log('地址id',user_addres_id)
  var order_id=that.data.list.id
  request({
    url:'http://tsf.suipk.cn/home/pay/do_wxpay_goods',
    data:{
      user_addres_id,
      order_id
    }
    }).then(res=>{
      console.log('支付成功1',res)
      var timeStamp=res.data.data.timestamp
      var nonceStr=res.data.data.noncestr
      console.log('传递的值',nonceStr,timeStamp)
    // if(res.data.code==0){
      wx.requestPayment({
    timeStamp,
    nonceStr,
    package: res.data.data.package,
    signType: res.data.data.signType,
    paySign: res.data.data.paySign,
    success: (result)=>{
      console.log('支付成功2')
      wx.navigateTo({
        url: '/pages/store/success/success',
      })
    },
    fail: (err)=>{
      console.log('微信支付接口',err)
    },
    complete: ()=>{}
  });
    // }

    }).catch(err=>{
    console.log('调用支付失败',err)
  })


 

},
  /**
   * 页面的初始数据
   */
  data: {
    // 标题
    title:"日本车载眼镜架多功能创意汽车用眼支架",
    // 电话号码
    phone:"13222222222",
    // 用户名
    name:"用户名",
    // 地址
    ad:"重庆市 渝北区 多少路 80号 什么大厦几楼几杠几",
    // 总额
    all:"",
    // 运费
    money:10,
    // /数量
    num:1,
    // 价格
    price:100,
    // 日期
    date:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log('接受商城传来的',options)
    console.log('接受地址',options)
    // var DATE = util.formatDate(new Date());
    // this.setData({
    //   date: DATE,
    // });
    // var price=this.data.price
    // var money=this.data.money
    // this.setData({
      //   all:price+money
    // })
    this.setData({
      radios:options.radios
    })
    /**
     * 创建订单
     */
    this.setData({
      user_addres_id:options.user_addres_id,

    })
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/goods/do_add_order',
      data:{
        uid,
        goods_id:options.goods_id,
        user_addres_id:options.user_addres_id,
        sku_id:options.sku_id,
        number:options.number
      }
    }).then(res=>{
      console.log('调用创建订单成功',res)
        /**
         * 确认订单
         */
        var order_id=JSON.parse(res.data.data)
        that.setData({
          order_id:order_id
        })
        request({
          url:'http://tsf.suipk.cn/home/goods/do_confirm_order',
          data:{
            order_id:res.data.data
          }
          }).then(res=>{
          console.log('调用商品界面成功',res)
          // var res=res.datat.data
          that.setData({
            list:res.data.data
          })
          }).catch(err=>{
          console.log('调用失败')
        })
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++
      }).catch(err=>{
      console.log('调用失败')
    })
    setTimeout(()=>{
      console.log('地址id',this.data.user_addres_id)
    },4000)
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