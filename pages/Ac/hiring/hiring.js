// pages/Ac/hiring/hiring.js
import request from "../../login.js" ;
var dateTimePicker = require('./date.js');
var dateTimePicker2 = require('./date2.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
var model = require('../../../model/model.js');
var ashow = false;
var item = {};
Page({
  op1:function(){
    this.setData({
      'sssup':true,
      radio:'2',
      sq:false,
      pm:true
    })
  },
  op:function(){
    this.setData({
      'sssup':true,
      radio:'2',
      sq:false
    })
  },
  chp:function(){
    var that=this
    that.setData({
      mz:false
    })
  },
   //点击选择城市按钮显示picker-view
   translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    console.log("id = " + e.target.dataset.id)
    model.animationEvents(this, 200, false, 400);
    //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
    if (e.target.dataset.id == 666) {
      this.updateShowData()
    }
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()
    
  },
  //更新顶部展示的数据
  updateShowData: function (e) {
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name,
      h3:false
    });
    console.log("最后选择的",this.data.province,this.data.city,this.data.county);
  }
  ,


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
    this.setData({
      "sssup": true
    });
    console.log("隐藏弹框")
    var zzz = this.data
    console.log("是否置顶"+zzz.sradio,"置顶类型"+zzz.seradio,"开始时间"+zzz.dates,"结束时间"+zzz.edates)
    if (zzz.sradio == 0, zzz.dates == "", zzz.edates == "") {
      this.nsushow()
    }
  },
  /* 显示弹窗 */
  ssushow() {
    console.log("显示弹框")
    this.setData({
      "sssup": false
    })
    this.onLoad
  },
