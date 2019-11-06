// pages/Ac/issue/issue.js
import request from "../../login.js";
// var that =this
var dateTimePicker = require('./date.js');
var dateTimePicker2 = require('./date2.js');
Page({
  op:function(){
    this.setData({
      'sssup':true,
      radio:'2'
    })

  },
chp:function(){
  this.setData({
    mz:false
  })
},
  // ////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////
  /* 隐藏弹窗 */
  nsuhide(flag = true) {
    this.setData({
      "nsup": flag
    });
  },
  /* 显示弹窗 */
  nsushow() {
    this.nsuhide(false);
  },
  // /////////////////////////////////////////////////////////////////////
  // 时间分类
  // 结束
  ebindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      edates: e.detail.value
    })
  },
  // 开始
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 第二个单选
  seonChange(e) {
    var that = this
     
    this.setData({
      seradio: e.detail
    });
    console.log(e.detail, "置顶类型")
    if (e.detail == 1) {
     //  消耗积分
  var start_time=this.data.stime
  var ending_time=this.data.etime
  wx.request({
    url: 'http://tsf.suipk.cn/home/info/do_all_inintegral',
    data: {
      lable:2,
      start_time,
      ending_time,
    },
    method: 'POST',
    header: {
    'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
    console.log('调用十万火急成功', res.data.data)
    that.setData({
      int:res.data.data
    })
    }, fail: function () {
    console.log('调用失败')
    }
    })

    } else if (e.detail == 2) {
      var start_time=this.data.stime
      var ending_time=this.data.etime
      wx.request({
        url: 'http://tsf.suipk.cn/home/info/do_all_inintegral',
        data: {
          lable:3,
          start_time,
          ending_time,
        },
        method: 'POST',
        header: {
        'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
        console.log('调用十万火急成功', res.data.data)
        that.setData({
          int:res.data.data
        })
        }, fail: function () {
        console.log('调用失败')
        }
        })
    
    }
  },
  // 单选框
  sonChange(e) {
    var that=this
    this.setData({
      sradio: e.detail
    });
    console.log(e.detail)
  },
  /* 隐藏弹窗 */
  sssuhide() {
    this.setData({
      "sssup": true
    });
    console.log("隐藏弹框")
    var zzz = this.data
    console.log("开始借宿花四溅"+zzz.stime,zzz.etime,zzz.int)
    console.log(zzz.sradio, zzz.seradio)
    if (zzz.sradio == 0, zzz.stime == "", zzz.etime == "") {
      this.nsushow()
    }
  },
  /* 显示弹窗 */
  ssushow() {
    console.log("显示弹框")
    this.setData({
      "sssup": false
    })

  },
  // ////////////////////////////////////////////////////////////////////


  // 选择是弹出框
  yes: function () {
    this.ssushow()
  },

  // /////////////////////////////////////////////////////////////////////////////

  // 单选框
  onChange(e) {
    this.setData({
      radio: e.detail
    });
    console.log(e.detail)
  },
  // 改变全局窗口
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  },
  // 判断form表单中的东西
  formSubmit: function (e) {
    var m = e.detail.value
    var that=this
    // 发布标题
    var title=m.i1
    // 联系人
    var contacts=m.i2
    // 联系电话
    var tel=m.i3
    // 上传图片
    // 评论内容
    if(m.textarea==''){
      var info=''
    }else{
      var info=m.textarea
    }
    // &&that.data.img_url_arr==''&&that.data.video_url==''
    if(that.data.tempFilePaths==''){
      var img_url_arr=''
    }else{
      var p=that.data.img_url_arr
      console.log('文件',that.data.img_url_arr)
      var z=p.join('|')
      var img_url_arr=z
      console.log(z)
    }
    if(that.data.tempFilePathss==''){
      var video=''
    }else{
      // 公司视频
      var video=that.data.video_url
    }
    console.log('打印左最后值',img_url_arr,video)
    
    // 一级id
    var one_class_id=that.data.one_class
    // 二级id
    var two_class_id=that.data.two_class
    var uid=wx.getStorageSync("uid");
    // 十万火急+置顶
    if(that.data.radio==1){
      if(that.data.sradio==1){
        var lable=1
      }else if(that.data.sradio==2){
        if(that.data.seradio==1){
          var lable=2
        }else if(that.data.seradio==2){
          var lable=3
        }
      }
      }else if(that.data.radio==0||that.data.radio==2){
      var lable=0
    }
    // 开始时间
    var start_time=that.data.stime
    // 结束时间
    var ending_time=that.data.etime
    console.log("最后开始结束时间+",start_time,ending_time,lable)
    if(that.data.issu==false){
    if (m.i1 == "" || m.i2 == "" || m.i3 == "") {
      this.hidePopup(false);
      that.setData({
        sq:true
      })
    } else {
      
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      wx.request({
        url: "http://tsf.suipk.cn/home/info/do_addinfo",
        data: {
          uid,
          title,
          contacts,
          tel,
          img_url_arr,
          video,
          one_class_id,
          two_class_id,
          info,
          start_time,
          ending_time,
          lable
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.code==0){
            that.suhide(false);
            that.setData({
              sq:true
            })
          }
          if(res.data.code==101){
            that.setData({
              pm:false,
              sq:true
            })
          }
          console.log("其他发布调用成功", res)
        }, fail: function () {
          console.log("其他发布调用失败")
        }
      })
    }
      // +++++++++++个人中心重新发布++++++++++++++++++++++++++++++++
      if(that.data.issu==true){
        request({
          url:'http://tsf.suipk.cn/home/Personal/do_modify_info',
          data:{
            form:3,
            info_id:that.data.info_id,
            title,
            contacts,
            tel,
            img_url_arr,
            video,
            info,
            imgh_url,
          }
          }).then(res=>{
          console.log('调用成功',res)
          this.setData({
          
          })
          }).catch(err=>{
          console.log('调用失败')
        })
      }
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
    console.log(this.data.tempFilePaths.length)
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag,sq:false
    });
    console.log('点击的',this.data.sup)
  },
  con:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag,
      sq:false
    });
  },
  next: function () {

  },
  /**
        * 上传视频方法
        */
  uploads: function () {
    let that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePath;

        that.setData({
          tempFilePathss: tempFilePath
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        wx.uploadFile({
          url: 'http://tsf.suipk.cn/home/info/do_video',
          filePath:tempFilePath,
          name: 'video_url',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // count++;
            var res=res.data
            var resl=JSON.parse(res)
            console.log("视屏保存成功",res)
            var video_url=resl.data
            that.setData({
              video_url,
            })
            //如果是最后一张,则隐藏等待中  
            console.log("检测是否成功",res)
            // if (count == tempFilePath.length) {
            //   wx.hideToast();
            // }
          },
          fail: function (res) {
            console.log("删除更换失败",res)
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '上传图片失败',
              showCancel: false,
              success: function (res) { }
            })
          }
        });
      }
    })
  },
  // uploadvideo: function () {
  //   var src = this.data.src;
  //   wx.uploadFile({
  //     url: '**************/Upload', //服务器接口
  //     filePath: src,
  //     header: {
  //       'content-type': 'multipart/form-data'
  //     },
  //     name: 'files',
  //     success: function (res) {
  //       console.log(res.data)
  //     },
  //     fail: function () {
  //       console.log('接口调用失败')
  //     }
  //   })
  // },
  /**
 * 长按删除图片
 */
  deleteVideo: function () {
    var that = this;
    var tempFilePaths = that.data.tempFilePathss;
    wx.showModal({
      title: '提示',
      content: '确定要删除此视频吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          tempFilePaths = "";
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePathss: tempFilePaths
        });
      }
    })
  },
  // ?=============================================================================
  /**
       * 上传图片方法
       */
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 3, // 默认9
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
        // if(){

          var count = 0;
          var a =[]
          for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            //上传文件
          wx.uploadFile({
            url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            filePath: tempFilePaths[i],
            name: 'image',
            method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
            success: function (res) {
              // console.log(that.data.tempFilePaths[1])
              console.log("检验图片上传",res)
              count++;
              var qwe=res.data
              var resl=JSON.parse(qwe)
              a.push(resl.data)
              console.log("返回值",resl,a)
              that.setData({
                img_url_arr:a
              })
              console.log('最后a',that.data.a)
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
          });
        // }//if
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
  hp(){
    this.setData({
      pm:true,
      sq:false
    })
    wx.navigateTo({
      url: '/pages/self/goup/goup',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    pm:true,
    // 一级列表
    one_class:"",
    // 二级列表
    two_class:"",
    // 错误提示
    nsup: true,
    // 消耗积分
    int: 0,
    // 时间分类
    index: 0,
    sssup: true,
    // 单选框
    sradio: '0',
    seradio: '1',
    // 置顶方式
    lable:"",
    // 单选框
    radio: '0',
    // eradio: '0',
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    // 图片路径
    tempFilePaths: [],
    tempFilePathss: "",
    // +++++++++++++++++++++
    // date: '2018-10-01',
    // time: '12:00',
    dateTimeArray: '',
    dateTime: '',
    dateTimeArray1: '',
    dateTime1: '',
    startYear: 2019,
    endYear: 2020,
    // 
    dateTimeArray2: '',
    dateTime2: '',
    dateTimeArray12: '',
    dateTime12: '',
    startYear2: 2019,
    endYear2: 2024,
    // +++++++++++++++++++++
    // 开始时间
    stime:"",
    // 结束时间
    etime:"",
    // 调用个人中心
    h:false,
    h2:false,
    h3:false,
    h4:false,
    issu:false,
    mz:true
  },
  
  // onInput(event) {
  //   this.setData({
  //     currentDate: event.detail,
  //   });
  //   console.log("选择的开始时间",this.data.currentDate)
  // },
  // showPopupms() {
  //   this.setData({ show: true });
  // },

  // onClosems() {
  //   this.setData({ show: false });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前时间戳  
var timestamp = Date.parse(new Date());  
timestamp = timestamp / 1000;  
console.log("当前时间戳为：" + timestamp); 

//获取当前时间 
    var n = timestamp * 1000;  
    var date = new Date(n);  
    //年  
    var Y = date.getFullYear();  
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    //时  
    var h = date.getHours();  
    //分  
    var m = date.getMinutes();  
    //秒  
    var s = date.getSeconds();  
    console.log("当前时间：" +Y+'-'+M+'-'+D+' '+h+":"+'00'+":"+'00');
this.setData({
  stime:Y+'-'+M+'-'+D+' '+h+":"+'00'+":"+'00',
  etime:Y+'-'+M+'-'+D+' '+(h+1)+":"+'00'+":"+'00'
})
    var that=this
    var phone=wx.getStorageSync("userphone")
    that.setData({
      phone,
    })
    console.log("信息id1",options)
    var title=options.title
    wx.setNavigationBarTitle({
      title: title
    })
    that.setData({
      title
    })
    // +++++++++++++++++++个人中心跳转发布+++++++++++++++++++++++++++++
    if(options.pid!=undefined){
      request({
        url:'http://tsf.suipk.cn/home/Personal/do_modify_details',
        data:{
          info_id:options.pid,
          form:options.form
        }
        }).then(res=>{
        console.log('调用个人中心跳转其他发布成功',res)
        this.setData({
          info_id:options.id,
          h:true,
          h2:true,
          h3:true,
          h4:true,
          issu:true,
          hr:res.data.data.title,
          hr2:res.data.data.contacts,
          hr3:res.data.data.tel,
          hr4:res.data.data.info,
          tempFilePaths:res.data.data.img_url_arr,
          tempFilePathss:res.data.data.video,
        })
        }).catch(err=>{
        console.log('调用失败')
      })
    }
    // +++++++++++++++++++个人中心跳转发布+++++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++++++++
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker2.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTime2: obj1.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj.dateTime,
      dateTime12: obj1.dateTime,
      dateTimeArray2: obj.dateTimeArray,
      dateTimeArray12: obj1.dateTimeArray,
    });
    // ++++++++++++++++++++++++++++++++
    // /获取二级列表
    console.log("获取一级列表",options.id)
    console.log("获取二级列表",options.idtwo)
    that.setData({
        one_class:options.id,
        two_class:options.idtwo,
   })
  },
  // changeDate(e) {
  //   this.setData({ date: e.detail.value });
  // },
  // changeTime(e) {
  //   this.setData({ time: e.detail.value });
  // },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
    console.log("触发1",e)
    // console.log("触发1",e)

  },
  // 确定函数
  changeDateTime1(e) {
    var that=this
    this.setData({ dateTime1: e.detail.value });
    console.log("确定触发函数",this.data.dateTime1)
    var time=this.data.dateTime1
    console.log("确定函数触发1-年份",this.data.dateTimeArray1[0][time[0]])
    console.log("确定函数触发2-月份",this.data.dateTimeArray1[1][time[1]])
    console.log("确定函数触发3-日期",this.data.dateTimeArray1[2][time[2]])
    console.log("确定函数触发4-小时",this.data.dateTimeArray1[3][time[3]])
    var em="00:00"
    var s1=new Array(this.data.dateTimeArray[0][time[0]],this.data.dateTimeArray[1][time[1]],this.data.dateTimeArray[2][time[2]])
    var s2 =new Array(
      this.data.dateTimeArray[3][time[3]],em
    )
    var  p1=s1.join('-')
    var p2=s2.join(':')
    var  pList=p1+''+p2
    console.log("最后结果"+pList)
    that.setData({
      stime:pList
    })
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker2.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  // 
  changeDateTime2(e) {
    this.setData({ dateTime2: e.detail.value });
  },
  changeDateTime12(e) {
    var that=this
    this.setData({ dateTime12: e.detail.value });
    var time=this.data.dateTime12
    console.log("确定函数触发1-年份",this.data.dateTimeArray2[0][time[0]])
    console.log("确定函数触发2-月份",this.data.dateTimeArray2[1][time[1]])
    console.log("确定函数触发3-日期",this.data.dateTimeArray2[2][time[2]])
    console.log("确定函数触发4-小时",this.data.dateTimeArray2[3][time[3]])
    var em="00:00"
      var end1=new Array(this.data.dateTimeArray2[0][time[0]],this.data.dateTimeArray2[1][time[1]],this.data.dateTimeArray2[2][time[2]])
      var end2 =new Array(
        this.data.dateTimeArray2[3][time[3]],em
      )
      var  p1=end1.join('-')
      var p2=end2.join(':')
      var  pList2=p1+''+p2
      console.log("选择的最后时间",pList2)
      console.log("最后结果"+pList2)
      that.setData({
        etime:pList2
      })
    // 
    var start_time=this.data.stime
    var ending_time=this.data.etime
  if (this.data.sradio == 1) {
      //  消耗积分
   wx.request({
     url: 'http://tsf.suipk.cn/home/info/do_all_inintegral',
     data: {
       lable:1,
       start_time,
       ending_time,
     },
     method: 'POST',
     header: {
     'content-type': 'application/x-www-form-urlencoded'
     },
     success: function (res) {
     console.log('调用十万火急成功', res.data.data)
     that.setData({
       int:res.data.data
     })
     }, fail: function () {
     console.log('调用失败')
     }
     })
 
     } 
  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker2.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr
    });
  },
  changeDateTimeColumn12(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker2.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray12: dateArr,
      dateTime12: arr
    });


    
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
    console.log("时间1",this.data.dateTime1)
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