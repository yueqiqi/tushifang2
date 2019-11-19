// pages/store/site/site.js
import request from '../../login.js'
Page({
/**
 * 选择收货地址
 */

onChange(e) {
  console.log(e)
  this.setData({
    radio: e.detail,
    user_addres_id:e.currentTarget.dataset.id,
    province_and_city:e.currentTarget.dataset.loca,
    info:e.currentTarget.dataset.locas,
    name:e.currentTarget.dataset.name,
    phone:e.currentTarget.dataset.phone
  })
},
/**
 * 确认选择
 */
back:function(){
  var that=this
  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];   //当前页面
  var prevPage = pages[pages.length - 2];  //上一个页面

if(this.data.pm==''){
// }else{ 
  prevPage.setData({
    user_addres_id:that.data.user_addres_id,
    radios:that.data.radio
  })
  wx.navigateBack({delta: 1})
}else{
  var that=this
  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];   //当前页面
  var prevPage = pages[pages.length - 2];  //上一个页面
  var name= 'list.username'
  var address='list.address'
  var phone='list.phone'
  prevPage.setData({
    user_addres_id:that.data.user_addres_id,
    [address]:that.data.province_and_city+that.data.info,
    [name]:that.data.name,
    [phone]:that.data.phone,
    radios:that.data.radio
  })
  wx.navigateBack({delta: 1})
}
},

add: function () {
    console.log("添加收货地址")
wx.navigateTo({
  url: '/pages/self/site/addsite',
})

  },
  mm: function (e) {
    var that=this
    console.log(e)
    var zz = e.currentTarget.dataset.id
    console.log('点击的id',zz)
      var index  = e.currentTarget.dataset.index;
      console.log('点击的自定义name',index)
      that.setData({
        radio: index
      });
  },
  /**
   * 页面的初始数据
   */
  data: {
    pm:'',
    radio: '',
    defa: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('接受出阿莱德值',options)
      var uid=wx.getStorageSync('uid');
      // +++++++++++++++++++收货地址列表+++++++++++++++++++++++
    request({
      url:'/home/personal/do_my_addres',
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
    if(options.product!=undefined){
      this.setData({
        pm:options.product,
        radio:options.radios
      })
      
    // +++++++++++++++++++收货地址列表+++++++++++++++++++++++
  }
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
})