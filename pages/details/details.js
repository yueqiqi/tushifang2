// pages/details/details.js
Page({
  // 评论
  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  //隐藏输入框
  onHideInput: function () {
    this.setData({
      showInput: false
    })
    console.log('hide+++++++++++')
  },

  //拨打电话 
  callphone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },

  formSubmit: function (e) {
    var e = e.detail.value
    var info_id=this.data.lid
    var img_url_arr=this.data.tempFilePaths
    var content=e.textarea
    if (e.textarea.length < 5) {
      wx.showToast({
        title: '字数在5~100字哟~~~',
        image: "../images/fail.png",
        duration: 2000
      })
    } else {
      wx.showModal({
        title: '提交成功',
        content: "提交成功，我们会在1-3个工作日内进行审核，如果举报属实，会对该用户做出相应惩罚，审核消息会在第一时间发送至您的消息中心，请注意查收。",
        showCancel: false,
        icon: 'success',
        duration: 2000,
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击了确定")
            console.log(res);
            console.log(res.confirm)
          }
        }
      })
      // **************************
      // 举报
      wx.request({
        url:"http://tsf.suipk.cn/home/info/do_report",
        data:{
          uid:1,
          info_id,
          content,
          img_url_arr
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log("举报调用成功",res)
        },fail:function(){
          console.log("调用举报失败",res)
        }
      })
      // **************************
    }
    this.hideModal();
  },
  /**
   * 字数限制
   */
  inputs: function (e) {

    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // //最少字数限制
    // if (len < this.data.min) {
    //   wx.showToast({
    //     title:"建议内容要5-100字哟",
    //     image:"../../images/like.png"
    //   })
    //   // this.setData({
    //   //   texts: "请至少要输入5个字哦"
    //   // })
    // } 
    // else if (len >= this.data.min) {
    //   this.setData({
    //     texts: " "
    //   })
    // }
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  /**
   * 上传图片方法
   */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          /*  wx.uploadFile({
              url: HOST + '地址路径',
              filePath: tempFilePaths[i],
              name: 'uploadfile_ant',
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                count++;
                //如果是最后一张,则隐藏等待中  
                if (count == tempFilePaths.length) {
                  wx.hideToast();
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })
              }
            });*/
        }
      }
    })
  },
  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    console.log(that.data.tempFilePaths[index]);
    console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
  },
  /**
   * 长按删除图片
   */
  deleteImage: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  /**
  * 弹窗
  */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })

  },
  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  // 分享
  share:function(){
    console.log("分享")
  },
  // 评论
  comment:function(){
    console.log("评论")
  },
  // 点赞
  like:function(){
    console.log("点赞")
  },
  // 投诉
  complaint:function(){
    console.log("投诉")
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
    // 项目标题
    title:"二手车出售，电话联系",
    // 项目类型
    type:"车辆出售",
    // 发布时间
    time:"2019.05.20 12:30",
    // 项目介绍
    rec: "帮朋友急招一个能长期开的老渣娃，主要在渝北江北地区跑，住在渝北两路熟悉渝北路线的优先，杰斯430.22方，工资7000保底三万开始提10% 每月工资兑现，新手和找车练手的就不要打扰了。",
    // 联系人
    linkman:"张三",
    // 联系电话
    phone:"13500000000",

    min: 5,//最少字数
    max: 100, //最多字数 (根据自己需求改变)
    tempFilePaths: [],
    like:20,
    // 图片
    userImg: [
      {
        url: "../images/carousel/05.JPg",
      },
      {
        url: "../images/carousel/06.JPg",
      },
      {
        url: "../images/carousel/07.JPg"
      }, 
    ],
    // 视频
    video:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
  /////////////////////////////////////////
    // 评论
    // 头像
    user:[
      {
        head:"",
    // 用户名
    username:"用户名",
    // 时间
    usertime:"2019.07.22",
    // 内容
    usercontent: "唯格Viewgres，集设计、研发、生产、全球贸易于一体的瓷砖企业。为商业建筑和高端住宅提供优质建材产品与应用解决方案。",
      },
       {
        head: "",
        // 用户名
        username: "用户名",
        // 时间
        usertime: "2019.07.22",
        // 内容
        usercontent: "唯格Viewgres，集设计、研发、生产、全球贸易于一体的瓷砖企业。为商业建筑和高端住宅提供优质建材产品与应用解决方案。",
      }
    ],
    // 接收并保存首页传来的id值
    lid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("首页传来的id="+options.id)
    this.setData({
      lid:options.id
    })

    // wx.request({
    //   url: 'http://tsf.suipk.cn',
    //   data: {
    //   },
    //   method: 'POST',
    //   header: {
    //   'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //   console.log('调用成功', res.data.data)
    //   }, fail: function () {
    //   console.log('调用失败')
    //   }
    // })
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
    return {
      title: '转发',//弹出分享时显示的分享标题
      path: '/pages/index/index',//'/page/user?id=123' // 路径，传递参数到指定页面。
      desc: '分享页面的内容',
      success: function (res) { }

    }
  }
})