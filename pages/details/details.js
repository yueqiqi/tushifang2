// 信息详情
import request from '../login.js'
import like from '../like.js'

Page({
  // 评论
  //点击出现输入框
  showInput: function () {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  // 隐藏输入框
  // onHideInput: function () {
  //   this.setData({
  //     showInput: false
  //   })
  //   console.log('hide+++++++++++')
  // },

  //拨打电话 
  callphone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },

  formSubmit: function (e) {
    var that=this
    var e = e.detail.value
    var info_id=this.data.lid
    if(that.data.tempFilePaths==''){
      var img_url_arr=''
    }else{
      var p=that.data.img_url_arr
      console.log('文件',that.data.img_url_arr)
      var z=p.join('|')
      var img_url_arr=z
      console.log(z)
    }
    var content=e.textarea
    var uid=wx.getStorageSync('uid');
    // var info_id=that.data.info_id
    if (e.textarea.length < 5) {
      wx.showToast({
        title: '字数在5~100字哟~~~',
        image: "../images/fail.png",
        duration: 2000
      })
    } else {
      // **************************
      if(that.data.po=='首页'){
        // 举报
      wx.request({
        url:"http://tsf.suipk.cn/home/info/do_report",
        data:{
          uid,
          info_id,
          content,
          img_url_arr
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log("举报调用首页成功",res)
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
        },fail:function(){
          console.log("调用举报失败",res)
        }
      })
      }else if(that.data.po=='信息中心'){
         // 举报
      wx.request({
        url:"http://tsf.suipk.cn/home/info/do_report",
        data:{
          uid,
          info_id,
          content,
          img_url_arr
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log("举报调用信息中心成功",res)
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
        },fail:function(){
          console.log("调用举报失败",res)
        }
      })
      }
      
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
    var uid=wx.getStorageSync('uid');
    var that=this
    console.log("点赞")
    if(that.data.po=='首页'){

      var info_id=that.data.lid
      console.log('info_id',info_id)
      like({
        data:{
        uid,
        type:1,
        info_id,
      }
    }).then(res=>{

      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      var idx=that.data.idx
      var fm=that.data.fm
      // 最新发布点赞
      var tabuser='tabuser['+idx+'].is_point'
      var point_ratio1='tabuser['+idx+'].point_ratio'
      // 优质推荐发布
      var jian='tabuserjian['+idx+'].is_point'
      var point_ratio2='tabuserjian['+idx+'].point_ratio'
      // 十万火急发布
      var user='user['+idx+'].is_point'
      var point_ratio3='user['+idx+'].point_ratio'
      // 信息中心-渣场信息
      var slag='slag['+idx+'].is_point'
      var point_ratio4='slag['+idx+'].point_ratio'

      console.log('点赞的地址',fm)

        // 点赞个数加一
        var point=that.data.point
        var point1=Number(point)+1
        // 点赞个数减一
        var point2=that.data.point
        var point3=Number(point2)-1

        console.log('首页点赞个数',point1,point3)
        if(res.data.code==0){
          // 十万火急
          if(fm=='user'){
            prevPage.setData({
              [point_ratio3]:point1,
              [user]:1,
            })
            // 最新发布
          }else if(fm=='tabuser'){
            prevPage.setData({
              [point_ratio1]:point1,
              [tabuser]:1,
            })
            // 优质推荐
          }else if(fm=='tabuserjian'){
            prevPage.setData({
              [point_ratio2]:point1,
              [jian]:1,
            })
          }

        }else if(res.data.code==1){
          // 十万火急 
          if(fm=='user'){
            prevPage.setData({
              [point_ratio3]:point3,
              [user]:0,
            })
            // 最新发布
          }else if(fm=='tabuser'){
            prevPage.setData({
              [point_ratio1]:point3,
              [tabuser]:0,
            })
            // 优质推荐
          }else if(fm=='tabuserjian'){
            prevPage.setData({
              [point_ratio2]:point3,
              [jian]:0,
            })
            // 渣场信息
          }
        }

      console.log('调用点赞成功',res)
        // ++++++++++++++++++++++++++刷新页面++++++++++++++++++
        var uid=wx.getStorageSync('uid');
        request({
          url:'/home/info/do_info_content',
          data:{
          uid,
          type:that.data.form,
          info_id:that.data.lid
        }
      }).then(res=>{
        console.log('调用信息详情成功',res)
        this.setData({
          title:res.data.data.title,
          type:res.data.data.two_class_title,
          time:res.data.data.create_time,
          rec:res.data.data.info,
          linkman:res.data.data.contacts,
          phone:res.data.data.tel,
          userImg:res.data.data.img_url_arr,
          video:res.data.data.video,
          info_id:res.data.data.id,
          point_ratio:res.data.data.point_ratio,
          is_point:res.data.data.is_point,
          mid:res.data.data.id
        })
      }).catch(err=>{
        console.log('调用失败')
      })
      // ++++++++++++++++++++++++++刷新页面++++++++++++++++++
      
      
    }).catch(err=>{
      console.log('调用失败')
    })
  }else if(that.data.po=='信息中心'){
    var info_id=that.data.lid
    console.log('info_id',info_id)
    like({
      data:{
      uid,
      type:1,
      info_id,
    }
  }).then(res=>{

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var idx=that.data.idx
    var fm=that.data.fm
    // 信息中心-渣场信息
    var slag='slag['+idx+'].is_point'    
    var point_ratio4='slag['+idx+'].point_ratio'
    // 信息中心-工地信息
    var meeting='meeting['+idx+'].is_point'    
    var point_ratio5='meeting['+idx+'].point_ratio'
    // 信息中西-买卖信息
    var deal='deal['+idx+'].is_point'    
    var point_ratio6='deal['+idx+'].point_ratio'


    // 点赞个数加一
    var point=that.data.point
    var point1=Number(point)+1
    // 点赞个数减一
    var point2=that.data.point
    var point3=Number(point2)-1
    if(res.data.code==0){
      // 渣场信息点赞
       if(fm=='slag'){
        prevPage.setData({
          [point_ratio4]:point1,
          [slag]:1,
        })
        // 工地信息点赞
      }else if(fm=='meeting'){
        prevPage.setData({
          [point_ratio5]:point1,
          [meeting]:1,
        }) 
        // 买卖信息点赞
      }else if(fm=='deal'){
        prevPage.setData({
          [point_ratio6]:point1,
          [deal]:1,
        })
      }
    }else if(res.data.code==1){
      // 渣场信息取消点赞
       if(fm=='slag'){
        prevPage.setData({
          [point_ratio4]:point3,
          [slag]:0,
        })
      }else if(fm=='meeting'){
        prevPage.setData({
          [point_ratio5]:point3,
          [meeting]:0,
        })        
      }else if(fm=='deal'){
        prevPage.setData({
          [point_ratio6]:point3,
          [deal]:0,
        })        
      }
    }
    console.log('调用点赞成功',res)
      // ++++++++++++++++++++++++++刷新页面++++++++++++++++++
      var uid=wx.getStorageSync('uid');
      request({
        url:'/home/info/do_info_content',
        data:{
        uid,
        type:3,
        info_id:that.data.lid
      }
    }).then(res=>{




      
      console.log('调用信息详情成功',res)
      this.setData({
        title:res.data.data.title,
        type:res.data.data.two_class_title,
        time:res.data.data.create_time,
        rec:res.data.data.info,
        linkman:res.data.data.contacts,
        phone:res.data.data.tel,
        userImg:res.data.data.img_url_arr,
        video:res.data.data.video,
        info_id:res.data.data.id,
        point_ratio:res.data.data.point_ratio,
        is_point:res.data.data.is_point,
        mid:res.data.data.id
      })
    }).catch(err=>{
      console.log('调用失败')
    })
    // ++++++++++++++++++++++++++刷新页面++++++++++++++++++
    
    
  }).catch(err=>{
    console.log('调用失败')
  })
  }
  },
  // 投诉
  complaint:function(){
    console.log("投诉")
    
  },
  // 浏览图片的方法
  listenerButtonPreviewImage:function(e){
    var that=this
    console.log('浏览图片的下标',e.currentTarget.dataset.index)
    var index=e.currentTarget.dataset.index
    wx.previewImage({
      current: that.data.userImg[index],
      urls: that.data.userImg,
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
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
    // 项目标题
    title:"",
    // 项目类型
    type:"",
    // 发布时间
    time:"",
    // 项目介绍
    rec: "",
    // 联系人
    linkman:"",
    // 联系电话
    phone:"",
    min: 5,//最少字数
    max: 100, //最多字数 (根据自己需求改变)
    tempFilePaths: [],
    like:20,
    // 图片
    userImg: [],
    // 视频
    video:"",
  /////////////////////////////////////////
    // 评论
    // 头像
    user:[
    ],
    // 接收并保存首页传来的id值
    lid:"",
    fo:true,
    // 评论信息
    // inputMessage:'',
  },
  // 发布评论
  bindKeyInput:function(e){
    this.setData({
      inputMessage:e.detail.value,
      fo:true
    })
  },
  sendBtn:function(e){
    var that=this
    that.setData({
      showInput: false,
      fo:false
    })
    console.log('发布',e)
  var uid=wx.getStorageSync('uid');
  var content=that.data.inputMessage
  console.log('发布的评论',content)
  // ++++++++++++发布评论++++++++++++++++++++++
      request({
        url:'/home/index/do_addcommemt',
        data:{
          type:that.data.types,
          info_id:that.data.lid,
          uid,
          content,
        }
        }).then(res=>{
        console.log('调用发布评论成功',res)
        // that.onLoad()
        // +++++++++++++++++++++++++++
        // +++++++++++++++++++++++++刷新评论列表++++++++++++++++++++++++++
        request({
          url:'/home/index/do_comment_list',
          data:{
           type:that.data.types,
           info_id:that.data.lid,
           page:1,
           limit:10,
          }
        }).then(res=>{
          console.log('调用评论列表成功',res)
          that.setData({
            user:res.data.list,
            showInput: false
          })

          }).catch(err=>{
            console.log('调用失败')
        })
        // +++++++++++++++++++++++++刷新评论列表++++++++++++++++++++++++++
        }).catch(err=>{
        console.log('调用失败')
      })
      // ++++++++++++发布评论++++++++++++++++++++++
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options.from,'传来的信息',options)
    this.setData({
      lid:options.id,
      form:options.form,
      types:options.type,
      idx:options.idx,
      point:options.point,
      from:options.from,
      fm:options.fm
    })
    console.log(options.from,'传来的',this.data.lid)
        /**
         * 获取的信息详情的广告图
         */
        request({
          url:'/home/info/do_get_advert',
            data:{
              type:4
            }
            }).then(res=>{
              console.log('调用首页广告图成功',res.data.data)
            console.log('调用首页广告图成功',res.data.data.img_url)
            that.setData({
              ads:res.data.data.img_url
            })
            console.log('广告图的信息',that.data.ads)
            }).catch(err=>{
            console.log('调用失败')
          })

      // 首页跳转信息列表
      var uid=wx.getStorageSync('uid');
      if(options.from=='首页'){
        that.setData({
          po:'首页'
        })
        console.log("首页传来的id="+options.id)
        console.log("首页传来的form="+options.form)
        console.log('首页传来的type',options.type)
        console.log('这是首页传来的信息')
        
        // 请求信息详情
        request({
        url:'/home/info/do_info_content',
        data:{
        uid,
        type:3,
        info_id:options.id
      }
      }).then(res=>{
        console.log('调用信息详情成功',res)
      that.setData({
        title:res.data.data.title,
        type:res.data.data.two_class_title,
        time:res.data.data.create_time,
        rec:res.data.data.info,
        linkman:res.data.data.contacts,
        phone:res.data.data.tel,
        userImg:res.data.data.img_url_arr,
        video:res.data.data.video,
        info_id:res.data.data.id,
        point_ratio:res.data.data.point_ratio,
        is_point:res.data.data.is_point,
        mid:res.data.data.id
      })
    }).catch(err=>{
      console.log('调用失败')
    })
      // +++++++++++++++点赞+++++++++++++++++++++
      // +++++++++++++++点赞+++++++++++++++++++++
      // // 评论列表
      request({
        url:'/home/index/do_comment_list',
        data:{
         type:options.type,
         info_id:options.id,
         page:1,
         limit:10,
        }
      }).then(res=>{
        console.log('调用评论列表成功',res)
        this.setData({
          user:res.data.list
        })
        }).catch(err=>{
          console.log('调用失败')
      })
      // +++++++++++++++信息中心跳转详情页++++++++++++++++++++++++
    }else if(options.from=='信息中心'){
      var that=this
      that.setData({
        po:'信息中心'
        // info_id:options
      })
      console.log('接收信息中心跳转来的信息',options)
      var uid=wx.getStorageSync('uid');
      request({
        url:'/home/info/do_info_content',
        data:{
          type:options.type,
          info_id:options.id,
          uid,
        }
        }).then(res=>{
        console.log('调用信息中心详情成功',res)
        // var res=res.data.data
        that.setData({
          title:res.data.data.title,
          type:res.data.data.two_class_title,
          time:res.data.data.create_time,
          rec:res.data.data.info,
          linkman:res.data.data.contacts,
          phone:res.data.data.tel,
          userImg:res.data.data.img_url_arr,
          video:res.data.data.video,
          info_id:res.data.data.id,
          point_ratio:res.data.data.point_ratio,
          is_point:res.data.data.is_point,
          mid:res.data.data.id
        })
        }).catch(err=>{
        console.log('调用失败')
      })

      // 评论列表
      request({
        url:'/home/index/do_comment_list',
        data:{
         type:1,
         info_id:options.id,
         page:1,
         limit:10,
        }
      }).then(res=>{
        console.log('调用评论列表成功',res)
        this.setData({
          user:res.data.list
        })
        }).catch(err=>{
          console.log('调用失败')
      })
    }
    // +++++++++++++++信息中心跳转详情页++++++++++++++++++++++++
  

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
    // wx.navigateBack({delta: 1})
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
  onShareAppMessage: function (ops) { 
    var uid=wx.getStorageSync('uid');
    var that=this
    var info_id=that.data.lid
    var form=that.data.form
    var type=that.data.types
    var from=that.data.from
    // var 
    return {
      title: '包程项',//弹出分享时显示的分享标题
      path: '/pages/details/details?from=首页&id='+info_id+'&form='+form+'&uid='+uid+'&type='+type+'&from='+from,
      //'/page/user?id=123' // 路径，传递参数到指定页面。
      desc: '分享页面的内容',
      success: function (res) { 
        console.log('分享成功',res)
      },
      fail:function(err){
        console.log('分享失败',err)
      }

    }
  }
})