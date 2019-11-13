// pages/interest/interest.js
import request from '../login.js' 
Page({
  data: {
    // 按钮是否禁用
    disabled:true,
    checkboxArr: [
    //   {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    //   },{
    //     name: '兴趣',
    //     checked: false
    //   }, {
    //     name: '兴趣',
    //     checked: false
    //   }, {
    //     name: '兴趣',
    //     checked: false
    //   }, 
    //   {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    // }, {
    //   name: '兴趣',
    //   checked: false
    // }, 
  ],
  },
  checkbox: function (e) {
    var index = e.currentTarget.dataset.index;//获取当前点击的下标
    var checkboxArr = this.data.checkboxArr;//选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked;//改变当前选中的checked值
    var checkValue = e.detail.value;
    console.log('获取去下标id',e)
    this.setData({
      checkboxArr: checkboxArr
    });
  },

  checkboxChange: function (e) {
    console.log(e.detail.value.length)
    console.log('选择的id',e)
    // 判断用户是否选择兴趣
    if (e.detail.value.length>0){
      this.setData({
        disabled:false
      })
    } 
    // else if (e.detail.value.length == 0){
    //   this.setData({
    //     disabled:true
    //   })
    // }
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
        url: '/pages/demo/new/index/renzhen',
      })
    } 
    // ++++++++++++++++++++++选择兴趣接口+++++++++++++++++++++
 
  console.log(this.data.checkValue)//所有选中的项的value
    console.log("跳转")
  },
  // data: {
  //   text: "请选择",
  //   items: [
  //     { name: '1', value: '兴趣' },
  //     { name: '2', value: '兴趣' },
  //     { name: '3', value: '兴趣' },
  //     { name: '4', value: '兴趣' },
  //     { name: '5', value: '兴趣' },
  //     { name: '6', value: '兴趣' },
  //     { name: '7', value: '兴趣' },
  //   ]
  // },
  // //设置checbox最多被选中三个  
  // checkboxChange: function (e) {
  //   var that = this;
  //   var skin = e.detail.value
  //   //新建数组全部设置为没被选中  
  //   var new_itmes = [
  //     { name: '1', value: '兴趣' },
  //     { name: '2', value: '兴趣' },
  //     { name: '3', value: '兴趣' },
  //     { name: '4', value: '兴趣' },
  //     { name: '5', value: '兴趣' },
  //     { name: '6', value: '兴趣' },
  //     { name: '7', value: '兴趣' },
  //   ]
  //   if (skin.length > 3) {
  //     //取出倒数三个值  
  //     var key1 = skin[skin.length - 1];
  //     var key2 = skin[skin.length - 2];
  //     var key3 = skin[skin.length - 3];
  //     //设置最后三个值为选中状态  
  //     new_itmes[key1 - 1]['checked'] = 'true'
  //     new_itmes[key2 - 1]['checked'] = 'true'
  //     new_itmes[key3 - 1]['checked'] = 'true'

  //     //删除被选中的第一个值  
  //     skin.splice(0, 1);
  //   } else {
  //     //被选中少于三个，直接设置被选中  
  //     for (var i = 0; i < skin.length; i++) {
  //       var key = skin[i]
  //       new_itmes[key - 1]['checked'] = 'true'
  //     }
  //   }
  //   //拼接文字显示  
  //   var text = [];
  //   for (var i = 0; i < skin.length; i++) {
  //     var key = skin[i]
  //     text[i] = that.data.items[key - 1]['value']
  //   }
  //   text = text.join("、")
  //   //存入  
  //   that.setData({
  //     skin: skin,
  //     text: text,
  //     items: new_itmes
  //   })
  // }  ,

  /**
   * 页面的初始数据
   */
  // data: {

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/Info/do_twoclass_list',
      data:{
        one_class_id:'',
      }
      }).then(res=>{
      console.log('调用我的兴趣成功',res)
      this.setData({
        checkboxArr:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  },
})