// pages/interest/interest.js
import request from '../login.js' 
Page({
  data: {
    // 按钮是否禁用
    disabled:true,
    checkboxArr: [
  ],
  },
  checkbox: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var checkboxArr = this.data.checkboxArr;//选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值
    var checkValue = e.detail.value;
    //console.log('获取去下标id',e)
    this.setData({
      checkboxArr: checkboxArr
    });
  },

  checkboxChange: function (e) {
    //console.log(e.detail.value.length)
    //console.log('选择的id',e)
    // 判断用户是否选择兴趣
    if (e.detail.value.length>0){
      this.setData({
        disabled:false
      })
    } 
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
  },

  confirm: function () {// 提交
    wx.setStorageSync('int', this.data.checkValue)
    var uid=wx.getStorageSync('uid');
    // ++++++++++++++++++++++选择兴趣接口+++++++++++++++++++++ 
    if(uid){
      wx.switchTab({
        url: '/pages/body/body',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    } else {
      wx.navigateTo({
        url: '/pages/a-new/a-new',
      })
    } 
    // ++++++++++++++++++++++选择兴趣接口+++++++++++++++++++++
  },

  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    request({
      url:'/home/Info/do_twoclass_list',
      data:{
        one_class_id:'',
      }
      }).then(res=>{
      //console.log('调用我的兴趣成功',res)
      this.setData({
        checkboxArr:res.data.data
      })
      }).catch(err=>{
      //console.log('调用失败')
    })
  },
})