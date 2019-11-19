// pages/Ac/hiring/hiring.js
import request from "../../../login.js" ;
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'E7PBZ-USVKO-3BYWB-SR4NY-TA7Z3-S4BTR'
});
var model = require('../../../../model/model.js');
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
     var that=this
     that.setData({
       have2:0
     })
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
  },


   /* 隐藏弹窗 */
   nsuhide(flag = true) {
    this.setData({
      "nsup": flag
    });
  },
  suhide(flag = true) {
    this.setData({
      "sup": flag
    });
  },
  con:function(){
    wx.navigateBack({
      delta: 1
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
    var that=this
    this.setData({
      sradio: e.detail
    });
    var lable
    var start_time 
    var ending_time 
    if(that.data.sradio==1){
       lable=1
       start_time=that.data.stime
       ending_time=that.data.etime
    }else if(that.data.sradio==2){
      if(that.data.seradio==1){
        lable=2
        start_time=that.data.stime
        ending_time=that.data.etime
      }else if(that.data.seradio==2){
        console.log('这是业内置顶')
        lable=3
        start_time=that.data.stime
        ending_time=that.data.etime
      }
    }
console.log('选择的方式',lable)
request({
  url:'/home/info/do_all_inintegral',
  data:{
    lable,
    start_time,
    ending_time,
  }
  }).then(res=>{
  console.log('调用获取积分成功',res)
  that.setData({
    int:res.data.data
  })
  }).catch(err=>{
  console.log('调用失败')
  })
     
  },
  /* 隐藏弹窗 */
  sssuhide() {
    this.setData({
      "sssup": true,
      sq:false
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
      url:'/home/info/do_work_years_list',
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
      url:'/home/info/do_salary_list',
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
    if(that.data.have2==0){
      var work=that.data.province+that.data.city+that.data.county
    }else if(that.data.have2==1){
      var work=that.data.hr3
    }
    
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
    if(this.data.tempFilePaths.length ==0){
      var img_url_arr=''
    }else{
      if(that.data.have==0){
        var p=that.data.img_url_arr
        var z=p.join('|')
        var img_url_arr=z
        console.log('提交后的图片信息',that.data.img_url_arr)
      }else{
        var q=[]
        var o=that.data.tempFilePaths
        for(var w in o){
          var j=that.data.tempFilePaths[w].slice(19)
          q.push(j)
        }
      console.log('循环后的数组',q)
      var h=q.join('|')
      var img_url_arr=h
      }
    }

    // 公司视频
    if(this.data.tempFilePathss == ""){
      var video=''
    }else{
      if(that.data.have1==0){
        var video=that.data.video_url
      }else{
        var video=that.data.tempFilePathss.slice(19)
      }
    }
    // 评论内容
    var info=m.textarea
    var type_work_id=that.data.type_work_id
    var uid=wx.getStorageSync("uid");
    // 置顶类型
    // that.data.seradio
      // 置顶类型
      if (m.i1 == "" || m.i2 == "" || that.data.city == "" || m.i4 == "" || m.i5 == "" || m.i6 == "") {
        this.hidePopup(false);
        that.setData({
          sq:true
        })
    } else {
      console.log('工作地点',work)
      // =======================个人中心跳转++++++++++++++++++++++++++++++====
      request({
        url:'/home/Personal/do_modify_info',
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
          video,
        }
        }).then(res=>{
        console.log('调用修改成功',res)
        if(res.data.code==0){
          that.suhide(false);
          that.setData({
            sq:true,
            pm:false,
            model:res.data.msg
          })
        }
        // =======================个人中心跳转++++++++++++++++++++++++++++++====
        }).catch(err=>{
        console.log('调用失败')
      })
    }
  

  },
  hp(){
    this.setData({
      pm:true,
      sq:false
    })
    wx.navigateBack({
      delta: 1
    });
  },
  // ====================================================================
  /**
       * 上传视频方法
       */
  uploads: function () {
    let that = this;
    that.setData({
      have1:0
    })
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
    var that = this;
    that.setData({
      have:0,
    })
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
        var tempFilePaths1 = res.tempFilePaths;
        var imgs = that.data.tempFilePaths.concat(tempFilePaths1);
        that.setData({
          tempFilePaths: imgs
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        var a =[]
        console.log('这是',imgs)
          for (var iq in imgs) {
            //上传文件
          wx.uploadFile({
            url: 'http://tsf.suipk.cn/home/Personal/do_uplod_img',
            filePath: imgs[iq],
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
              if (count == imgs.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              // wx.showModal({
              //   title: '错误提示',
              //   content: '上传图片失败',
              //   showCancel: false,
              //   success: function (res) { }
              // })
            }
          });
        // }//if
        console.log('最后的数字',a,that.img_url_arr)
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
        if(that.data.tempFilePaths.length<=9){
          that.setData({
            showUpload:true
        })
        }
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
    have:0,
    have1:0,
    have2:0,
    /**
     * 是否显示上传按钮
     */
    showUpload:true,
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
    sssup: true,
 
    // 求职状态
    selectData3: [],//下拉列表的数据
    selectShow3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    index3: 0,//选择的下拉列表下标
    // 薪资待遇
    selectData2: [],//下拉列表的数据
    selectShow2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    indexs: 0,//选择的下拉列表下标
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
    }
    })
      request({
        url:'/home/Personal/do_modify_details',
      data:{
      info_id:options.pid,
      form:options.form
    }
        }).then(res=>{
        console.log('调用修改信息详情成功',res)
        that.setData({
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
        if(res.data.data.img_url_arr!=''){
          that.setData({
            have:1
          })
        }
        if(res.data.data.video!=''){
          that.setData({
            have1:1
          })
        }
        if(res.data.data.hr3!=''){
          that.setData({
            have2:1
          })
        }
        }).catch(err=>{
        console.log('调用失败')
      })
    // +++++++++++++++++++个人中心跳转发布+++++++++++++++++++++++++++++
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

})