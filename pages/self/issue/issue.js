// pages/self/issue/issue.js
import request from "../../login.js"
var dateTimePicker = require('./date.js');
Page({
  // 刷新
  ref(e){
    var id = e.currentTarget.dataset.id
    console.log("刷新的id",id)
    request({
      url:'http://tsf.suipk.cn/home/Personal/do_refresh',
      data:{
        info_id:id
      }
      }).then(res=>{
      console.log('调用成功',res)
      this.setData({
      
      })
      }).catch(err=>{
      console.log('调用失败')
    })
  },
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
    var that=this
    this.setData({
      seradio: e.detail
    });
    console.log(e.detail, "置顶类型")
    if(e.detail==1){
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
    }else if(e.detail==2){
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
    this.setData({
      sradio: e.detail
    });
    console.log(e.detail)
  },
  /* 隐藏弹窗 */
  sssuhide() {
    var that=this
    // 十万火急+置顶
      if(that.data.sradio==1){
        var lable=1
      }else if(that.data.sradio==2){
        if(that.data.seradio==1){
          var lable=2
        }else if(that.data.seradio==2){
          var lable=3
        }
      }else if(that.data.sradio==0){
      var lable=0
    }
    // 开始时间
    var start_time=that.data.stime
    // 结束时间
    var ending_time=that.data.etime
    console.log("最后开始结束时间+",start_time,ending_time,lable)
    var uid= wx.getStorageSync('uid');
    var info_id=that.data.info_id
    request({
      url:'http://tsf.suipk.cn/home/Personal/do_top',
      data:{
        info_id,
        uid,
        start_time,
        ending_time,
        lable,
      }
      }).then(res=>{
      console.log('调用申请置顶成功',res)
      that.onLoad()
      this.setData({
      
      })
      }).catch(err=>{
      console.log('调用失败')
    })

    this.setData({
      "sssup": true
    });
    console.log("隐藏弹框")
    var zzz = this.data
    // console.log(zzz.sradio,zzz.seradio,zzz.dates,zzz.edates)
    if (zzz.sradio == 0, zzz.stime == "", zzz.etime == "") {
      this.nsushow()
    }
  },
  /* 显示弹窗 */
  ssushow(e) {
    console.log(e)
    var e=e.currentTarget.dataset.id
    console.log("显示弹框")
    this.setData({
      "sssup": false,
      info_id:e
    })

  },

  // 
  goto:function(e){
    var that =this
    var id = e.currentTarget.dataset.id
    console.log(e)
    console.log("跳转",id)
    console.log(e)
    console.log(id)
    wx.navigateTo({
      url: '/pages/details/details?id='+id+'&from=首页'+'&form=3',
    })
  },
  // 修改跳转
  up:function(e){
    var id = e.currentTarget.dataset.id
    var form = e.currentTarget.dataset.form
    console.log(e)
    console.log("修改的",id,form)
    if(form==1){
      wx.navigateTo({
        url: '/pages/Ac/hiring/hiring?pid='+id+"&form="+form,
      })
    }else if(form==2){
      wx.navigateTo({
        url: '/pages/Ac/jobs/jobs?pid='+id+"&form="+form,
      })
    }else {
      wx.navigateTo({
        url: '/pages/Ac/issue/issue?pid='+id+"&form="+form,
      })
    }
    
  },
//  修改type
change:function(e){
  var that=this
  var id = e.currentTarget.dataset.id
  var i = e.currentTarget.dataset.index
  console.log("店家的",id)
  console.log(e)
  var index="usermes["+i+"].type"
  that.setData({
    [index]:"正在进行"
  })
  request({
    url:'http://tsf.suipk.cn/home/Personal/do_completed',
    data:{
      info_id:id
    }
    }).then(res=>{
    console.log('调用修改详情成功',res,id)
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
  })
},
//  修改type
change2:function(e){
  var that=this
  var id = e.currentTarget.dataset.id
  console.log("店家的",id)
  that.setData({
    show:false
  })
},
  // 我要发布跳转
  iss:function(){
    wx.navigateTo({
      url: '/pages/Ac/post/post',
    })
  },
  // 搜索跳转
  search: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // +++++++++++++++++++++
    // date: '2018-10-01',
    // time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2019,
    endYear: 2020,
    // 
    dateTimeArray2: null,
    dateTime2: null,
    dateTimeArray12: null,
    dateTime12: null,
    startYear2: 2019,
    endYear2: 2024,
    // 开始时间
    stime:"",
    // 结束时间
    etime:"",
    // +++++++++++++++++++++
    show:true,
    // 错误提示
    nsup: true,
    // 消耗积分
    int: 0,
    // 时间分类
    index: 0,
    dates: '请选择开始时间',
    edates: '请选择结束时间',
    sssup: true,
    // 单选框
    sradio: '0',
    seradio: '1',
    // 
    usermes:[
      {
        id:0,
        // 标题
        til:"发布内容标题",
        // 状态
        type:"已完成",
        // 
        
      }
      ],
    fin: "改为正在进行",
    // // 改为正在进行
    // btn:"改为已完成",
    // // 正在进行
    // ing:"正在进行",
    // ing2:"正在进行",
    // // 样式
    // ch: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.ing=="已完成"){
      this.setData({
        ch:1
      })
    }
    var uid=wx.getStorageSync('uid');
    request({
      url:'http://tsf.suipk.cn/home/Personal/do_release_list',
      data:{
        uid,
        page:1,
        limit:10,
      }
      }).then(res=>{
      console.log('调用个人中心我的发布列表成功',res.data.list)
      console.log('调用个人中心我的发布列表成功',res)
      for(var i in res.data.list){
        // var type="res.data.list["+i+"].type"
        if(res.data.list[i].working_condition==1){
          res.data.list[i].working_condition="正在进行"
        }else if(res.data.list[i].working_condition==3){
          res.data.list[i].working_condition="已完成"
          continue
        } 
      }
      // console.log("修改结果",res)
      this.setData({
        usermes:res.data.list
      })
      }).catch(err=>{
      console.log('调用失败')
    })


    // ++++++++++++++++++++++++++++++++
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      // 
      dateTime2: obj.dateTime,
      dateTimeArray2: obj.dateTimeArray,
      dateTimeArray12: obj1.dateTimeArray,
      dateTime12: obj1.dateTime
    });
  },

    // ++++++++++++++++++++++++++++++++
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
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      
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
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  
      this.setData({
        dateTimeArray2: dateArr,
        dateTime2: arr
      });
    },
    changeDateTimeColumn12(e) {
      var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
  
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
  
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