// ////////////////////////////////////////////////////////////////////


  // 选择是弹出框
  yes:function(){
this.ssushow()
this.setData({
  sq:true
})
  },
 
  // /////////////////////////////////////////////////////////////////////////////

  // 单选框
  onChange(e) {
    this.setData({
      radio: e.detail
    });
    console.log(e.detail)
  },
  // ======================================================
  // 求职状态
  // 下拉选项框
  selectTap3(e) {
    this.setData({
      selectShow3: !this.data.selectShow3,
      selectShow2: false,
      selectShow: false,
      h4:false
    });
    request({
      url:'http://tsf.suipk.cn/home/info/do_work_years_list',
      data:{
        code:"",
        mes:""
      }
      }).then(res=>{
      console.log('调用工作年限成功',res)
        this.setData({
          selectData3:res.data.data
      })
      }).catch(err=>{
      console.log('调用工作年限失败')
    })
    // console.log(e)
  },
  // 点击下拉列表
  optionTap3(e) {

    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      index3: Index,
      selectShow3: !this.data.selectShow3,
    });
  },
  // ======================================================
  // ======================================================
  // 薪资待遇
  // 下拉选项框
  selectTap2(e) {
    this.setData({
      selectShow2: !this.data.selectShow2,
      selectShow3: false,
      selectShow: false,
      h2:false
    });
    // +++++++++++++++++++++++请求薪资下拉列表++++++++++++++++++++++++++
    var that=this
    request({
      url:'http://tsf.suipk.cn/home/info/do_salary_list',
      data:{
        code:"",
        mes:""
      }
      }).then(res=>{
      console.log('调用薪资成功',res)
        this.setData({
          selectData2:res.data.data
      })
      }).catch(err=>{
      console.log('调用失败')
    })
    // +++++++++++++++++++++++请求薪资下拉列表++++++++++++++++++++++++++
    // console.log(e)
  },
  // 点击下拉列表
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标
    console.log(Index)
    // console.log(e)
    this.setData({
      indexs: Index,
      selectShow2: !this.data.selectShow2,
    });
  },
  // ======================================================
  // =========================================================
  // 双击
  doubleClick: function (e) {
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time  // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据
    console.log(e)
    if (curTime - lastTime > 0) {
      if (curTime - lastTime < 500) {
        this.setData({
          isDisabled: false,
          hidden:true
        })
      }
    }
    this.setData({
      lastTapTime: curTime
    })
  },

  // 下拉选项框
  selectTap(e) {
    var that=this
    this.setData({
      selectShow: !this.data.selectShow,
      selectShow3: false,
      selectShow2: false,
      h:false
    });

    // ++++++++++++++++++++++++++请求下拉列表++++++++++++++++++++++++++++++
    wx.request({
      url:"http://tsf.suipk.cn/home/Personal/do_id_type",
     data:{
      type:1,
     },
     method: 'POST',
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success:function(res){
      
       that.setData({
         selectData:res.data.data
       })
       console.log(that.data.selectData)
      console.log('工种结果'+that.data.selectData)
    },fail:function(){
        console.log("调用工种失败")
       }
    })
    // ++++++++++++++++++++++++++请求下拉列表++++++++++++++++++++++++++++++
    // console.log(e)
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表选项的下标

    var type_work_id=e.currentTarget.dataset.id
    console.log("公衆id",type_work_id)
    // console.log(e)
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      type_work_id,
    });

    console.log(this.data.isDisabled)
  },
  // =========================================================
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
    var that=this
    var m = e.detail.value
    console.log(e.detail.value);
    // 工种
    var type_work=m.i1
    console.log(type_work)
    // 薪资范围
    var salary_range=m.i2
    // 工作地点
    var work=that.data.province+that.data.city+that.data.county
    
    // 工作年限
    var working_years=m.i4
    // 联系人
    var contacts=m.i5
    // 联系电话
    var corporate_name
    // 公司名称
    if(m.i7==''){
      corporate_name=''
    }else{
      corporate_name=m.i7
    }
    var tel=m.i6
    // 详细地址
    var detailed_address
    if(m.i8==''){
      detailed_address=''
    }else{
      detailed_address=m.i8
    }
    // 公司图片
    var p=that.data.img_url_arr
    if(this.data.tempFilePaths.length ==0){
      var img_url_arr=''
    }else{
      var z=p.join('|')
      var img_url_arr=z
    }

    // 公司视频
    if(this.data.tempFilePathss == ""){
      var video=''
    }else{
      var video=that.data.video_url
    }
    // 一级id
    var one_class_id=that.data.one_class
    // 二级id
    var two_class_id=that.data.two_class
    // 评论内容
    var info=m.textarea
    var type_work_id=that.data.type_work_id
    var uid=wx.getStorageSync("uid");
    // 十万火急+置顶
    if(that.data.radio==1){
      var start_time=that.data.stime
      var ending_time=that.data.etime
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
      var start_time=""
      var ending_time=""
    }
    // 开始时间
    // 结束时间
    console.log("最后开始结束时间+",start_time,ending_time,lable,that.data.stime,that.data.stime)
    // 置顶类型
    // that.data.seradio
    if(that.data.issu==false){
      // 置顶类型
      if (m.i1 == "" || m.i2 == "" || that.data.city == "" || m.i4 == "" || m.i5 == "" || m.i6 == "") {
        this.hidePopup(false);
        that.setData({
          sq:true
        })
    } else {
      console.log('工作地点',work)
      wx.request({
        url:"http://tsf.suipk.cn/home/info/do_addrecruit",
        data:{
          uid,
          type_work,
          type_work_id,
          salary_range,
          work,
          working_years,
          contacts,
          tel,
          corporate_name,
          detailed_address,
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
     success:function(res){
       if(res.data.code==0){
         that.suhide(false)
         that.setData({
           sq:true
         })
       }
       console.log("调用找人成功",res)
       if(res.data.code==101){
         console.log('积分是否',res.mes)
         that.setData({
           pm:false,
           sq:true,
         })
       }
       
      },fail:function(){
       console.log("调用失败")
      }
      })
    }
  }

// =======================个人中心跳转++++++++++++++++++++++++++++++====
if(that.data.issu==true){
  request({
    url:'http://tsf.suipk.cn/home/Personal/do_modify_info',
    data:{
      form:1,
      info_id:that.data.info_id,
      type_work,
      img_url_arr,
      info,
      salary_range,
      working_years,
      work,
      contacts,
      tel,
      corporate_name,
      detailed_address,
      img_url
    }
    }).then(res=>{
    console.log('调用成功',res)
    this.setData({
    
    })
    }).catch(err=>{
    console.log('调用失败')
  })
}
// =======================个人中心跳转++++++++++++++++++++++++++++++====

    console.log(this.data.tempFilePaths.length)
  },
  hp(){
    this.setData({
      pm:true,sq:false
    })
    wx.navigateTo({
      url: '/pages/self/goup/goup',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /* 隐藏成功弹窗 */
  suhide(flag = true) {
    this.setData({
      "sup": flag,
      sq:false,
    });
  },
  
  con:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  /* 隐藏失败弹窗 */
  hidePopup(flag = true) {
    this.setData({
      "popup": flag,sq:false,
    });
  },
  next: function () {

  },
  // ====================================================================
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
        console.log("视频路径",res)
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
        var count = 0;
        // for (var i = 0, h = tempFilePath; i < h; i++) {
          //上传文件
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
                if (count == tempFilePath.length) {
                  wx.hideToast();
                }
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
        // }

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
          tempFilePaths="";
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
          console.log("最后的",a)
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
   * 页面的初始数据
   */
  data: {
    // type_work_id
    pm:true,
    item: {
      ashow: ashow
    },
    img_url_arr:[],
    // 错误提示
    nsup: true,
    // 消耗积分
    int:0,
    // 时间分类
    index: 0,
    // dates: '请选择开始时间',
    // edates: '请选择结束时间',
    sssup: true,
    // 单选框
    sradio: '0',
    seradio: '1',
    radio:"",
    // 一级列表
    one_class:"",
    // 二级列表
    two_class:"",
    // 是否显示下拉图片
    hidden:false,
    // 求职状态
    selectData3: [],//下拉列表的数据
    selectShow3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index3: 0,//选择的下拉列表下标
    // 薪资待遇
    selectData2: [],//下拉列表的数据
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    indexs: 0,//选择的下拉列表下标
    // 双击事件
    lastTapTime: 0,
    // 自定义编辑
    isDisabled: true,
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    // 图片路径
    tempFilePaths: [],
    tempFilePathss:"",

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
    // 开始时间
    stime:"",
    // 结束时间
    etime:"",
    // +++++++++++++++++++++
    // 
    h:false,
    h2:false,
    h3:false,
    h4:false,
    h5:false,
    h6:false,
    h7:false,
    h8:false,
    h9:false,
    issu:false,
    mz:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
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
// console.log('结束时间',this.data.etime)

// +++++++++++++++++++积分+++++++++++++++++++++++++++++++
// +++++++++++++++++++积分+++++++++++++++++++++++++++++++
    var phone=wx.getStorageSync("userphone")
    that.setData({
      phone,
    })
    // /获取二级列表
    console.log("获取一级列表",options.id)
    console.log("获取二级列表",options.idtwo)
    that.setData({
        one_class:options.id,
        two_class:options.idtwo,
   })
    wx.request({
      url:"http://tsf.suipk.cn/home/Personal/do_id_type",
     data:{
      type:1,
     },
     method: 'POST',
     header: {
       'content-type': 'application/x-www-form-urlencoded'
     },
     success:function(res){
      
       that.setData({
        type_work_id:res.data.data[0].id
       })
       console.log('最开始的工种id',that.data.type_work_id)
       console.log(that.data.selectData)
      console.log('工种结果'+that.data.selectData)
    },fail:function(){
        console.log("调用工种失败")
       }
    })
    console.log(options)
    if(options.pid!=undefined){
      request({
        url:'http://tsf.suipk.cn/home/Personal/do_modify_details',
      data:{
      info_id:options.pid,
      form:options.form
    }
        }).then(res=>{
        console.log('调用成功',res)
        this.setData({
          info_id:options.pid,
          hr:res.data.data.type_work,
          hr2:res.data.data.salary_range,
          hr3:res.data.data.work,
          hr4:res.data.data.working_years,
          hr5:res.data.data.contacts,
          hr6:res.data.data.tel,
          hr7:res.data.data.corporate_name,
          hr8:res.data.data.detailed_address,
          hr9:res.data.data.info,
          tempFilePaths:res.data.data.img_url_arr,
          tempFilePathss:res.data.data.video,
          h:true,
          h2:true,
          h3:true,
          h4:true,
          h5:true,
          h6:true,
          h7:true,
          h8:true,
          h9:true,
          issu:true,
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
      // 
      // 
      // 
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
      var k=' '
      var  p1=s1.join('-')
      var p2=s2.join(':')
      var  pList=p1+k+p2
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
      var k=' '
      var  pList2=p1+k+p2
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
    // ++++++++++++++++++++++++++开始时间+++++++++++++++++++++++++++
    // ++++++++++++++++++++++++++开始时间+++++++++++++++++++++++++++
    changeDateTimeColumn2(e) {
      var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker2.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        dateTimeArray2: dateArr,
        dateTime2: arr
      });
    },
    // +++++++++++++++++++++结束时间++++++++++++++++++++++
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
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
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