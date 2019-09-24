// // tabBarComponent/tabBar.js
// // import wepy from 'wepy';

// Component({
//   /**
//    * 组件的属性列表
//    */
//   properties: {
//     tabbar: {
//       type: Object,
//       value: {
//         'backgroundColor': '#ffffff',
//         'color': '#979795',
//         'selectedColor': '#1c1c1b',
//         'list': [
//           {
//             'pagePath': 'pages/index/index',
//             'iconPath': 'https://rplatform.oss-cn-beijing.aliyuncs.com/smallprogram/basic/home_def@2x.png',
//             'selectedIconPath': 'https://rplatform.oss-cn-beijing.aliyuncs.com/smallprogram/basic/home_sel@2x.png',
//             'text': '首页'
//           },
//           {
//             'pagePath': 'pages/assemble/assemble',
//             'iconPath': 'https://rplatform.oss-cn-beijing.aliyuncs.com/smallprogram/basic/fabu@2x.png',
//             'isSpecial': true,
//             'text': '发布拼团'
//           },
//           {
//             'pagePath': 'pages/user/user',
//             'iconPath': 'https://rplatform.oss-cn-beijing.aliyuncs.com/smallprogram/basic/my_def@2x.png',
//             'selectedIconPath': 'https://rplatform.oss-cn-beijing.aliyuncs.com/smallprogram/basic/my_sel@2x.png',
//             'text': '我的'
//           }
//         ]
//       }
//     },
//     showOrHide: {
//       type: Boolean,
//       value: true
//     }
//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {
//     isIphoneX: wepy.$instance.globalData.systemInfo.model.toLowerCase().includes('iPhone X'.toLowerCase())
//   },

//   /**
//    * 组件的方法列表
//    */
//   methods: {
//     navTo(e) {
//       wepy.switchTab({
//         url: e.currentTarget.dataset.url,
//         success(e) {
//           console.log(e);
//         },
//         fail(e) {
//           console.log(e, 'err');
//         }
//       });
//     }
//   },
//   onLoad() {

//   }
// });