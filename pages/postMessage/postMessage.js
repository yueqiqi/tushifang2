// pages/postMessage/postMessage.js
// var app = getApp()
Page({
  // 跳转
  goto:function(){
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },
  
  // 分享
  share: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("这是第"+id+"分享")
  },
  // 评论
  comment:function(e){
    var id = e.currentTarget.dataset.id
    console.log("这是第" + id +"评论")
  },
  // 点赞
  like: function (e) {
    var that = this
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log("这是第"+id+"个")
    // for(var i in this.data.user){
    var like=that.data.user[id].index
    var index="user[" + id + "].index";
    that.setData({
      [index]:like+1
    })
    // }
    console.log("这是点赞后的点赞数"+like)
    console.log("点赞"); 
  },
  // 视频播放错误
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  /**
   * 页面的初始数据
   */
  data: {
    // =============================
    user:[
      {
        // id
        id:0,
        // 用户头像
        header: "/pages/images/carousel/02.jpg",
        // 用户名
        name:"发布者用户名",
        // 十万火急
        type:"十万火急",
        // 距离
        dis:2.3,
        // 发布者需求标题
        title:"发布者需求标题",
        // 时间
        time:"2019.02.02 18:36",
        // 发布者定位
        location:"发布者定位",
        // 内容
        content: "翠云万科欢迎32万/28方/22方车24小时随时开自运。要来拉的老板提前联系，结账方式随意。",
        // 图片
        userimg: [
          {
            url: "/pages/images/carousel/05.jpg",
          },
          {
            url: "/pages/images/carousel/06.jpg",
          },
          {
            url: "/pages/images/carousel/07.jpg"
          }
        ],
        // 视屏
        video:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        // 项目类型
        project:"车辆出售",
        // 拨打电话
        callphone:"",
        // 点赞数
        index:1,
      },
      {
        // id
        id: 1,
        // 用户头像
        header: "/pages/images/carousel/02.jpg",
        // 用户名
        name: "发布者用户名",
        // 十万火急
        type: "十万火急",
        // 距离
        dis: 2.3,
        // 发布者需求标题
        title: "发布者需求标题",
        // 时间
        time: "2019.02.02 18:36",
        // 发布者定位
        location: "发布者定位",
        // 内容
        content: "翠云万科欢迎32万/28方/22方车24小时随时开自运。要来拉的老板提前联系，结账方式随意。",
        // 图片
        userimg: [
          {
            url: "/pages/images/carousel/05.jpg",
          },
          {
            url: "/pages/images/carousel/06.jpg",
          },
          {
            url: "/pages/images/carousel/07.jpg"
          }
        ],
        // 视屏
        video: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        // 项目类型
        project: "车辆出售",
        // 拨打电话
        callphone: "",
        // 点赞数
        index: 1,
      }
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.login({
  success:res=>{
  console.log(res)

  }
})
  wx.getUserInfo({
    success:res=>{
      console.log(res)
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
  // ==============================================================================================================
  // //点赞处理函数（xx.js文件）
  // zan: function (item_id) {
  //   var that = this;
  //   var show;//传递到数据库点赞的状态      
  //   var cookie_mid = wx.getStorageSync('zan') || [];//获取全部点赞的mid       
  //   var newmessage = [];

  //   for (var i = 0; i < that.data.item_list.length; i++) {
  //     if (that.data.item_list[i].id == item_id) {//遍历找到对应的id
  //       var num = that.data.item_list[i].like_num;//当前赞数
  //       var isshow; //点赞的状态

  //       if (cookie_mid.includes(item_id)) {//说明已经点过赞,取消赞   
  //         for (var j = 0; j < cookie_mid.length; j++) {
  //           if (cookie_mid[j] == item_id) {
  //             cookie_mid.splice(j, 1);//删除取消赞的mid 
  //           }
  //         }
  //         --num;
  //         isshow = 0;//点赞的状态
  //         that.setData({
  //           [`item_list[${i}].like_num`]: num, //es6模板语法（反撇号字符）
  //           [`item_list[${i}].favor_img`]: "../../image/favor.png",
  //         })
  //         wx.setStorageSync('zan', cookie_mid);
  //         wx.showToast({
  //           title: "取消点赞!",
  //           icon: 'none'
  //         })
  //         //console.log("前端取消点赞"+isshow)

  //       } else {
  //         isshow = 1;//点赞的状态
  //         ++num;
  //         that.setData({
  //           [`item_list[${i}].like_num`]: num,//es6模板语法（反撇号字符）
  //           [`item_list[${i}].favor_img`]: "../../image/favor_press.png",
  //         })
  //         cookie_mid.unshift(item_id);//新增赞的mid
  //         wx.setStorageSync('zan', cookie_mid);
  //         wx.showToast({
  //           title: "点赞成功!",
  //           icon: 'none'
  //         })
  //         //console.log("前端点赞成功" + isshow)
  //       }
  //       //console.log(cookie_mid); 
  //       //点赞数据同步到数据库
  //       wx.request({
  //         url: 'https://xxx.xxxx.xxx/zan.php',
  //         method: 'POST',
  //         header: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //         data: {
  //           id: item_id,
  //           show: isshow,
  //         },
  //         success: function (res) {
  //           //console.log("show:" +show)
  //           //console.log(res.data);
  //         }
  //       })
  //     }
  //   }
  // },

  /**
   * 点赞
   */
  // favorclick: function (options) {
  //   var item_id = options.currentTarget.dataset.id;//此处找到列表的id
  //   //console.log(item_id);//列表id
  //   this.zan(item_id);
  // },
//  =============================================================================================================
})