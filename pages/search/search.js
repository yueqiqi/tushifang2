// 1 导入js文件
var WxSearch = require('../wxSearch/wxSearch.js');

Page({

  data: {},


  onLoad: function () {

    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['搜索内容', '搜索内容', "搜索内容", "搜索内容", '搜索内容', '搜索内容'], // 热点搜索推荐，[]表示不使用
      ['搜索的相关内容', '搜索的相关内容', '搜索的相关内容', "搜索的相关内容"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );

  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 示例：跳转
    wx.redirectTo({
      url: '../index/index?searchValue=' + value
    })
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    wx.redirectTo({
      url: '../index/index?searchValue=返回'
    })
  }

})

// pages/search/search.js
// Page({
//   /**
//      * 页面的初始数据
//      */
//   data: {
//     lists: [],              // 接收搜索的内容
//     wxSearchData: '',       // 输入的值
//   },
//   /**
//      * 搜索
//      */
//   wxSearchInput: function (value) {
//     var that = this;
//     if (value.detail.value.length > 0) {
//       wx.request({
//         url: '',
//         data: {
//           value: value.detail.value
//         },
//         header: { 'content-type': 'application/x-www-form-urlencoded' },
//         method: 'POST',
//         dataType: json,
//         responseType: text,
//         success: function (res) {
//           if (res.code) {
//             var data = that.data.lists;
//             for (let i = 0; i < res.data.length; i++) {
//               data.push(res.data[i]);
//             }
//             that.setData({
//               wxSearchData: value.detail.value,
//               lists: data
//             })
//           }
//         },
//         fail: function (res) { },
//         complete: function (res) { },
//       })
//     }
//   },

//   /**
//    * 监听软键盘确认键
//    */
//   wxSearchConfirm: function (e) {

//   },

//   /**
//    * 返回
//    */
//   back: function (e) {
//     wx: wx.navigateBack({
//       delta: 1,
//     })
//   }

// })

// //获取应用实例
// const app = getApp()
// const $http = require('../utils/http.js')
// //引入请求函数

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     inputValue: '', //输入框value值
//     noData: false, //暂无数据
//     carList: [],//搜索列表
//     history: false, //搜索记录
//     historyData: [], //历史记录列表
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var that = this
//     wx.getStorage({ //获取历史记录缓存
//       key: 'history',
//       success(res) {
//         console.log(res.data)
//         if (res.data == '') {
//           that.setData({
//             history: false
//           })
//         } else {
//           that.setData({
//             historyData: res.data,
//             history: true
//           })
//         }
//       }
//     })
//   },

//   //搜索框搜索事件
//   search: function (e) {
//     var that = this
//     if (e.detail.value == '') { //输入框value为空
//       that.setData({
//         noData: false,
//         carList: '',
//         closeImg: false,
//         history: true
//       })
//     } else { //输入框value不为空
//       that.setData({
//         closeImg: true,
//         history: false
//       })
//       $http.post('my/search_vehicles', { //请求搜索接口
//         search: e.detail.value
//       }).then(res => {
//         var resObj = res.data
//         if (resObj.code == 1) {
//           //请求成功
//           console.log(resObj.data)
//           if (resObj.data) {
//             that.setData({
//               noData: false,
//               carList: resObj.data.brandList
//             })
//           } else {
//             that.setData({
//               noData: true
//             })
//           }
//         } else {
//           console.log('请求失败', resObj.msg)
//         }
//       }).catch(err => {
//         console.log('异常回调', err)
//       })
//     }
//   },

//   //点击X取消输入框内容事件
//   close: function () {
//     var that = this
//     that.setData({
//       inputValue: '',
//       carList: '',
//       noData: false,
//       closeImg: false,
//       history: true
//     })
//   },

//   //取消事件
//   cancel: function () {
//     var that = this
//     wx.switchTab({
//       url: '/pages/carType/carType'
//     })
//   },

//   //选择车型事件
//   selectCar: function (e) {
//     var that = this
//     console.log(e.target.dataset)
//     if (that.data.historyData.indexOf(e.target.dataset.name) > -1) {
//       //包含该元素
//     } else {
//       that.data.historyData.push(e.target.dataset.name)
//     }
//     wx.setStorage({ //添加缓存
//       key: 'history',
//       data: that.data.historyData,
//       success: function () {
//         wx.reLaunch({
//           url: '/pages/carType/carType'
//         })
//       }
//     })
//   },

//   //清空历史搜索
//   cancelHistory: function () {
//     var that = this
//     wx.removeStorage({
//       key: 'history',
//       success(res) {
//         that.setData({
//           history: false
//         })
//       }
//     })
//   },

//   //点击历史搜索
//   searchHistory: function (e) {
//     var that = this
//     that.setData({
//       inputValue: e.target.dataset.name,
//       history: false,
//       closeImg: true
//     })
//     $http.post('url', { //请求搜索接口
//       search: e.target.dataset.name
//     }).then(res => {
//       var resObj = res.data
//       if (resObj.code == 1) {
//         //请求成功
//         console.log(resObj.data)
//         if (resObj.data) {
//           that.setData({
//             noData: false,
//             carList: resObj.data.brandList
//           })
//         } else {
//           that.setData({
//             noData: true
//           })
//         }
//       } else {
//         console.log('请求失败', resObj.msg)
//       }
//     }).catch(err => {
//       console.log('异常回调', err)
//     })
//   },

// })

// var network = require("../../utils/network.js");

// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     list: [],
//     inputValue: null,
//     resultList: []
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var _this = this;
//     wx.getStorage({
//       key: 'historySearch',
//       success(res) {
//         _this.setData({
//           list: res.data
//         })
//       }
//     })
//   },
//   blur: function (e) {
//     this.setData({
//       inputValue: e.detail.value
//     })
//     this.search();
//   },
//   search: function () {
//     var _this = this
//     network.requestLoading('projectAppList', { projectName: this.data.inputValue }, '', function (res) {
//       if (res.respState == 'S') {
//         _this.setData({
//           resultList: res.dtos
//         })
//       }

//     }, function () {
//       wx.showToast({
//         title: '搜索失败',
//         icon: 'none'
//       })
//     })
//   },
//   save: function () {
//     var list = this.data.list;
//     if (list.indexOf(this.data.inputValue) == -1 & this.data.inputValue != '') {
//       list.push(this.data.inputValue);
//     }
//     this.setData({
//       list: list
//     })
//     wx.setStorage({
//       key: 'historySearch',
//       data: list
//     })

//   },
//   searchName: function (e) {
//     this.setData({
//       inputValue: e.currentTarget.dataset.value
//     })
//     this.search();
//   },
//   remove: function () {
//     var _this = this;
//     wx.showModal({
//       title: '提示',
//       content: '确认清空所有记录?',
//       success(res) {
//         if (res.confirm) {
//           wx.removeStorage({
//             key: 'historySearch',
//             success() {
//               _this.setData({
//                 list: []
//               })
//             }
//           })
//         } else if (res.cancel) {
//           console.log('用户点击取消')
//         }
//       }
//     })

//   },
// //   遇到问题：未收起键盘情况下，安卓清除input框内容失败，收起键盘再点清除则没问题
// // 解决方案延迟清除：
//   clean: function () {
//     var _this = this
//     setTimeout(function () {
//       _this.setData({
//         inputValue: '',
//       })
//     }, 100)
//   },
//   detail: function (e) {
//     this.save();
//     wx.navigateTo({
//       url: '../projectDetail/projectDetail?id=' + e.currentTarget.dataset.id,
//     })

//   }
// })