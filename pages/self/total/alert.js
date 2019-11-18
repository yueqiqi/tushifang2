// pages/self/total/alert.js
Page({
show:function(){
  this.setData({
    alert:true
  })
},
/**
 * 点击取消
 */
cancel:function(){
  this.setData({
    alert:false
  })
},
/**
 * 点击确定
 */
formsubmit:function(e){
  console.log(e)
},
/**
 * 获取用户输入的值
 */
setValue:function(e){
  console.log('用户输入得值',e)
  this.setData({
    phone:e.detail.value
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    alert:false,
    phone:"",
    num:'',
  },

})