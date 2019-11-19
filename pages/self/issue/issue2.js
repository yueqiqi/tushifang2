// pages/Ac/issue/issue.js
import request from "../../login.js";
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
    this.setData({
      sq:true
    })
  },
  // /////////////////////////////////////////////////////////////////////////////
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
    console.log(e)
    var m = e.detail.value
    var that=this
    var info_id=that.data.info_id
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
    // 上传图片
    if(that.data.tempFilePaths==''){
      var img_url_arr=''
    }else{
      if(that.data.have==0){
        var p=that.data.img_url_arr
        var z=p.join('|')
        var img_url_arr=z
      }else{
        var q=[]
        var o=that.data.tempFilePaths
        for(var w in o){
          // var sl='tempFilePaths['+w+']'
          var j=that.data.tempFilePaths[w].slice(19)
          q.push(j)
        }
      console.log('循环后的数组',q)
      var h=q.join('|')
      var img_url_arr=h
      }

    }
    //上传视频
    if(that.data.tempFilePathss==''){
      var video=''
    }else{
      if(that.data.have1==0){
        var video=that.data.video_url
      }else{
        var video=that.data.tempFilePathss.slice(19)
      }
    }
    var uid=wx.getStorageSync("uid");

    if (m.i1 == "" || m.i2 == "" || m.i3 == "") {
      this.hidePopup(false);
      that.setData({
        sq:true
      })
    } else { 
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      wx.request({
        url: "http://tsf.suipk.cn/home/Personal/do_modify_info",
        data: {
         form:3,
         info_id,
         title,
         contacts,
         img_url_arr,
         info,
         video,
         tel,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('修改成功',res)
          if(res.data.code==0){
            that.suhide(false);
            that.setData({
              sq:true,
              pm:false,
              model:res.data.msg
            })
          }
        }, fail: function () {
          console.log("其他发布调用失败")
        }
      })
    }
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
    that.setData({
      have:0
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
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    pm:true,
    // 错误提示
    nsup: true,
    // 消耗积分
    int: 0,
    // 时间分类
    index: 0,
    sssup: true,
    //成功 提示框
    sup: true,
    // 错误提示框
    popup: true,
    // 图片路径
    tempFilePaths: [],
    tempFilePathss: "",
    have:0,
    have1:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log('接受我的发布传来的信息',options,options.pid,options.form)
    // 储存信息id
    that.setData({
      info_id:options.pid
    })
    /**
     * 调用详情
     */
    request({
      url:'/home/Personal/do_modify_details',
      data:{
        form:options.form,
        info_id:options.pid
      }
      }).then(res=>{
      console.log('调用我的发布修改详情成功',res)
      that.setData({
        contacts:res.data.data.contacts,
        tel:res.data.data.tel,
        title:res.data.data.title,
        tempFilePaths:res.data.data.img_url_arr,
        tempFilePathss:res.data.data.video,
        text:res.data.data.info,
        // have:1
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
      }).catch(err=>{
      console.log('调用失败')
    })
  },

})