// pages/demo/demo.js


Page({
  filter: function (e) {
    //console.log(e);
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, price = e.currentTarget.dataset.price
    self.setData({
      gg_id: id,
      gg_txt: txt,
      gg_price: price
    });
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  data: {
    // 弹出详情
    showModalStatus: true,//是否显示
    gg_id: 0,//规格ID
    gg_txt: '',//规格文本
    gg_price: 0,//规格价格
    guigeList: [{ guige: '100', price: '150' }, { guige: '200', price: '150' }, { guige: '300', price: '150' }],
    num: 1,//初始数量
    minusStatus: 'disabled',
    // 选项卡
    currentTab: 0,
    currentData: 0,
    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
    lists: [],              // 接收搜索的内容
    wxSearchData: '',       // 输入的值
    // m:"a",
    // focus: true,
    // inputValue: ''
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // //滑动切换
  // swiperTab: function (e) {
  //   var that = this;
  //   that.setData({
  //     currentTba: e.detail.current
  //   });
  // },
  // //点击切换
  // clickTab: function (e) {

  //   var that = this;

  //   if (this.data.currentTab === e.target.dataset.current) {
  //     return false;
  //   } else {
  //     that.setData({
  //       currentTab: e.target.dataset.current
  //     })
  //   }
  // },

  // showDialogBtn: function () {
  // wxSearchInput: function (value) {
  //   var that = this;
  //   if (value.detail.value.length > 0) {
  //     wx.request({
  //       url: '',
  //       data: {
  //         value: value.detail.value
  //       },
  //       header: { 'content-type': 'application/x-www-form-urlencoded' },
  //       method: 'POST',
  //       dataType: json,
  //       responseType: text,
  //       success: function (res) {
  //         if (res.code) {
  //           var data = that.data.lists;
  //           for (let i = 0; i < res.data.length; i++) {
  //             data.push(res.data[i]);
  //           }
  //           that.setData({
  //             wxSearchData: value.detail.value,
  //             lists: data
  //           })
  //         }
  //       },
  //       fail: function (res) { },
  //       complete: function (res) { },
  //     })
  //   }
  // },

  /**
   * 监听软键盘确认键
   */
  wxSearchConfirm: function (e) {

  },

  /**
   * 返回
   */
  back: function (e) {
    wx: wx.navigateBack({
      delta: 1,
    })
  },
  //返回上一层
  goback() {
    wx.navigateBack({
      success(res) {
        console.log("返回成功")
      },
      fail(res) {
        console.log("error")
      }
    })
  },

  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    console.error('show+++++++++++')
  },
  //隐藏输入框
  onHideInput: function () {
    this.setData({
      showInput: false
    })
    console.error('hide+++++++++++')
  },


  //   this.setData({

  //     showModal: true

  //   })

  // },

  // /**
  // * 弹出框蒙层截断touchmove事件
  // */

  // preventTouchMove: function () {

  // },

  // /**
  // * 隐藏模态对话框
  // */

  // hideModal: function () {

  //   this.setData({

  //     showModal: false

  //   });

  // },

  // /**
  // * 对话框取消按钮点击事件
  // */

  // onCancel: function () {

  //   this.hideModal();

  // },

  // /**
  // * 对话框确认按钮点击事件
  // */

  // onConfirm: function () {

  //   wx.showToast({

  //     title: '提交成功',

  //     icon: 'success',

  //     duration: 2000

  //   })

  //   this.hideModal();

  // },
  // // 
  // cl:function(){
  //   this.setData({
  //     m:"b"
  //   })
  // },
  // bindKeyInput: function (e) {
  //   this.setData({
  //     inputValue: e.detail.value
  //   })
  // },
  /**
 * 页面的初始数据
 */
  
  // // 点赞
  // dianzan: function (event) {
  //   var that = this;
  //   // console.log(id);
  //   // console.log(app.globalData.userInfo);
  //   // 已经授权---执行点赞
  //   console.log('点赞中获取number' + that.data.number);
  //   var liked_num = that.data.liked_num;

  //   // console.log("点击了同意授权");
  //   var that = this
  //   wx.request({
  //     url: 'https://xxxxx/video/like',
  //     data: {
  //       id: that.data.id,
  //       number: that.data.number
  //     },

  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       that.setData({
  //         msg: res.data.msg
  //       })
  //       // that.changeData();
  //       console.log(res.data.msg)
  //       if (res.data.msg == '点赞成功') {
  //         that.setData({
  //           liked: 1,
  //           favor_img: "../images/comment.png",
  //           liked_num: liked_num + 1
  //         })

  //       } else {
  //         that.setData({
  //           liked: 0,
  //           favor_img2: "../images/like.png",
  //           liked_num: liked_num - 1
  //         })
  //       }
  //       wx.showToast({
  //         title: res.data.msg,
  //         icon: 'success',
  //         duration: 1500
  //       })
  //     }
  //   })
  // },

/*更新点赞*/ 
  // update_zan:function(e){  
  //   var that = this;  
  //   var data = e.currentTarget.dataset;  
  //   var mid = data.mid;  
  //   var cookie_mid = wx.getStorageSync('zan') || [];//获取全部点赞的mid  
  //   var isadd = 1;  
  //   var newmessage = [];  
  //   if (cookie_mid.includes(mid)){//说明已经点过赞,取消赞  
  //     isadd = 0;  
  //     var m = 0;  
  //     for (var j in cookie_mid){  
  //       if(cookie_mid[j] != mid){  
  //         newmessage[m] = cookie_mid[j];  
  //         m++  
  //       }  
  //     }  
  //     wx.setStorageSync('zan', newmessage);//删除取消赞的mid  
  //   }else{  
  //     cookie_mid.unshift(mid);  
  //     wx.setStorageSync('zan', cookie_mid);//新增赞的mid  
  //   }  
  //   wx.request({  
  //     url: app.globalData.api.api_system,  
  //     data: {  
  //       action: 'zannum',  
  //       mid: mid,  
  //       isadd: isadd,  
  //       wxid: app.globalData.wxid  
  //     },  
  //     method: 'GET',  
  //     // header: {},   
  //     success: function (res) {  
  //       var message = that.data.message;  
  //       for (var i in message) {  
  //         if(message[i].mid == mid){  
  //           if(isadd){  
  //             message[i].zan = parseInt(message[i].zan) + 1  
  //           }else{  
  //             message[i].zan = parseInt(message[i].zan) - 1  
  //           }  
              
  //         }  
  //       }  
  //       that.setData({  
  //         message: message  
  //       })  
  //     }  
  //   })
  // favorclick: function (e) {
  //        var likeFlag = false; //标志，避免多次发请求
  //        //避免多次点击
  //        if (likeFlag === true) {
  //            return false;
      
  //   }
  //       var that = this;
  //   //      if (e.currentTarget.dataset.userid == that.data.user_id) {
  //   //         //  that.Pop_show('../images/share.png', '不能给自己评论点赞');
  //   //          return
      
  //   // }
  //        var comment_id = e.currentTarget.dataset.id; //点击当前项的id
  //        var index = e.currentTarget.dataset.dex;
  //        var islike = e.currentTarget.dataset.islike;
  //        var message = this.data.talks;
  //        var timestamp = Date.parse(new Date());
  //        timestamp = timestamp / 1000;
  //        var zanInfo = {
  //            token: App.globalData.portConfig.token,
  //            timestamp: timestamp,
  //            comment_id: comment_id,
  //            cancel: islike,
  //          }
  //        var zanData = zanInfo;
  //        var postzanData = that.makePostData(zanData, that.data.key);
  //        wx.request({
  //            url: App.globalData.portConfig.HTTP_BASE_URL + '/comment/addLike', //点赞接口
  //            data: postzanData,
  //            method: 'POST',
  //            header: {
  //                'content-type': 'application/x-www-form-urlencoded'

  //     },
  //            success: function (res) {
  //                for (let i in message) {
  //                    if (i == index) {
  //                        if (message[i].is_like == 0) {
  //                            that.data.talks[index].is_like = 1
  //                            message[i].like_num = parseInt(message[i].like_num) + 1
              
  //           } else {
  //                            that.data.talks[index].is_like = 0
  //                            message[i].like_num = parseInt(message[i].like_num) - 1
              
  //           }
            
  //         }
          
  //       }
  //                that.setData({
  //                    talks: message

  //       })
  //                console.log("点赞成功", res);
        
        
  //     },
  //            complete: function (res) {
  //                likeFlag = false;
        
  //     }
  //    })
  //  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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